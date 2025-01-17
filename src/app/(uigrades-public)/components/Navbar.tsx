"use client";

import Link from "next/link";
import { HoverLink } from "./links/HoverLink";
import { useState, useCallback } from "react";
import { HamburgerIcon } from "./icons/HamburgerIcon";

export function Navbar({ className = "" }: { className?: string }) {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = useCallback(() => {
        setMenuOpen((prevState) => !prevState);
    }, []);

    return (
        <div className={`${className}`}>
            <div className="flex h-16 flex-row items-center justify-between border-b-thin-1 border-primary-border-color bg-black/75 px-nav-footer-mobile-x backdrop-blur-md md:justify-start md:gap-24 md:px-nav-footer-web-x">
                <Link
                    href="/"
                    className="header-2-mobile flex h-full flex-row items-center"
                >
                    <p className="text-hawkeye-gold">UI</p>
                    <p>Grades</p>
                </Link>
                <div className="content-small hidden h-full flex-row items-center gap-10 text-light-gray md:flex">
                    <HoverLink href="/courses" internal={true}>
                        Courses
                    </HoverLink>
                    <HoverLink href="/contact" internal={true}>
                        Contact
                    </HoverLink>
                    <HoverLink href="/about" internal={true}>
                        About
                    </HoverLink>
                </div>
                <div
                    className="flex w-5 md:hidden"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                    aria-expanded={isMenuOpen}
                >
                    <HamburgerIcon isMenuOpen={isMenuOpen} />
                </div>
            </div>
            {/* BUG - page scrolls when mobile menu is open */}
            <div
                className={`${isMenuOpen ? "z-10 bg-black/90 backdrop-blur-md" : "pointer-events-none opacity-0"} content-small fixed inset-x-0 top-16 flex h-[calc(100vh-64px)] flex-col items-center gap-6 pt-32 text-light-gray transition-opacity duration-150 ease-in-out`}
            >
                <Link href="/courses" onClick={toggleMenu} tabIndex={-1}>
                    Courses
                </Link>
                <Link href="/contact" onClick={toggleMenu} tabIndex={-1}>
                    Contact
                </Link>
                <Link href="/about" onClick={toggleMenu} tabIndex={-1}>
                    About
                </Link>
            </div>
        </div>
    );
}
