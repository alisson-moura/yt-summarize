import { AlertCircleIcon } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

// Interface para um item de erro individual dentro do array
interface StrapiErrorItem {
    path: string[];
    message: string;
    name: string;
}

interface StrapiErrorProps {
    error?: {
        status: number;
        name: string;
        message: string;
        details?: {
            errors?: StrapiErrorItem[]
        }
    } | null
}

export function StrapiError({ error }: StrapiErrorProps) {
    if (!error) return null;

    const hasDetails = error.details?.errors && error.details.errors.length > 0;

    return (
        <Alert variant="destructive" className="border-destructive">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>{error.name}</AlertTitle>
            <AlertDescription className="flex flex-col gap-2">
                <p>{error.message}</p>

                {hasDetails && (
                    <ul className="list-inside list-disc text-sm mt-2">
                        {error.details?.errors?.map((err, index) => (
                            <li key={`${err.path.join('-')}-${index}`}>
                                {err.message}
                            </li>
                        ))}
                    </ul>
                )}
            </AlertDescription>
        </Alert>
    )
}