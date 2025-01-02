import { z } from "zod";

interface FormBody {
    name: string;
    email: string;
    message: string;
}

interface FormEmpty {
    state?: undefined;
    formErrors?: undefined;
    emailError?: undefined;
    body?: undefined;
}

interface FormSuccess {
    state: string;
    formErrors?: undefined;
    emailError?: undefined;
    body: FormBody;
}

interface FormError {
    state: string;
    formErrors: z.ZodFormattedError<
        {
            name: string;
            message: string;
            email: string;
        },
        string
    >;
    emailError?: undefined;
    body: FormBody;
}

interface EmailError {
    state: string;
    formErrors?: undefined;
    emailError: string;
    body: FormBody;
}

export type FormState = FormEmpty | FormSuccess | FormError | EmailError;
