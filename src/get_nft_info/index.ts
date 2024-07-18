import { createPublicClient, http, parseAbi } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
  chain: mainnet,
  transport: http()
})

const contractAddress = '0x0483b0dfc6c78062b9e999a82ffb795925381415'
const tokenId:bigint = BigInt(1); // 替换为你的NFT ID

const abi = parseAbi([
    'function ownerOf(uint256 tokenId) view returns (address)',
    'function tokenURI(uint256 tokenId) view returns (string)',
  ]);



const getOwnerOf = async () => {
  const owner = await client.readContract({
    address: contractAddress,
    abi,
    functionName: 'ownerOf',
    args: [tokenId],
  })
  return owner
}

const getTokenURI = async () => {
  const tokenURI = await client.readContract({
    address: contractAddress,
    abi,
    functionName: 'tokenURI',
    args: [tokenId]
  })
  return tokenURI
}

const main = async () => {
  try {
    const owner = await getOwnerOf()
    console.log(`Owner of token ${tokenId}:`, owner)

    const tokenURI = await getTokenURI()
    console.log(`Token URI of token ${tokenId}:`, tokenURI)
  } catch (error) {
    console.error('Error:', error)
  }
}

main()


