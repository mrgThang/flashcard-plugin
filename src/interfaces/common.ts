export interface ApiResponse {
    code: number
    message: string
    data: any
}

export interface PaginationRequest {
    page: number
    pageSize: number
}

export interface PaginationResponse {
    pagination: PaginationResponseItem
}

export interface PaginationResponseItem {
    page: number
    pageSize: number
    totalItems: number
}
