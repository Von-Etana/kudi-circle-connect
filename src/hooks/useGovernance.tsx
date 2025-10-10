import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Interfaces
export interface GroupMember {
  user_id: string;
  name: string; // This would likely be joined from a profiles table
  role: 'member' | 'trustee' | 'admin';
  joined_at: string;
}

export interface Poll {
  id: string;
  group_id: string;
  title: string;
  description: string;
  status: 'active' | 'closed';
  created_by: string;
  created_at: string;
}

export interface Disbursement {
  id: string;
  group_id: string;
  title: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  approvals: string[]; // Array of user_ids who approved
  created_by: string;
  created_at: string;
}

export interface AuditLog {
  id: string;
  group_id: string;
  activity: string;
  user_id: string;
  created_at: string;
}

export const useGovernance = (groupId: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  const [members, setMembers] = useState<GroupMember[]>([]);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [disbursements, setDisbursements] = useState<Disbursement[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  const fetchData = useCallback(async () => {
    if (!user || !groupId) return;
    setLoading(true);

    try {
      // Fetch Members
      const { data: membersData, error: membersError } = await supabase
        .from('group_members')
        .select('*, profiles(full_name)')
        .eq('group_id', groupId);
      if (membersError) throw membersError;
      const formattedMembers = membersData.map(m => ({ ...m, name: m.profiles.full_name || 'Anonymous' }));
      setMembers(formattedMembers);

      // Fetch Polls
      const { data: pollsData, error: pollsError } = await supabase
        .from('polls')
        .select('*')
        .eq('group_id', groupId);
      if (pollsError) throw pollsError;
      setPolls(pollsData);

      // Fetch Disbursements
      const { data: disbursementsData, error: disbursementsError } = await supabase
        .from('disbursements')
        .select('*')
        .eq('group_id', groupId);
      if (disbursementsError) throw disbursementsError;
      setDisbursements(disbursementsData);

      // Fetch Audit Logs
      const { data: auditLogsData, error: auditLogsError } = await supabase
        .from('audit_logs')
        .select('*')
        .eq('group_id', groupId)
        .order('created_at', { ascending: false });
      if (auditLogsError) throw auditLogsError;
      setAuditLogs(auditLogsData);

    } catch (error) {
      console.error("Error fetching governance data:", error);
      toast({ title: 'Error', description: 'Failed to load governance data.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [user, groupId, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const approveDisbursement = async (disbursementId: string, decision: 'approved' | 'rejected', comment?: string) => {
    if (!user) return;

    try {
      const { data: disbursement, error: fetchError } = await supabase
        .from('disbursements')
        .select('approvals')
        .eq('id', disbursementId)
        .single();

      if (fetchError) throw fetchError;

      const newApprovals = [...(disbursement.approvals || []), user.id];

      // Assuming 2 approvals needed
      const newStatus = decision === 'rejected' ? 'rejected' : newApprovals.length >= 2 ? 'approved' : 'pending';

      const { error: updateError } = await supabase
        .from('disbursements')
        .update({ approvals: newApprovals, status: newStatus })
        .eq('id', disbursementId);

      if (updateError) throw updateError;

      // Add to audit log
      await supabase.from('audit_logs').insert({
        group_id: groupId,
        user_id: user.id,
        activity: `Disbursement request #${disbursementId} was ${decision}.${comment ? ` Comment: ${comment}` : ''}`,
      });

      toast({ title: 'Success', description: `Request ${decision}.` });
      fetchData(); // Refresh data
    } catch (error) {
      console.error("Error approving disbursement:", error);
      toast({ title: 'Error', description: 'Failed to process approval.', variant: 'destructive' });
    }
  };

  return {
    loading,
    members,
    polls,
    disbursements,
    auditLogs,
    approveDisbursement,
    refreshData: fetchData,
  };
};