"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Form from "next/form";
import { SubmitButton } from "@/app/admin/(auth)/components/SubmitButton";
import authenticate from "@/app/lib/actions/admin/authentication";

export function AuthForm() {
    const [state, action, isPending] = useActionState(authenticate, {});
    const router = useRouter();

    useEffect(() => {
        if (state.state === "success") {
            router.replace(
                `/admin/dashboard`,
            );
        }
    }, [router, state]);

    return (
        <div>
            <Form
                action={action}
                className="flex flex-col items-center gap-flex-gap-large"
            >
                <label className="content-normal flex w-full flex-col gap-flex-gap-large">
                    <input
                        name="email"
                        type="text"
                        placeholder="Email"
                        className="border-b-thin-1 border-primary-border-color pb-0.5 text-off-white placeholder-primary-medium-gray"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="border-b-thin-1 border-primary-border-color pb-0.5 text-off-white placeholder-primary-medium-gray"
                    />
                </label>
                {state.state === "error" && state.error && (
                    <div className="content-small text-wrap text-center">
                        {state.error}
                    </div>
                )}
                <SubmitButton
                    pending={isPending}
                    text="Authenticate"
                    textPending="Authenticating..."
                />
            </Form>
        </div>
    );
}
