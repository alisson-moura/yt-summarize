import Image from "next/image";
import { getStrapiURL } from "@/lib/utils"; // Ajuste o import conforme sua estrutura

interface IStrapiMediaProps {
    src: string;
    alt: string | null;
    height?: number;
    width?: number;
    className?: string;
    fill?: boolean;
    priority?: boolean;
}

export function getStrapiMedia(url: string | null) {
    const strapiURL = getStrapiURL();
    if (url == null) return null;
    if (url.startsWith("data:")) return url;
    if (url.startsWith("http") || url.startsWith("//")) return url;
    return `${strapiURL}${url}`;
}

export function CustomImage({
    src,
    alt,
    className,
    ...rest
}: Readonly<IStrapiMediaProps>) {
    const imageUrl = getStrapiMedia(src);
    if (!imageUrl) return null;

    // Verifica se é ambiente local para desativar a otimização
    // Isso resolve o erro "resolved to private ip"
    const isLocal = imageUrl.includes("localhost") || imageUrl.includes("127.0.0.1");

    return (
        <Image
            src={imageUrl}
            alt={alt ?? "No alternative text provided"}
            className={className}
            unoptimized={isLocal} // <--- O PULO DO GATO ESTÁ AQUI
            {...rest}
        />
    );
}

