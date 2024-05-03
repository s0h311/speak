import type { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { useSupabaseClient } from './useSupabaseClient'

export function useSupabaseUser(): User | null {
  const supabase = useSupabaseClient()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    ;(async () => {
      const currentUser = await supabase.auth.getUser()
      setUser(currentUser.data.user)
    })()
  }, [supabase])

  return user
}
