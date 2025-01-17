import { LoginForm } from "./components/LoginForm";

export default function LoginPage() {
    return (
        <div className="flex w-full flex-col gap-flex-gap-large rounded-2xl border-thin-1 border-primary-border-color bg-secondary-dark-gray p-flex-gap-large md:w-1/2 lg:w-1/3">
            <div className="text-center">
                <span className="text-hawkeye-gold">UI</span>Grades Admin Portal
                - Login
            </div>
            <LoginForm />
        </div>
    );
}
