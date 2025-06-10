import { PaginationRequest, PaginationResponse } from "./common"

export interface GetCardsRequest extends PaginationRequest {
    front?: string
    deckId: number
}

export interface CardItem {
    front: string,
    back: string,
    timeDuration: number[]
}

export interface GetCardsResponse extends PaginationResponse {
    cards: CardItem[]
}

export interface CreateCardRequest {
    front: string
    back: string
}

export interface UpdateCardRequest {
    front: string
    back: string
}
