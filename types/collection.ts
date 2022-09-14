export type File = {
    uri: string
    type: string
}

export type Creator = {
    address: string
    share: number
}

export type Root = {
    nfts_metadata: NftsMetadaum[];
    nfts_owned: string[];
}

export type NftsMetadaum = {
    data: Data;
    explorer_url: string;
    is_mutable: boolean;
    mint: string;
    off_chain_data: OffChainData;
    primary_sale_happened: boolean;
    update_authority: string;
}

export type Data = {
    creators: string[];
    name: string;
    seller_fee_basis_points: number;
    share: number[];
    symbol: string;
    uri: string;
    verified: number[];
}

export type Collection = {
    family: string;
    name: string;
}

export type CollectionStat = {
	symbol: string
	floorPrice?: number;
	listedCount?: number;
	volumeAll?: number;
	avgPrice24hr?:number;
}

export type CollectionList ={
	pdaAddress: string;
	auctionHouse: string;
	tokenAddress: string;
	tokenMint: string;
	seller: string;
	tokenSize: number;
	price: number;
}

export type Attribute = {
    trait_type: string
    value: string
}

export type Properties = {
    files: File[]
    category: string
    creators: Creator[]
}

export type OffChainData = {
    attributes?: Attribute[];
    background_color?: string;
    description?: string;
    edition?: string;
    external_url?: string;
    image?: string;
    name?: string;
    properties?: Properties;
    seller_fee_basis_points?: number;
    symbol?: string;
    collection?: Collection;
    id?: string;
}

export type TokenListing = {
    pdaAddress: string
    auctionHouse: string
    tokenAddress: string
    tokenMint: string
    seller: string
    sellerReferral: string
    tokenSize: number
    price: number
}

export type Error = {
    value: string
    msg: string
    param: string
    location: string
}