import { mainnet } from 'viem/chains'
import { createPublicClient, http } from 'viem'

export const client = createPublicClient({
  chain: mainnet,
  transport: http()
})