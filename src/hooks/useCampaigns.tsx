import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface Campaign {
  id: string
  created_by: string
  title: string
  description: string
  target_amount: number
  current_amount: number
  category: string
  status: string
  end_date: string | null
  image_url: string | null
  created_at: string
  updated_at: string
}

export const useCampaigns = () => {
  const { user } = useAuth()
  const { toast } = useToast()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [myCampaigns, setMyCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchCampaigns = async () => {
      try {
        setLoading(true)

        // Fetch all active campaigns
        const { data: allCampaigns, error: campaignsError } = await supabase
          .from('campaigns')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false })

        if (campaignsError) throw campaignsError

        // Fetch user's campaigns
        const { data: userCampaigns, error: userCampaignsError } = await supabase
          .from('campaigns')
          .select('*')
          .eq('created_by', user.id)
          .order('created_at', { ascending: false })

        if (userCampaignsError) throw userCampaignsError

        setCampaigns(allCampaigns || [])
        setMyCampaigns(userCampaigns || [])
      } catch (error: any) {
        console.error('Error fetching campaigns:', error)
        toast({
          title: 'Error',
          description: 'Failed to load campaigns',
          variant: 'destructive'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [user, toast])

  const createCampaign = async (campaignData: {
    title: string
    description: string
    target_amount: number
    category: string
    end_date?: string
    image_url?: string
  }) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('campaigns')
        .insert({
          created_by: user.id,
          ...campaignData
        })
        .select()
        .single()

      if (error) throw error

      toast({
        title: 'Success',
        description: 'Campaign created successfully'
      })

      setMyCampaigns(prev => [data, ...prev])
      setCampaigns(prev => [data, ...prev])
      
      return data
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to create campaign',
        variant: 'destructive'
      })
      throw error
    }
  }

  const contributeToCampaign = async (campaignId: string, amount: number) => {
    if (!user) return

    try {
      // Create a transaction record
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type: 'campaign_donation',
          amount: amount,
          description: `Campaign contribution`,
          metadata: { campaign_id: campaignId }
        })

      if (transactionError) throw transactionError

      // Update campaign current amount
      const { error: updateError } = await supabase.rpc('increment_campaign_amount', {
        campaign_id: campaignId,
        amount: amount
      })

      if (updateError) throw updateError

      toast({
        title: 'Success',
        description: 'Contribution made successfully'
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to make contribution',
        variant: 'destructive'
      })
      throw error
    }
  }

  return {
    campaigns,
    myCampaigns,
    loading,
    createCampaign,
    contributeToCampaign
  }
}