import { HoverLink } from "./links/HoverLink";

export function Footer({ className = "" }: { className?: string }) {
    return (
        <div
            className={`${className} content-small flex flex-row justify-between border-t-thin-1 border-primary-border-color px-nav-footer-mobile-x py-10 text-light-gray md:px-nav-footer-web-x`}
        >
            <span>&#169; UIGrades 2025</span>
            <div className="flex flex-col gap-4 md:flex-row md:gap-10">
                <HoverLink href="/about/changelog" internal={true}>
                    Changelog
                </HoverLink>
                <HoverLink href="/about/data-transparency" internal={true}>
                    Data Transparency
                </HoverLink>
                <HoverLink href="/about/usage-guide" internal={true}>
                    Usage Guide
                </HoverLink>
            </div>
        </div>
    );
}
