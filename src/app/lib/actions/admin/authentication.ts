"use server";

import { z } from "zod";
import { AuthenticationFormState } from "./types";
import auth from "@/app/lib/auth";

const AdminFormSchema = z.object({
    email: z
        .string()
        .trim()
        .email()
        .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
            message: "Please enter a valid email address",
        }),
    password: z.string().trim(),
});

const VALID_EMAILS = new Set(process.env.ADMIN_EMAILS?.split(",") || []);

export default async function authenticate(
    prevState: AuthenticationFormState,
    formData: FormData,
): Promise<AuthenticationFormState> {
    const data = Object.fromEntries(formData);
    const parsedData = AdminFormSchema.safeParse(data);

    if (!parsedData.success) {
        return {
            state: "error",
            error: "Unexpected error parsing email, please try again",
        };
    }
    if (!VALID_EMAILS.has(parsedData.data.email)) {
        return {
            state: "error",
            error: "Invalid email, please try again.",
        };
    }

    try {
        await auth.authenticate(parsedData.data.password);

        return {
            state: "success",
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                state: "error",
                error: error.message,
            };
        }
        return {
            state: "error",
            error: "Unexpected error authenticating user, please try again later.",
        };
    }
}
