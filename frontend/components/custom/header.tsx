import Link from "next/link";
import { User } from "lucide-react"; // Ícone para o avatar
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { StrapiHeader } from "@/types";
import { LogoutButton } from "./logout-button";

export async function Header({ data }: { readonly data: StrapiHeader }) {
    const user = await services.auth.getProfile();
    const { logoText, logo, ctaButton } = data;

    const loggedArea = (userData: { email: string; username: string }) => (
        <div className="flex items-center gap-4">
            <Link
                href="/dashboard/perfil"
                className="group flex items-center gap-3 rounded-lg py-1 px-2 transition-colors hover:bg-accent/50"
            >
                <div className="hidden flex-col items-end md:flex">
                    <span className="text-sm font-semibold leading-none text-foreground group-hover:text-primary transition-colors">
                        {userData.username}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        {userData.email}
                    </span>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary border border-border group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <User className="h-4 w-4" />
                </div>
            </Link>
            <div className="h-6 w-px bg-border mx-1 hidden md:block" />
            <LogoutButton />
        </div>
    );

    const publicArea = () => (
        <div className="flex items-center gap-4">
            {ctaButton && (
                <Button
                    variant="default"
                    size="sm"
                    className="font-semibold shadow-sm hover:shadow-md transition-all"
                    asChild
                >
                    <Link href={ctaButton.href}>
                        {ctaButton.label}
                    </Link>
                </Button>
            )}
        </div>
    );

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">

                <div className="flex items-center gap-2">
                    <Logo logo={logo} text={logoText} />
                </div>

                {user.success && user.data
                    ? loggedArea({ email: user.data.email, username: user.data.username })
                    : publicArea()
                }
            </div>
        </header>
    );
}