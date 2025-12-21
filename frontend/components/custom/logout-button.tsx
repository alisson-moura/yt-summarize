import { actions } from "@/data/actions";
import { SubmitButton } from "./submit-button";
import { LogOut } from "lucide-react";

export function LogoutButton() {
    return (
        <form action={actions.auth.logout}>
            <SubmitButton loadingText="">
                <LogOut className="w-6 h-6 hover:text-primary" />
            </SubmitButton>
        </form>
    )
}