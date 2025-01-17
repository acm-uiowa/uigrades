import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${poppins.className} flex min-h-screen flex-col bg-primary-dark-gray text-off-white antialiased`}
            >
                <header className="sticky top-0 z-50">
                    <Navbar />
                </header>
                <main className="relative flex-grow px-page-mobile-x py-page-mobile-y md:px-page-web-x md:py-page-web-y">
                    {children}
                </main>
                <footer>
                    <Footer />
                </footer>
            </body>
            <GoogleAnalytics gaId="G-9NYXVBNR4G" />
        </html>
    );
}
