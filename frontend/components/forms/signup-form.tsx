"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { actions } from "@/data/actions";
import { useActionState } from "react";
import { type AuthFormState } from "@/data/validation/auth"
import { ZodFieldError } from "./zod-field-errors"
import { StrapiError } from "../custom/strapi-error"
import { SubmitButton } from "../custom/submit-button"

const INITIAL_STATE: AuthFormState = {
    success: false,
    message: undefined,
    zodErrors: null,
    strapiError: null,
};

export function SignupForm() {
    const [formState, formAction] = useActionState(
        actions.auth.registerUserAction, INITIAL_STATE
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Crie sua conta</CardTitle>
                <CardDescription>
                    Digite suas informações abaixo para criar sua conta
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction}>
                    <FieldGroup>
                        <Field data-invalid={!!formState.zodErrors?.name}>
                            <FieldLabel htmlFor="name">Nome Completo</FieldLabel>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="João da Silva"
                                defaultValue={formState?.data?.name}
                                required
                                aria-invalid={!!formState.zodErrors?.name}
                            />
                            <ZodFieldError error={formState.zodErrors?.name} />
                        </Field>
                        <Field data-invalid={!!formState.zodErrors?.email}>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                                defaultValue={formState?.data?.email}
                                required
                                aria-invalid={!!formState.zodErrors?.email}
                            />
                            <ZodFieldError error={formState.zodErrors?.email} />
                        </Field>
                        <Field data-invalid={!!formState.zodErrors?.username}>
                            <FieldLabel htmlFor="username">Username</FieldLabel>
                            <Input
                                id="username"
                                type="text"
                                name="username"
                                placeholder="nome.sobrenome"
                                defaultValue={formState?.data?.username}
                                required
                                aria-invalid={!!formState.zodErrors?.username}
                            />
                            <FieldDescription>
                                Este será seu nome de exibição público.
                            </FieldDescription>
                            <ZodFieldError error={formState.zodErrors?.username} />
                        </Field>
                        <Field data-invalid={!!formState.zodErrors?.password}>
                            <FieldLabel htmlFor="password">Senha</FieldLabel>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                defaultValue={formState?.data?.password}
                                required
                                aria-invalid={!!formState.zodErrors?.password}
                            />
                            <FieldDescription>
                                Deve ter pelo menos 8 caracteres.
                            </FieldDescription>
                            <ZodFieldError error={formState.zodErrors?.password} />
                        </Field>
                        <FieldGroup>
                            <Field>
                                <SubmitButton>
                                    Criar Conta
                                </SubmitButton>
                                <FieldDescription className="px-6 text-center">
                                    Já tem uma conta? <Link href="/signin">Entre</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                        <StrapiError error={formState.strapiError} />
                    </FieldGroup>
                </form>
            </CardContent>
        </Card >
    )
}