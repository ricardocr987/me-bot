import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import dotenv from 'dotenv';
import bs58 from 'bs58';
import magicEdenFetcher from './fetcher'
import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token';

console.log({ dotenv });
dotenv.config();

const connection = new Connection('https://api.mainnet-beta.solana.com');

const wallet = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY || ''))


const collections: string[] = ['panzerdogs', 'rakkudos']

while (true) {
  for (const collection of collections){
    const collectionList = await magicEdenFetcher.getCollectionList(0, 5, collection)
    if (collectionList[0].price < collectionList[1].price * 0.8) { //check order of the listing (listings ordered ascending price?)
      const toATA = await getOrCreateAssociatedTokenAccount(connection, wallet, new PublicKey(collectionList[0].tokenMint),  wallet.publicKey) //create ATA where the NFT is going to be sent
      const buyResponse = await magicEdenFetcher.getInstructionBuy(
        wallet.publicKey.toString(), 
        collectionList[0].seller, 
        'E8cU1WiRWjanGxmn96ewBgk9vPTcL6AEZ1t6F6fkgUWe', 
        collectionList[0].tokenMint, 
        toATA.address.toString(), 
        collectionList[0].price
      )
      console.log(buyResponse)
    }
    else {
      if (collectionList[0].price < collectionList[1].price * 0.85) {
        if (await magicEdenFetcher.desesperateCheck(collectionList[0].seller)) { // if has some many active listings could be that he needs liquidity so could be a good option to bid his listing
          const bidResponse = await magicEdenFetcher.getInstructionBid(
            wallet.publicKey.toString(), 
            'E8cU1WiRWjanGxmn96ewBgk9vPTcL6AEZ1t6F6fkgUWe', 
            collectionList[0].tokenMint, 
            collectionList[1].price * 0.8
          )
          console.log(bidResponse)
        }
      }
    }
  }
}