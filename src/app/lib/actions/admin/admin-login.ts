"use server";

import { z } from "zod";
import { LoginFormState } from "./types";
import auth from "@/app/lib/auth";

const AdminFormSchema = z.object({
    name: z.string().trim(),
    email: z
        .string()
        .trim()
        .email()
        .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
            message: "Please enter a valid email address",
        }),
});

const VALID_EMAILS = new Set(process.env.ADMIN_EMAILS?.split(",") || []);

export default async function adminLogin(
    prevState: LoginFormState,
    formData: FormData,
): Promise<LoginFormState> {
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
            error: "Invalid email, please leave.",
        };
    }

    try {
        const docID = await auth.loginCode.send(
            parsedData.data.name,
            parsedData.data.email,
        );

        return {
            state: "success",
            email: parsedData.data.email,
            docID: docID,
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
            error: "Unexpected error generating and sending access code",
        };
    }
}
