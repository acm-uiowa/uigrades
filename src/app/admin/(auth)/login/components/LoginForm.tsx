"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Form from "next/form";
import { SubmitButton } from "@/app/admin/(auth)/components/SubmitButton";
import adminLogin from "@/app/lib/actions/admin/admin-login";

export function LoginForm() {
    const [state, action, isPending] = useActionState(adminLogin, {});
    const router = useRouter();

    useEffect(() => {
        if (state.state === "success") {
            router.replace(
                `/admin/oauth?email=${state.email}&docID=${state.docID}`,
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
                        name="name"
                        type="text"
                        autoFocus
                        placeholder="Name"
                        className="border-b-thin-1 border-primary-border-color pb-0.5 text-off-white placeholder-primary-medium-gray"
                    />
                    <input
                        name="email"
                        type="text"
                        placeholder="Email"
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
                    text="Login"
                    textPending="Logging In..."
                />
            </Form>
        </div>
    );
}
