import { PaginationResponse, PaginationRequest } from "./common"

export interface GetDecksRequest extends PaginationRequest {
    name?: string
}

export interface DeckItem {
    id: number
    name: string
    description: string
    imageUrl: string
    totalCards: number
    cardsLeft: number
}

export interface GetDecksResponse extends PaginationResponse {
    decks: DeckItem[]
}

export interface UpdateDeckRequest {
    id: number
    name: string
    description: string
    imageUrl: string
}

export interface CreateDeckRequest {
    name: string
    description: string
    imageUrl?: string
}
