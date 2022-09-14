import { 
	CollectionResponse, 
	InstructionBidResponse, 
	InstructionBuyResponse, 
	InstructionListResponse, 
	InstructionDepositResponse, 
	CollectionList, 
	TokenListing, 
	TokensResponse, 
	CollectionStat 
} from './types';

class MagicEdenFetcher {
	private fetch(url: string)  {
        return fetch(url, {
                method: 'GET',
            });
	}

	public async getTokens(token_mint: string): Promise<TokensResponse> {
		const url = `https://api-mainnet.magiceden.dev/v2/tokens/${token_mint}`
		const response = await this.fetch(url)
		const json = await response.json()
		return json as TokensResponse
	}

	public async getTokenListing(token_mint: string): Promise<TokenListing[]> {
		const url = `https://api-mainnet.magiceden.dev/v2/tokens/${token_mint}/listings`
		const response = await this.fetch(url)
		const json = await response.json()
		return json as TokenListing[]
	}

	public async getCollectionStats(symbol: string): Promise<CollectionStat> {
		const url = `https://api-mainnet.magiceden.dev/v2/collections/${symbol}/stats`
		const response = await this.fetch(url)
		const json = await response.json()
		return json as CollectionStat
	}

	public async getTokenbyWallet(wallet_address: string): Promise<TokensResponse[]> {
		const url = `https://api-mainnet.magiceden.dev/v2/wallets/${wallet_address}/tokens?offset=0&limit=100&listedOnly=true`
		const response = await this.fetch(url)
		const json = await response.json()
		return json as TokensResponse[]
	}

	public async desesperateCheck(wallet_address: string): Promise<boolean>{
		const nftList = await this.getTokenbyWallet(wallet_address)
		if (nftList.length > 10) {
			return true
		}
		return false
	}

	public async getCollections(
		offset: number = 0,
		limit: number = 10
	): Promise<CollectionResponse[]> {
		const url = `https://api-mainnet.magiceden.dev/v2/launchpad/collections?offset=${offset}&limit=${limit}`
		const response = await this.fetch(url)
		const json = await response.json()
		return json as CollectionResponse[]
	}

	public async getCollectionList(
		offset: number = 0,
		limit: number = 20,
		symbol: string
	): Promise<CollectionList[]> {
		const url = `https://api-mainnet.magiceden.dev/v2/collections/${symbol}/listings?offset=${offset}&limit=${limit}`;
		const response = await this.fetch(url);
		const json = await response.json();
		return json as CollectionList[];
	}

	public async getInstructionBid(
		buyerPubKey: string,
		auctionHouseAddress: string,
		mintAccAddress: string,
		price: number,
	): Promise<InstructionBidResponse> {
		// bid expires in 1 day
		const url = `https://api-mainnet.magiceden.dev/v2/instructions/buy?buyer=${buyerPubKey}&auctionHouseAddress=${auctionHouseAddress}&tokenMint=${mintAccAddress}&price=${price}&expiry=86400`
		const response = await this.fetch(url)
		const json = await response.json()
		return json as InstructionBidResponse
	}

	public async getInstructionBuy(
		buyerPubKey: string,
		sellerPubKey: string,
		auctionHouseAddress: string,
		mintAccAddress: string,
		tokenAta: string,
		price: number,
	): Promise<InstructionBuyResponse> {
		const url = `https://api-mainnet.magiceden.dev/v2/instructions/buy_now?buyer=${buyerPubKey}&seller=${sellerPubKey}&auctionHouseAddress=${auctionHouseAddress}&tokenMint=${mintAccAddress}&tokenATA=${tokenAta}&price=${price}`
		const response = await this.fetch(url)
		const json = await response.json()
		return json as InstructionBuyResponse
	}

	public async getInstructionList(
		sellerPubKey: string,
		auctionHouseAddress: string,
		mintAccAddress: string,
		tokenAccount: string,
		price: number,
	): Promise<InstructionListResponse> {
		const url = `https://api-mainnet.magiceden.dev/v2/instructions/sell?seller=${sellerPubKey}&auctionHouseAddress=${auctionHouseAddress}&tokenMint=${mintAccAddress}&tokenAccount=${tokenAccount}&price=${price}&sellerReferral=&expiry=`
		const response = await this.fetch(url)
		const json = await response.json()
		return json as InstructionListResponse
	}

	public async getInstructionDeposit(
		buyerPubKey: string,
		auctionHouseAddress: string,
		amount: number,
	): Promise<InstructionDepositResponse> {
		const url = `https://api-mainnet.magiceden.dev/v2/instructions/deposit?buyer=${buyerPubKey}&auctionHouseAddress=${auctionHouseAddress}&amount=${amount}`
		const response = await this.fetch(url)
		const json = await response.json()
		return json as InstructionDepositResponse
	}
}

const magicEdenFetcher = new MagicEdenFetcher()
export default magicEdenFetcher