import { LogoutButton } from "./LogoutButton";

export function NavBar({ className }: { className?: string }) {
    return (
        <div
            className={`${className} flex h-screen flex-col gap-flex-gap-large bg-secondary-medium-gray px-flex-gap-large py-flex-gap-large text-off-white`}
        >
            <h1 className="header-2-mobile px-flex-gap-small">
                <span className="text-hawkeye-gold">UI</span>Grades
            </h1>
            <div className="flex h-full flex-col">
                <LogoutButton />
            </div>
        </div>
    );
}
