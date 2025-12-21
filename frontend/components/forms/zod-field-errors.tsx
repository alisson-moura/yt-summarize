import { FieldError } from "../ui/field"

interface ZodFieldErrorProps {
    error?: string[]
}

export function ZodFieldError({ error }: ZodFieldErrorProps) {
    if (!error) return null

    return error.map((err, index) => (
        <FieldError key={index}>
            {err}
        </FieldError>
    ))
}