import { createPublicClient, http, decodeEventLog, parseAbi, parseAbiItem  } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
  chain: mainnet,
  transport: http("https://eth-mainnet.g.alchemy.com/v2/3R5LGfVPxUNZQ3Ly4c9jfF0wDgjaaTVb")
})

// 从 0x099bc3af8a85015d1A39d80c42d10c023F5162F0 转账给 0xA4D65Fd5017bB20904603f0a174BBBD04F81757c 99.12345 USDC 
// 交易ID：0xd973feef63834ed1e92dd57a1590a4ceadf158f731e44aa84ab5060d17336281

const usecTokenContract = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const transferEvent = parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)');


async function main(){
    const latestBlock = await client.getBlockNumber();
    const startBlock = BigInt(latestBlock) - BigInt(100);
    console.log("latestBlock:", latestBlock);
    console.log("startBlock:", startBlock);

    const filter = await client.createEventFilter({
        event: transferEvent,
        fromBlock: startBlock,
        toBlock: latestBlock,
        address: usecTokenContract
    });

    const logs = await client.getFilterLogs({filter});
    for (const log of logs) {
        const { from, to, value } = log.args || {};
        if (from && to && value) {
            console.log(`从 ${from} 转账给 ${to} ${value} USDC, 交易ID：${log.transactionHash}`);
        } else {
            console.log('日志解析错误：', log);
        }
    }
}

main();