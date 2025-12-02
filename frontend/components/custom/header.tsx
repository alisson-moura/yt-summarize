import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { StrapiHeader } from "@/types";

export function Header({ data }: { readonly data: StrapiHeader }) {

    const { logoText, logo, ctaButton } = data;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">

                {/* Componente Logo reutilizado */}
                <div className="flex items-center gap-2">
                    <Logo logo={logo} text={logoText} />
                </div>

                {/* Área de Ações / Botão CTA */}
                <div className="flex items-center gap-4">
                    {ctaButton && (
                        <Link href={ctaButton.href}>
                            <Button
                                variant="default"
                                size="sm"
                                className="font-semibold shadow-sm hover:shadow-md transition-all"
                            >
                                {ctaButton.label}
                            </Button>
                        </Link>
                    )}
                </div>

            </div>
        </header>
    );
}