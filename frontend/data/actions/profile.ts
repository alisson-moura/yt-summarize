'use server'
import { UpdateProfileFormSchema, UpdateProfileFormState } from "@/data/validation/profile";
import z from "zod";
import { services } from "../services";

export async function updateProfileAction(prevState: UpdateProfileFormState, formData: FormData): Promise<UpdateProfileFormState> {
    const fields = Object.fromEntries(formData);
    const validatedFields = UpdateProfileFormSchema.safeParse(fields);

    if (validatedFields.error)
        return {
            success: false,
            message: 'Erro na validação dos dados',
            zodErrors: z.flattenError(validatedFields.error).fieldErrors,
            data: {
                ...prevState.data,
                ...fields
            }
        }

    try {
        const response = await services.profile.updateProfileService(validatedFields.data);
        if (!response.success)
            return {
                success: false,
                strapiError: response.error,
                message: 'Erro ao atualizar o perfil.',
                data: {
                    ...prevState.data,
                    ...fields
                }
            }

        return {
            success: true,
            strapiError: null,
            zodErrors: null,
            message: "Perfil atualizado com sucesso!",
            data: {
                ...prevState.data,
                ...fields
            }
        }
    } catch {
        return {
            success: false,
            strapiError: null,
            message: 'Erro um erro inesperado ao atualizar, tente novamente.',
            data: {
                ...prevState.data,
                ...fields
            }
        }
    }

}