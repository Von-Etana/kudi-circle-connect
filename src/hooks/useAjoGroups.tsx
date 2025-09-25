import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface AjoGroup {
  id: string
  created_by: string
  name: string
  description: string | null
  contribution_amount: number
  frequency: string
  max_members: number
  current_members: number
  status: string
  start_date: string | null
  next_payout_date: string | null
  created_at: string
  updated_at: string
}

interface AjoMembership {
  id: string
  group_id: string
  user_id: string
  position: number
  status: string
  total_contributed: number
  payout_received: boolean
  joined_at: string
  ajo_groups: AjoGroup
}

export const useAjoGroups = () => {
  const { user } = useAuth()
  const { toast } = useToast()
  const [myGroups, setMyGroups] = useState<AjoMembership[]>([])
  const [availableGroups, setAvailableGroups] = useState<AjoGroup[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchAjoData = async () => {
      try {
        setLoading(true)

        // Fetch user's Ajo memberships
        const { data: memberships, error: membershipError } = await supabase
          .from('ajo_memberships')
          .select(`
            *,
            ajo_groups(*)
          `)
          .eq('user_id', user.id)

        if (membershipError) throw membershipError

        // Fetch available groups (open status)
        const { data: available, error: availableError } = await supabase
          .from('ajo_groups')
          .select('*')
          .eq('status', 'open')
          .lt('current_members', supabase.rpc('max_members'))

        if (availableError) throw availableError

        setMyGroups(memberships || [])
        setAvailableGroups(available || [])
      } catch (error: any) {
        console.error('Error fetching Ajo data:', error)
        toast({
          title: 'Error',
          description: 'Failed to load Ajo groups',
          variant: 'destructive'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAjoData()
  }, [user, toast])

  const createAjoGroup = async (groupData: {
    name: string
    description?: string
    contribution_amount: number
    frequency: string
    max_members: number
    start_date?: string
  }) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('ajo_groups')
        .insert({
          created_by: user.id,
          ...groupData
        })
        .select()
        .single()

      if (error) throw error

      // Automatically add creator as first member
      await supabase
        .from('ajo_memberships')
        .insert({
          group_id: data.id,
          user_id: user.id,
          position: 1
        })

      toast({
        title: 'Success',
        description: 'Ajo group created successfully'
      })

      // Refresh data
      setAvailableGroups(prev => [data, ...prev])
      
      return data
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to create Ajo group',
        variant: 'destructive'
      })
      throw error
    }
  }

  const joinAjoGroup = async (groupId: string) => {
    if (!user) return

    try {
      // Get group details to determine next position
      const { data: group, error: groupError } = await supabase
        .from('ajo_groups')
        .select('current_members')
        .eq('id', groupId)
        .single()

      if (groupError) throw groupError

      const nextPosition = group.current_members + 1

      const { error } = await supabase
        .from('ajo_memberships')
        .insert({
          group_id: groupId,
          user_id: user.id,
          position: nextPosition
        })

      if (error) throw error

      // Update group member count
      await supabase
        .from('ajo_groups')
        .update({ current_members: nextPosition })
        .eq('id', groupId)

      toast({
        title: 'Success',
        description: 'Successfully joined Ajo group'
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to join Ajo group',
        variant: 'destructive'
      })
      throw error
    }
  }

  return {
    myGroups,
    availableGroups,
    loading,
    createAjoGroup,
    joinAjoGroup
  }
}