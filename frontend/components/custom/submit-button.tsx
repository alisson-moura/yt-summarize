"use client"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useFormStatus } from "react-dom"
import { cn } from "@/lib/utils"

interface SubmitButtonProps extends React.ComponentProps<typeof Button> {
    loadingText?: string
}

export function SubmitButton({
    loadingText = "Enviando...",
    children,
    className,
    ...props
}: SubmitButtonProps) {
    const { pending } = useFormStatus()

    return (
        <Button
            type="submit"
            disabled={pending}
            className={cn("relative transition-all", className)}
            {...props}
        >
            <div className="grid place-items-center">
                <div
                    className={cn(
                        "col-start-1 row-start-1 flex items-center gap-2 transition-all duration-300 ease-in-out",
                        pending ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 invisible"
                    )}
                >
                    <Spinner />
                    {loadingText}
                </div>
                <div
                    className={cn(
                        "col-start-1 row-start-1 transition-all duration-300 ease-in-out",
                        pending ? "opacity-0 -translate-y-2 invisible" : "opacity-100 translate-y-0"
                    )}
                >
                    {children}
                </div>
            </div>
        </Button>
    )
}