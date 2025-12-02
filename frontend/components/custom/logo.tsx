import Link from "next/link"
import { cn } from "@/lib/utils"
import { StrapiImage, StrapiLink } from "@/types" // Ajuste os imports conforme sua estrutura
import { CustomImage } from "./strapi-image" // Assumindo que está na mesma pasta

interface LogoProps {
    text: StrapiLink
    logo: StrapiImage
    dark?: boolean
}

export function Logo({ logo, text, dark = false }: LogoProps) {
    return (
        <Link
            href={text.href}
            className="flex items-center gap-1 group select-none py-2"
        >
            {/* Imagem do Strapi (Icone) */}
            <div className="transition-transform duration-300 group-hover:scale-105">
                <CustomImage
                    src={logo.url}
                    alt={logo.alternativeText || "Logo"}
                    className="object-contain"
                    width={32}
                    height={32}
                />
            </div>

            {/* Texto e Badge */}
            <div className="relative flex items-baseline ml-0.5">
                <span className={cn(
                    "text-xl font-bold tracking-tighter leading-none",
                    dark ? "text-white" : "text-slate-900"
                )}>
                    {text.label}
                </span>

                {/* Badge BR posicionado no canto superior direito do texto */}
                <span className="absolute -top-1.5 -right-3.5 text-[10px] font-medium text-muted-foreground/80">
                    BR
                </span>
            </div>
        </Link>
    )
}