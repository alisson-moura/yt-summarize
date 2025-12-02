"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, SearchX } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-[calc(100vh-130px)] flex-col items-center justify-center bg-background text-center px-4 py-16">

            <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-muted/30 animate-in zoom-in-50 duration-500">
                <SearchX className="h-16 w-16 text-muted-foreground/60" />
            </div>

            <div className="space-y-3 mb-10">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Página não encontrada
                </h1>
                <p className="text-muted-foreground max-w-md mx-auto text-lg">
                    Desculpe, não conseguimos encontrar a página que você está procurando. Talvez ela tenha sido movida ou excluída.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">

                <Button
                    variant="outline"
                    size="lg"
                    onClick={() => window.history.back()}
                    className="gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar
                </Button>

                <Button asChild size="lg" className="gap-2 font-semibold">
                    <Link href="/">
                        <Home className="h-4 w-4" />
                        Ir para o Início
                    </Link>
                </Button>
            </div>
        </div>
    );
}