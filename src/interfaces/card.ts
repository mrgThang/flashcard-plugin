import { PaginationRequest, PaginationResponse } from "./common"

export interface GetCardsRequest extends PaginationRequest {
    front?: string
    isForStudy?: boolean
    deckId: number
}

export interface CardItem {
    id: number,
    front: string,
    back: string,
    estimatedTime: number[]
}

export interface GetCardsResponse extends PaginationResponse {
    cards: CardItem[]
}

export interface CreateCardRequest {
    deckId: number
    front: string
    back: string
}

export interface UpdateCardRequest {
    id: number
    deckId: number
    front: string
    back: string
}

export interface StudyCardRequest {
    cardId: number
    qualityOfResponse: number
}
