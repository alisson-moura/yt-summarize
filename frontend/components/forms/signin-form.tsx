'use client'
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
import { AuthFormState } from "@/data/validation/auth"
import { useActionState } from "react"
import { actions } from "@/data/actions"
import { ZodFieldError } from "./zod-field-errors"
import { StrapiError } from "../custom/strapi-error"
import { SubmitButton } from "../custom/submit-button"

const INITIAL_STATE: AuthFormState = {
    success: false,
    message: undefined,
    zodErrors: null,
    strapiError: null,
};

export function SigninForm() {
    const [formState, formAction] = useActionState(actions.auth.login, INITIAL_STATE);

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Entre na sua conta</CardTitle>
                    <CardDescription>
                        Digite seu username abaixo para acessar sua conta
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction}>
                        <FieldGroup>
                            <Field data-invalid={!!formState.zodErrors?.identifier}>
                                <FieldLabel htmlFor="identifier">Username ou E-mail</FieldLabel>
                                <Input
                                    id="identifier"
                                    name="identifier" // <--- ADICIONADO (Essencial)
                                    type="text"
                                    defaultValue={formState.data?.identifier}
                                    aria-invalid={!!formState.zodErrors?.identifier}
                                // required <--- REMOVIDO (Para usar a validação do Zod)
                                />
                                <ZodFieldError error={formState.zodErrors?.identifier} />
                            </Field>

                            <Field data-invalid={!!formState.zodErrors?.password}>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Senha</FieldLabel>
                                    <Link
                                        href="/forgot-password"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Esqueceu sua senha?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    name="password" // <--- ADICIONADO (Essencial)
                                    type="password"
                                    // defaultValue removido por segurança
                                    aria-invalid={!!formState.zodErrors?.password}
                                // required <--- REMOVIDO
                                />
                                <ZodFieldError error={formState.zodErrors?.password} />
                            </Field>

                            <Field>
                                <SubmitButton loadingText="Entrando...">
                                    Entrar
                                </SubmitButton>
                                <FieldDescription className="text-center">
                                    Não tem uma conta? <Link href="/signup">Cadastre-se</Link>
                                </FieldDescription>
                            </Field>
                            <StrapiError error={formState.strapiError} />
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}