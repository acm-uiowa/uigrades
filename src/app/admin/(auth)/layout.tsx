export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen items-center justify-center px-page-mobile-x md:px-page-web-x">
            {children}
        </div>
    );
}
