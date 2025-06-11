import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "src/constant/constant";
import { LoginRequest, LoginResponse, SignupRequest } from "src/interfaces/login";
import { GetDecksRequest, GetDecksResponse, CreateDeckRequest, UpdateDeckRequest, DeckItem } from "src/interfaces/deck";
import { GetCardsRequest, GetCardsResponse, CreateCardRequest, UpdateCardRequest, StudyCardRequest } from "src/interfaces/card";
import { ShowError } from "src/helpers/notify";

const BACKEND_URL = process.env.BACKEND_URL
console.log(BACKEND_URL)

async function apiRequest(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: any,
    headers: Record<string, string | null> = {}
): Promise<any> {
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    };

    if (data && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(data)
    }
    if (data && method === 'GET') {
        const params = new URLSearchParams(data).toString();
        url += (url.includes('?') ? '&' : '?') + params;
    }

    let response
    try {
        response = await fetch(url, options);
    } catch(error) {
        ShowError(error)
        throw error
    }

    if (!response.ok) {
        let error
        try {
            const errorData = await response.json()
            const message = errorData.message
            error = new Error(message)
        } catch {
            const errorText = await response.text()
            error = new Error(errorText)
        }
        ShowError(error)
        throw error
    }

    const result = await response.json();
    return result.data;
}

export async function LoginHandler(request: LoginRequest) {
    const response: LoginResponse = await apiRequest(`${BACKEND_URL}/v1/login`, "POST", request)
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, response.accessToken)
}

export async function SignupHandler(request: SignupRequest) {
    await apiRequest(`${BACKEND_URL}/v1/signup`, "POST", request)
}

export async function GetDecksHandler(request: GetDecksRequest): Promise<GetDecksResponse> {
    const headers = getHeaderAuthorization()
    const response = await apiRequest(`${BACKEND_URL}/v1/decks`, "GET", request, headers)
    return response
}

export async function GetDeckDetailHandler(id: number): Promise<DeckItem> {
    const headers = getHeaderAuthorization()
    const response = await apiRequest(`${BACKEND_URL}/v1/decks/${id}`, "GET", null, headers)
    return response
}

export async function CreateDeckHandler(request: CreateDeckRequest) {
    const headers = getHeaderAuthorization();
    await apiRequest(`${BACKEND_URL}/v1/decks`, "POST", request, headers);
}

export async function UpdateDeckHandler(request: UpdateDeckRequest) {
    const headers = getHeaderAuthorization();
    await apiRequest(`${BACKEND_URL}/v1/decks`, "PUT", request, headers);
}

export async function GetCardsHandler(request: GetCardsRequest): Promise<GetCardsResponse> {
    const headers = getHeaderAuthorization();
    const response: GetCardsResponse = await apiRequest(`${BACKEND_URL}/v1/cards`, "GET", request, headers);
    return response;
}

export async function CreateCardHandler(request: CreateCardRequest) {
    const headers = getHeaderAuthorization();
    await apiRequest(`${BACKEND_URL}/v1/cards`, "POST", request, headers);
}

export async function UpdateCardHandler(request: UpdateCardRequest) {
    const headers = getHeaderAuthorization();
    await apiRequest(`${BACKEND_URL}/v1/cards`, "PUT", request, headers);
}

export async function StudyCardHandler(request: StudyCardRequest) {
    const headers = getHeaderAuthorization()
    await apiRequest(`${BACKEND_URL}/v1/cards/study`, "PUT", request, headers)
}

function getHeaderAuthorization(): Record<string, string | null> {
    return {
        'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)}`
    }
}
