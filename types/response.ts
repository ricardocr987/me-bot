import { Attribute, Properties } from './collection'

export type InstructionBidResponse = {
    tx: TransactionME,
    txSigned: TransactionME,
}

export type InstructionBuyResponse = {
    tx: TransactionME,
    txSigned: TransactionME,
}

export type InstructionListResponse = {
    tx: TransactionME,
    txSigned: TransactionME,
}

export type InstructionDepositResponse = {
    tx: TransactionME,
    txSigned: TransactionME,
}

export type TransactionME = {
    type: string,
    data: number[],
}

export type TokensResponse = {
    mintAddress: string,
    owner: string,
    supply: number,
    name: string,
    updateAuthority: string,
    primarySaleHappened: boolean,
    sellerFeeBasisPoints: number,
    image: string,
    attributes: Attribute[],
    properties: Properties[],
    listStatus: string,
}

export type CollectionResponse = {
    symbol: string
    name: string
    description: string
    featured: boolean
    image: string
    price: number
    size: number
    launchDatetime?: string
    edition?: string
}