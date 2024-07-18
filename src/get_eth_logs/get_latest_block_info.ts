import { createPublicClient, http,   } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
    chain: mainnet,
    transport: http("https://eth-mainnet.g.alchemy.com/v2/3R5LGfVPxUNZQ3Ly4c9jfF0wDgjaaTVb")
  })

  let lastBlockNumber: bigint | null = null;

  async function chcekBlockNumber(){

    try{
        const latestBlock = await client.getBlock({ blockTag: 'latest' });
        if(lastBlockNumber === null || latestBlock.number > lastBlockNumber){
            lastBlockNumber = latestBlock.number;
            console.log(`New block detected: Height: ${latestBlock.number}, Hash: ${latestBlock.hash}`);
        }
    }catch(error){
        console.error('Error checking block number:', error);
    }
  }
  
setInterval(chcekBlockNumber, 1000);

