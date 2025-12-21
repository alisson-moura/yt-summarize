import { getStrapiURL } from "@/lib/utils";
import { StrapiImage, StrapiResponse } from "@/types";
import { SigninFormValues, SignupFormValues } from "@/data/validation/auth";
import { actions } from "../actions";
import { api } from "../data-api";

export type StrapiAuthUser = {
    id: number;
    documentId: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    bio?: string;
    image?: StrapiImage;
    credits?: number;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
};

type AuthResponse = {
    jwt: string
    user: StrapiAuthUser
}

type StrapiAuthServiceResponse = AuthResponse | StrapiResponse<null>;

const baseUrl = getStrapiURL()

export function isAuthError(response: StrapiAuthServiceResponse): response is StrapiResponse {
    return "error" in response
}

export async function strapiRegisterUser(data: SignupFormValues): Promise<StrapiAuthServiceResponse | undefined> {
    const url = new URL('/api/auth/local/register', baseUrl);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data })
        })

        const result = await response.json() as StrapiAuthServiceResponse
        return result;
    } catch (error) {
        console.error("Registration Service Error:", error);
        return undefined
    }
}

export async function loginStrapiService(input: SigninFormValues): Promise<StrapiResponse<AuthResponse>> {
    const url = new URL("/api/auth/local", baseUrl);

    try {
        const response = await api.post<AuthResponse, SigninFormValues>(url.toString(), input)

        return response;
    } catch (err) {
        return {
            success: false,
            status: 500,
            error: {
                status: 500,
                name: "NetworkError",
                message:
                    err instanceof Error
                        ? err.message
                        : "An unexpected error occurred",
                details: {},
            },
        }
    }
}

export async function getProfile(): Promise<StrapiResponse<StrapiAuthUser>> {
    const token = await actions.auth.getAuthToken();

    if (!token)
        return {
            success: false,
            status: 401
        }

    const url = new URL("/api/users/me", baseUrl);
    try {
        const result = await api.get<StrapiAuthUser>(url.toString(), {
            authToken: token
        })

        return result
    } catch (err) {
        return {
            success: false,
            status: 500,
            error: {
                status: 500,
                name: "NetworkError",
                message:
                    err instanceof Error
                        ? err.message
                        : "An unexpected error occurred",
                details: {},
            },
        }
    }

}