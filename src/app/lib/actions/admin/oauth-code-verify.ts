"use server";

import { z } from "zod";
import { OAuthFormState } from "./types";
import auth from "@/app/lib/auth";

const AdminFormSchema = z.object({
    email: z
        .string()
        .trim()
        .email()
        .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
            message: "Please enter a valid email address",
        }),
    docID: z.string(),
    otpauth: z.string(),
});

export default async function verifyOAuthCode(
    prevState: OAuthFormState,
    formData: FormData,
): Promise<OAuthFormState> {
    const data = Object.fromEntries(formData);
    const parsedData = AdminFormSchema.safeParse(data);

    if (!parsedData.success) {
        return {
            state: "error",
            error: "Unexpected error parsing code, please try again",
        };
    }

    try {
        await auth.login(
            parsedData.data.email,
            parsedData.data.docID,
            parsedData.data.otpauth,
        );

        return { state: "success" };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                state: "error",
                error: error.message,
            };
        }
        return {
            state: "error",
            error: "Unexpected Authorization Error",
        };
    }
}
