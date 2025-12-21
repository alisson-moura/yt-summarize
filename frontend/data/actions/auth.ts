"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";
import { AuthFormState, SigninFormSchema, SignupFormSchema } from "@/data/validation/auth";
import { services } from "@/data/services";

const config = {
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    domain: process.env.HOST ?? "localhost",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
};

export async function registerUserAction(prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
    const fields = {
        name: formData.get("name") as string,
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string
    }

    const validatedFields = SignupFormSchema.safeParse(fields);

    if (validatedFields.error) {
        const errors = z.flattenError(validatedFields.error);

        return {
            success: false,
            message: "A validação de dados falhou",
            strapiError: null,
            zodErrors: errors.fieldErrors,
            data: {
                ...prevState.data,
                ...fields
            }
        }
    }

    const response = await services.auth.strapiRegisterUser(validatedFields.data)
    console.log(response)
    if (!response)
        return {
            success: false,
            message: "Algo deu errado. Por favor tente novamente.",
            strapiError: null,
            zodErrors: null,
            data: {
                ...prevState.data,
                ...fields
            }
        }

    if (services.auth.isAuthError(response))
        return {
            success: false,
            message: "Ocorreu um erro ao criar seu cadastro.",
            strapiError: response.error,
            zodErrors: null,
            data: {
                ...prevState.data,
                ...fields
            }
        }

    const cookieStore = await cookies();
    cookieStore.set("jwt", response.jwt, config);
    redirect("/dashboard");
}

export async function login(prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
    const fields = {
        identifier: formData.get("identifier") as string,
        password: formData.get("password") as string
    }

    const validatedFields = SigninFormSchema.safeParse(fields);

    if (validatedFields.error) {
        const errors = z.flattenError(validatedFields.error);

        return {
            success: false,
            message: "A validação de dados falhou",
            strapiError: null,
            zodErrors: errors.fieldErrors,
            data: {
                ...prevState.data,
                ...fields
            }
        }
    }

    const response = await services.auth.loginStrapiService(validatedFields.data);

    if (!response.success || !response.data) {
        return {
            success: false,
            strapiError: response.error,
            message: "Erro ao relizar o login",
            data: {
                ...prevState,
                ...fields
            }
        }
    }

    const cookiesStore = await cookies();
    cookiesStore.set('jwt', response.data.jwt, config)
    redirect('/dashboard')
}

export async function getAuthToken() {
    const cookiesStore = await cookies();
    const jwt = cookiesStore.get('jwt')?.value;

    return jwt;
}

export async function logout() {
    const cookiesStore = await cookies();

    cookiesStore.delete({
        name: 'jwt',
        path: '/',
    });

    redirect('/');
}