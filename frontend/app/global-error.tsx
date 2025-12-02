"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCcw, ServerCrash } from "lucide-react";
import "./globals.css";

export default function GlobalError({
    error,
    reset,
}: {
    readonly error: Error & { digest?: string };
    readonly reset: () => void;
}) {
    return (
        <html lang="pt-BR">
            <body className="antialiased min-h-screen bg-background text-foreground flex items-center justify-center p-4 font-sans">
                <div className="max-w-md w-full text-center space-y-8">

                    {/* Ilustração do Erro */}
                    <div className="relative flex justify-center">
                        {/* Círculo de fundo com cor de erro suave */}
                        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20 animate-pulse">
                            <ServerCrash className="h-16 w-16 text-red-600 dark:text-red-500" />
                        </div>
                        {/* Badge de Alerta */}
                        <div className="absolute top-0 right-1/2 translate-x-12 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white shadow-sm">
                            <AlertTriangle className="h-5 w-5" />
                        </div>
                    </div>

                    {/* Textos */}
                    <div className="space-y-4">
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-red-600 dark:text-red-500">
                            Erro 500
                        </h1>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Algo deu errado no servidor
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Ocorreu um erro crítico e a aplicação não conseguiu processar sua solicitação. Nossos engenheiros já foram notificados.
                        </p>
                    </div>

                    {/* Ações */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            onClick={() => reset()}
                            className="gap-2 bg-red-600 hover:bg-red-700 text-white"
                        >
                            <RefreshCcw className="h-4 w-4" />
                            Tentar Novamente
                        </Button>

                        <Button asChild variant="outline" size="lg" className="gap-2">
                            <Link href="/">
                                <Home className="h-4 w-4" />
                                Ir para o Início
                            </Link>
                        </Button>
                    </div>

                    {/* Detalhes do Erro (Apenas em Desenvolvimento) */}
                    {process.env.NODE_ENV === "development" && (
                        <div className="mt-8 rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-900 p-4 text-left">
                            <div className="mb-2 flex items-center gap-2 font-semibold text-red-800 dark:text-red-400 text-sm">
                                <AlertTriangle className="h-4 w-4" />
                                Detalhes do Desenvolvedor
                            </div>

                            <div className="space-y-2 text-xs font-mono text-red-700 dark:text-red-300 overflow-hidden">
                                <p><span className="font-bold">Message:</span> {error.message}</p>
                                {error.digest && <p><span className="font-bold">Digest:</span> {error.digest}</p>}

                                {error.stack && (
                                    <details className="cursor-pointer">
                                        <summary className="opacity-70 hover:opacity-100 transition-opacity">Ver Stack Trace</summary>
                                        <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap rounded bg-white/50 dark:bg-black/20 p-2">
                                            {error.stack}
                                        </pre>
                                    </details>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </body>
        </html>
    );
}