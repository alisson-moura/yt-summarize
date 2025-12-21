import { z } from "zod";

export const UpdateProfileFormSchema = z.object({
    firstName: z.string().min(1, "Nome é obrigatório").max(50),
    lastName: z.string().min(1, "Sobrenome é obrigatório").max(50),
    bio: z.string().max(500, "Bio deve ter menos de 500 caracteres"),
});

export type UpdateProfileValues = z.infer<typeof UpdateProfileFormSchema>

export type UpdateProfileFormState = {
    success?: boolean;
    message?: string;
    data?: { firstName?: string; lastName?: string; bio?: string };
    zodErrors?: { firstName?: string[]; lastName?: string[]; bio?: string[] } | null;
    strapiError?: {
        status: number
        name: string
        message: string
        details?: Record<string, string[]>
    } | null
};


export const ProfileImageFormSchema = z.object({
    image: z
        .instanceof(File)
        .refine((file) => file.size > 0, "Image is required")
        .refine((file) => file.size <= 5000000, "Image must be less than 5MB")
        .refine(
            (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
            "Image must be JPEG, PNG, or WebP format"
        ),
});

export type ProfileImageFormValues = z.infer<typeof ProfileImageFormSchema>;

export type ProfileImageFormState = {
    success?: boolean;
    message?: string;
    data?: {
        image?: File;
    };
    strapiErrors?: {
        status: number;
        name: string;
        message: string;
        details?: Record<string, string[]>;
    } | null;
    zodErrors?: {
        image?: string[];
    } | null;
};