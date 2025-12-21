import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { Logo } from "./logo";
import { StrapiFooter } from "@/types";

function selectSocialIcon(url: string) {
    const iconProps = { className: "h-5 w-5" };

    if (url.includes("github")) return <Github {...iconProps} />;
    if (url.includes("linkedin")) return <Linkedin {...iconProps} />;
    if (url.includes("email") || url.includes("mailto")) return <Mail {...iconProps} />;

    return <Mail {...iconProps} />;
}

export function Footer({ data }: { readonly data: StrapiFooter }) {
    const { logo, logoText, text, socialLinks } = data;

    return (
        <footer className="bg-slate-950 py-4 text-slate-200 border-t border-slate-800">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">

                    {/* Esquerda: Logo */}
                    <div className="shrink-0">
                        <Logo logo={logo} text={logoText} dark={true} />
                    </div>

                    {/* Centro: Texto de Copyright/Descrição */}
                    <p className="text-sm text-slate-400 text-center md:max-w-md">
                        {text}
                    </p>

                    {/* Direita: Links Sociais */}
                    <div className="flex items-center gap-4">
                        {socialLinks.map((link) => (
                            <Link
                                key={link.id}
                                href={link.href}
                                className="text-slate-400 hover:text-white transition-colors duration-200 hover:scale-110 p-2 rounded-full hover:bg-slate-800"
                                target={link.isExternal ? "_blank" : undefined}
                                rel={link.isExternal ? "noopener noreferrer" : undefined}
                                aria-label={link.label}
                            >
                                {selectSocialIcon(link.href)}
                                <span className="sr-only">{link.label}</span>
                            </Link>
                        ))}
                    </div>

                </div>
            </div>
        </footer>
    );
}