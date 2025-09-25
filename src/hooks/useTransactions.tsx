import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface Transaction {
  id: string
  user_id: string
  wallet_id: string | null
  type: string
  amount: number
  description: string | null
  reference_id: string | null
  status: string
  metadata: any
  created_at: string
}

export const useTransactions = () => {
  const { user } = useAuth()
  const { toast } = useToast()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchTransactions = async () => {
      try {
        setLoading(true)

        const { data, error } = await supabase
          .from('transactions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10)

        if (error) throw error

        setTransactions(data || [])
      } catch (error: any) {
        console.error('Error fetching transactions:', error)
        toast({
          title: 'Error',
          description: 'Failed to load transactions',
          variant: 'destructive'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('transactions_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'transactions',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          setTransactions(prev => [payload.new as Transaction, ...prev.slice(0, 9)])
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user, toast])

  const createTransaction = async (transactionData: {
    type: string
    amount: number
    description?: string
    metadata?: any
  }) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          ...transactionData,
          reference_id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        })
        .select()
        .single()

      if (error) throw error

      toast({
        title: 'Success',
        description: 'Transaction created successfully'
      })

      return data
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to create transaction',
        variant: 'destructive'
      })
      throw error
    }
  }

  return {
    transactions,
    loading,
    createTransaction
  }
}