"use client";

import { useActionState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "next/form";
import { SubmitButton } from "@/app/admin/(auth)/components/SubmitButton";
import verifyOAuthCode from "@/app/lib/actions/admin/oauth-code-verify";

export function OAuthForm() {
    const [state, action, isPending] = useActionState(verifyOAuthCode, {});

    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const docID = searchParams.get("docID");

    const router = useRouter();

    useEffect(() => {
        if (state.state === "success") {
            router.replace("/admin");
        }
    }, [router, state]);

    useEffect(() => {
        if (!email || !docID) {
            router.replace("/admin/login");
        }
    });

    return (
        <div>
            <Form
                action={action}
                className="flex flex-col items-center gap-flex-gap-large"
            >
                <input
                    readOnly
                    type="hidden"
                    name="email"
                    value={email ?? ""}
                />
                <input
                    readOnly
                    type="hidden"
                    name="docID"
                    value={docID ?? ""}
                />
                <input
                    name="otpauth"
                    type="text"
                    autoFocus
                    placeholder="Auth Code"
                    className="content-normal flex w-full flex-col border-b-thin-1 border-primary-border-color pb-paragraph-gap-small text-off-white placeholder-primary-medium-gray"
                />
                {state.state === "error" && state.error && (
                    <div className="content-small text-wrap text-center">
                        {state.error}
                    </div>
                )}
                <SubmitButton
                    pending={isPending}
                    text="Verify Code"
                    textPending="Verifying..."
                />
            </Form>
        </div>
    );
}
