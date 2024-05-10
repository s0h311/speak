import type { User } from '@supabase/supabase-js'
import { supabaseServer } from './supabaseServer'
import logger from '@/lib/logger'

export async function supabaseUser(): Promise<User | null> {
  const supabase = supabaseServer()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    logger.error(error.message, 'supabaseUser')
    return null
  }

  return user
}
