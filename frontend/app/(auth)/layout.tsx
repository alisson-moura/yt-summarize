export default function AuthLayout({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-[calc(100vh-136px)] w-full items-center justify-center p-6 md:p-10 bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-sm">
                {children}
            </div>
        </div>
    );
}