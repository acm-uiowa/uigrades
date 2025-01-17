import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";

const poppins = Poppins({
    variable: "--font-poppins",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "UIGrades",
    description: "The University of Iowa's Course Grade Distribution Viewer",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${poppins.className} flex min-h-screen flex-col bg-primary-dark-gray text-off-white antialiased`}
            >
                <main>{children}</main>
            </body>
        </html>
    );
}
