import { createPublicClient, http,  parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
    chain: mainnet,
    transport: http("https://eth-mainnet.g.alchemy.com/v2/3R5LGfVPxUNZQ3Ly4c9jfF0wDgjaaTVb")
  })

// USDT 合约地址（以太坊主网）
const usdtAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

// 定义 Transfer 事件的 ABI 格式
const transferEventAbi = parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)');

// 监听 Transfer 事件
const unwatch = client.watchEvent({
  
  address: usdtAddress,
  event: transferEventAbi,
  onLogs: logs => {
    console.log('Received new logs:', logs);
    if (logs && logs.length > 0) {
        const { blockNumber, blockHash, topics, data } = logs[logs.length - 1];
        const amount = parseInt(data) / 10e6;
        console.log(`blockNumber: ${blockNumber}, blockhash: ${blockHash}.
          the address ${topics[1]}  transfer ${amount} USDT to address ${topics[2]}`)
  
    }
  }

});

// 保持程序运行
process.stdin.resume();


