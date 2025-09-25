import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface UserProfile {
  id: string
  user_id: string
  full_name: string | null
  phone_number: string | null
  date_of_birth: string | null
  address: string | null
  kyc_status: string
  created_at: string
  updated_at: string
}

interface UserWallet {
  id: string
  user_id: string
  balance: number
  currency: string
  wallet_type: string
  created_at: string
  updated_at: string
}

interface UserStats {
  totalBalance: number
  activeAjoGroups: number
  totalGroups: number
  trustScore: number
}

export const useUserData = () => {
  const { user } = useAuth()
  const { toast } = useToast()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [wallet, setWallet] = useState<UserWallet | null>(null)
  const [stats, setStats] = useState<UserStats>({
    totalBalance: 0,
    activeAjoGroups: 0,
    totalGroups: 0,
    trustScore: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchUserData = async () => {
      try {
        setLoading(true)

        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (profileError && profileError.code !== 'PGRST116') {
          throw profileError
        }

        // Fetch wallet
        const { data: walletData, error: walletError } = await supabase
          .from('wallets')
          .select('*')
          .eq('user_id', user.id)
          .eq('wallet_type', 'main')
          .single()

        if (walletError && walletError.code !== 'PGRST116') {
          throw walletError
        }

        // Fetch Ajo groups the user is part of
        const { data: ajoMemberships, error: ajoError } = await supabase
          .from('ajo_memberships')
          .select(`
            *,
            ajo_groups(*)
          `)
          .eq('user_id', user.id)

        if (ajoError) throw ajoError

        // Calculate stats
        const activeAjoGroups = ajoMemberships?.filter(
          membership => membership.ajo_groups?.status === 'active'
        ).length || 0

        const totalGroups = ajoMemberships?.length || 0

        // Calculate trust score (simplified calculation)
        const trustScore = Math.min(95, 60 + (totalGroups * 5) + (activeAjoGroups * 10))

        setProfile(profileData)
        setWallet(walletData)
        setStats({
          totalBalance: walletData?.balance || 0,
          activeAjoGroups,
          totalGroups,
          trustScore
        })
      } catch (error: any) {
        console.error('Error fetching user data:', error)
        toast({
          title: 'Error',
          description: 'Failed to load user data',
          variant: 'destructive'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [user, toast])

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id)

      if (error) throw error

      setProfile(prev => prev ? { ...prev, ...updates } : null)
      toast({
        title: 'Success',
        description: 'Profile updated successfully'
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive'
      })
    }
  }

  return {
    profile,
    wallet,
    stats,
    loading,
    updateProfile
  }
}