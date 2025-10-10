import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Interface for a single due item
export interface Due {
  id: string;
  created_by: string;
  group_id: string; // Assuming dues are tied to a group
  title: string;
  description?: string;
  amount: number;
  due_date: string;
  status: 'paid' | 'unpaid' | 'overdue';
  created_at: string;
}

// Interface for a user's payment of a due
export interface DuesPayment {
  id: string;
  due_id: string;
  user_id: string;
  amount_paid: number;
  paid_at: string;
}

export const useDues = (groupId: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [dues, setDues] = useState<Due[]>([]);
  const [payments, setPayments] = useState<DuesPayment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDues = useCallback(async () => {
    if (!user || !groupId) {
        setDues([]);
        setLoading(false);
        return;
    }

    try {
      setLoading(true);

      // Fetch all dues for the given group
      const { data: duesData, error: duesError } = await supabase
        .from('dues')
        .select('*')
        .eq('group_id', groupId)
        .order('due_date', { ascending: false });

      if (duesError) throw duesError;

      // Fetch all payments made by the current user for those dues
      const dueIds = duesData.map(d => d.id);
      const { data: paymentsData, error: paymentsError } = await supabase
        .from('dues_payments')
        .select('*')
        .in('due_id', dueIds)
        .eq('user_id', user.id);

      if (paymentsError) throw paymentsError;

      // Map payment status to each due
      const enrichedDues = duesData.map(due => {
        const payment = paymentsData.find(p => p.due_id === due.id);
        let status: 'paid' | 'unpaid' | 'overdue' = 'unpaid';
        if (payment) {
          status = 'paid';
        } else if (new Date(due.due_date) < new Date()) {
          status = 'overdue';
        }
        return { ...due, status };
      });

      setDues(enrichedDues);
      setPayments(paymentsData || []);

    } catch (error: any) {
      console.error('Error fetching dues data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load community dues.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [user, groupId, toast]);

  useEffect(() => {
    fetchDues();
  }, [fetchDues]);

  const createDue = async (dueData: {
    title: string;
    description?: string;
    amount: number;
    due_date: string;
  }) => {
    if (!user || !groupId) return;

    try {
      const { data, error } = await supabase
        .from('dues')
        .insert({
          ...dueData,
          group_id: groupId,
          created_by: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'New due created successfully.',
      });

      // Refresh dues list
      fetchDues();
      return data;

    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to create new due.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const payDue = async (dueId: string, amount: number) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('dues_payments')
        .insert({
          due_id: dueId,
          user_id: user.id,
          amount_paid: amount,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Payment Successful',
        description: 'Your due payment has been recorded.',
      });

      // Refresh dues list to update status
      fetchDues();
      return data;

    } catch (error: any) {
      toast({
        title: 'Payment Failed',
        description: 'There was an error processing your payment.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return {
    dues,
    payments,
    loading,
    createDue,
    payDue,
    refreshDues: fetchDues,
  };
};