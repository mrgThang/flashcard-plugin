export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    accessToken: string
}

export interface SignupRequest {
    name: string
    email: string
    password: string
}
