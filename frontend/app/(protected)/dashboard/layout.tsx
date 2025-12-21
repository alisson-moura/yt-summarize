import Link from "next/link";
import { LayoutDashboard, FileText, User } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const styles = {
    layout: "fixed top-[64px] left-0 right-0 bottom-0 grid grid-cols-[60px_1fr] bg-background z-10",
    sidebar: "border-r bg-background/95 hidden md:block h-full",
    sidebarContent: "flex h-full flex-col gap-2 items-center py-4",
    header: "flex h-[60px] w-full items-center justify-center border-b mb-2",
    headerLink: "flex items-center justify-center text-primary",
    headerIcon: "h-6 w-6",
    navigation: "flex-1 w-full flex flex-col items-center gap-4",
    navLink:
        "flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground",
    navIcon: "h-5 w-5",
    main: "h-full overflow-y-auto p-4 flex flex-col",
};

export default function DashboardLayout({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    return (
        <TooltipProvider delayDuration={0}>
            <div className={styles.layout}>
                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarContent}>
                        {/* Header da Sidebar (Logo) */}
                        <div className="flex w-full items-center justify-center border-b pb-4 mb-2">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link className={styles.headerLink} href="/dashboard">
                                        <LayoutDashboard className={styles.headerIcon} />
                                        <span className="sr-only">Dashboard</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">Dashboard</TooltipContent>
                            </Tooltip>
                        </div>

                        {/* Menu de Navegação */}
                        <nav className={styles.navigation}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link className={styles.navLink} href="/dashboard/resumos">
                                        <FileText className={styles.navIcon} />
                                        <span className="sr-only">Resumos</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">Resumos</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link className={styles.navLink} href="/dashboard/conta">
                                        <User className={styles.navIcon} />
                                        <span className="sr-only">Conta</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">Conta</TooltipContent>
                            </Tooltip>
                        </nav>
                    </div>
                </aside>
                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </TooltipProvider>
    );
}