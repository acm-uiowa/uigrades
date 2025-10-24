"use server";

import { z } from "zod";
import { sendEmail } from "./send-email";
import { FormState } from "./types";

const ContactFormSchema = z.object({
    name: z.string().trim().min(1, "Please enter a name"),
    email: z
        .string()
        .trim()
        .email({ message: "Please enter a valid @uiowa.edu email" })
        .regex(/^[\w-]+@uiowa\.edu$/, {
            message: "Please enter a valid @uiowa.edu email",
        }),
    message: z.string().trim().min(1, { message: "Please enter a message" }),
});

export default async function submitForm(
    prevState: FormState,
    formData: FormData,
): Promise<FormState> {
    const data = Object.fromEntries(formData);
    const parsedData = ContactFormSchema.safeParse(data);

    if (!parsedData.success) {
        const formErrors = parsedData.error.format();
        return {
            state: "error",
            formErrors,
            body: {
                name: data.name.toString(),
                email: data.email.toString(),
                message: data.message.toString(),
            },
        };
    }

    try {
        return {
            state: "success",
            body: parsedData.data,
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                state: "error",
                emailError: error.message,
                body: parsedData.data,
            };
        } else {
            return {
                state: "error",
                emailError:
                    "Unknown error occured, please direct your message to acm@uiowa.edu or kyle-chi@uiowa.edu.",
                body: parsedData.data,
            };
        }
    }
}
