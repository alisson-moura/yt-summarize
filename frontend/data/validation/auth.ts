import { z } from 'zod'

export const SignupFormSchema = z.object({
    username: z
        .string("O nome de usuário é obrigatório.")
        .trim()
        .min(3, "O usuário deve ter pelo menos 3 caracteres.")
        .max(20, "O usuário deve ter no máximo 20 caracteres."),

    email: z.email("Por favor, insira um e-mail válido."),

    password: z
        .string("A senha é obrigatória.")
        .min(6, "A senha deve ter pelo menos 6 caracteres.")
        .max(100, "A senha deve ter no máximo 100 caracteres."),

    name: z
        .string("O nome é obrigatório.")
        .trim()
        .min(3, "O nome deve ter pelo menos 3 caracteres.")
        .max(100, "O nome deve ter no máximo 100 caracteres."),
});

export const SigninFormSchema = z.object({
    identifier: z
        .string("O e-mail ou usuário é obrigatório.")
        .trim()
        .min(3, "O identificador deve ter no mínimo 3 caracteres.")
        .max(255, "O identificador é muito longo."),
    password: z
        .string("A senha é obrigatória.")
        .min(6, "A senha deve ter pelo menos 6 caracteres.")
        .max(100, "A senha deve ter no máximo 100 caracteres."),
});

export type SignupFormValues = z.infer<typeof SignupFormSchema>;
export type SigninFormValues = z.infer<typeof SigninFormSchema>;


export type AuthFormState = {
    success: boolean
    message?: string

    data?: {
        username?: string
        email?: string
        password?: string
        name?: string
        identifier?: string
    }

    strapiError?: {
        status: number
        name: string
        message: string
        details?: Record<string, string[]>
    } | null

    zodErrors?: {
        identifier?: string[]
        username?: string[]
        email?: string[]
        password?: string[]
        name?: string[]
    } | null
}