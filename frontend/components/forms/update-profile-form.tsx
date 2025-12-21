'use client'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldDescription,
    FieldSet,
    FieldLegend,
} from "@/components/ui/field"
import { UpdateProfileFormState } from "@/data/validation/profile";
import { useActionState } from "react";
import { actions } from "../../data/actions";
import { ZodFieldError } from "./zod-field-errors";
import { SubmitButton } from "../custom/submit-button";
import { StrapiError } from "../custom/strapi-error";
import { StrapiAuthUser } from "@/data/services/auth";

const INITIAL_STATE: UpdateProfileFormState = {
    success: false,
    message: undefined,
    zodErrors: null,
    strapiError: null,
};

export function ProfileForm({ user }: { user: StrapiAuthUser }) {
    const [formState, formAction] = useActionState(
        actions.profile.updateProfileAction,
        INITIAL_STATE
    )

    return (
        <div className="mx-auto w-full max-w-3xl py-10 px-4">
            {/* Cabeçalho da Página */}
            <div className="mb-8 space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Configurações de Perfil</h1>
                <p className="text-muted-foreground">
                    Gerencie suas informações pessoais e como elas são exibidas para outros usuários.
                </p>
            </div>

            <form action={formAction}>
                {/* Container Principal (Card) */}
                <FieldSet className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 md:p-8">

                    {/* Cabeçalho do FieldSet */}
                    <div className="mb-6 space-y-1">
                        <FieldLegend className="text-lg font-semibold text-foreground">
                            Informações Públicas
                        </FieldLegend>
                        <FieldDescription>
                            Estes dados serão visíveis para todos no seu perfil.
                        </FieldDescription>
                    </div>

                    <FieldGroup className="space-y-6">

                        {/* Grid para Nome e Sobrenome */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <Field data-invalid={!!formState.zodErrors?.firstName}>
                                <FieldLabel htmlFor="firstName">Nome</FieldLabel>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Ex: João"
                                    aria-invalid={!!formState.zodErrors?.firstName}
                                    defaultValue={formState?.data?.firstName || user.firstName}
                                />
                                <ZodFieldError error={formState.zodErrors?.firstName} />
                            </Field>

                            <Field data-invalid={!!formState.zodErrors?.lastName}>
                                <FieldLabel htmlFor="lastName">Sobrenome</FieldLabel>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Ex: Silva"
                                    aria-invalid={!!formState.zodErrors?.lastName}
                                    defaultValue={formState?.data?.lastName || user.lastName}
                                />
                                <ZodFieldError error={formState.zodErrors?.lastName} />
                            </Field>
                        </div>

                        {/* Campo de Bio */}
                        <Field data-invalid={!!formState.zodErrors?.bio}>
                            <div className="flex items-center justify-between">
                                <FieldLabel htmlFor="bio">Biografia</FieldLabel>
                                <span className="text-xs text-muted-foreground">Máx. 500 caracteres</span>
                            </div>

                            <Textarea
                                id="bio"
                                name="bio"
                                placeholder="Escreva um pouco sobre sua experiência, hobbies ou interesses..."
                                className="min-h-40 resize-y"
                                aria-invalid={!!formState.zodErrors?.bio}
                                defaultValue={formState?.data?.bio || user.bio}
                            />

                            <FieldDescription>
                                Dica: Mencione sua área de atuação ou projetos recentes.
                            </FieldDescription>
                            <ZodFieldError error={formState.zodErrors?.bio} />
                        </Field>

                    </FieldGroup>

                    {/* Rodapé com Ações */}
                    <div className="mt-8 flex items-center justify-end gap-3 border-t pt-6">
                        <SubmitButton loadingText="Salvando" >
                            Salvar Alterações
                        </SubmitButton>
                    </div>
                    <StrapiError error={formState.strapiError} />
                </FieldSet>
            </form>
        </div>
    )
}