import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { StrapiImage, StrapiLink } from "../../types";
import { CustomImage } from "@/components/custom/strapi-image";

export interface HeroSectionProps {
    id: number
    documentId: string
    __component: string
    heading: string
    sub_heading: string
    image: StrapiImage
    link: StrapiLink
}

export function HeroSection({ data }: { readonly data: HeroSectionProps }) {
    if (!data) return null;
    const { heading, sub_heading, link, image } = data;

    return (
        <header className="relative h-[85vh] min-h-[600px] w-full overflow-hidden flex flex-col justify-center">
            {/* Imagem de Fundo com Zoom suave */}
            <div className="absolute inset-0 w-full h-full">
                <CustomImage
                    alt={image.alternativeText ?? "no alternative text"}
                    className="absolute inset-0 object-cover w-full h-full aspect/16:9"
                    src={image.url}
                    height={1080}
                    width={1920}
                />
                {/* Gradiente Overlay: Melhora leitura do texto e dá profundidade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
            </div>

            {/* Conteúdo Centralizado */}
            <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center text-center">

                {/* Badge Opcional - Dá um toque de "novidade" */}
                <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                    Nova Funcionalidade
                </div>

                {/* Título */}
                <h1 className={cn(
                    "max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl",
                    "mb-6 drop-shadow-sm text-balance" // text-balance ajuda a quebrar o texto harmonicamente
                )}>
                    {heading}
                </h1>

                {/* Subtítulo - Limitado a max-w-2xl para não ficar uma linha infinita */}
                <p className={cn(
                    "max-w-2xl text-lg text-gray-200 sm:text-xl md:text-2xl leading-relaxed",
                    "mb-10 text-balance opacity-90"
                )}>
                    {sub_heading}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                    <Link href={link.href} className="w-full sm:w-auto">
                        <Button
                            size="lg"
                        >
                            {link.label}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}