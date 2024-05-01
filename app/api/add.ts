'use server'

import PollyService from '../services/pollyService'

export default async function add(text: string): Promise<string> {
  const pollyService = new PollyService()

  const userId = 'dummy-user-id'

  return pollyService.post(userId, text)
}
