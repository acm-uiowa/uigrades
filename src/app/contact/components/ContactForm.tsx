"use client";

import Form from "next/form";
import { useActionState } from "react";
import { SubmitButton } from "./SubmitButton";
import { BorderContainerSmall } from "@/app/components/BorderContainerSmall";
import { InputErrorMessage } from "./InputErrorMessage";
import submitForm from "@/app/lib/actions/contact/submit-form";

export function ContactForm() {
    const [message, formAction, isPending] = useActionState(submitForm, {});

    return (
        <div className="w-5/6 md:w-1/2">
            <Form
                action={formAction}
                className="flex flex-col gap-flex-gap-large text-content-small text-light-gray"
            >
                <div className="flex flex-col gap-paragraph-gap-small">
                    <label className="content-tiny" htmlFor="name">
                        Name
                    </label>
                    <BorderContainerSmall>
                        <input
                            className="w-full placeholder-medium-gray"
                            type="text"
                            name="name"
                            placeholder="E.g. Kyle"
                            defaultValue={
                                message.state === "error"
                                    ? message?.body.name
                                    : ""
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </BorderContainerSmall>
                    {message?.formErrors?.name && (
                        <InputErrorMessage>
                            {message.formErrors.name._errors[0]}
                        </InputErrorMessage>
                    )}
                </div>
                <div className="flex flex-col gap-paragraph-gap-small">
                    <label className="content-tiny" htmlFor="email">
                        UIowa Email
                    </label>
                    <BorderContainerSmall>
                        <input
                            className="w-full placeholder-medium-gray"
                            type="text"
                            name="email"
                            placeholder="E.g. kyle@uiowa.edu"
                            defaultValue={
                                message.state === "error"
                                    ? message?.body.email
                                    : ""
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </BorderContainerSmall>
                    {message?.formErrors?.email && (
                        <InputErrorMessage>
                            {message.formErrors.email._errors[0]}
                        </InputErrorMessage>
                    )}
                </div>
                <div className="flex flex-col gap-paragraph-gap-small">
                    <label className="content-tiny" htmlFor="message">
                        Message
                    </label>
                    <BorderContainerSmall>
                        <textarea
                            className="w-full resize-none placeholder-medium-gray"
                            name="message"
                            placeholder="Your Message Here"
                            defaultValue={
                                message.state === "error"
                                    ? message?.body.message
                                    : ""
                            }
                            rows={12}
                        />
                    </BorderContainerSmall>
                    {message?.formErrors?.message && (
                        <InputErrorMessage>
                            {message.formErrors.message._errors[0]}
                        </InputErrorMessage>
                    )}
                </div>
                <SubmitButton pending={isPending} />
                {message?.emailError && (
                    <InputErrorMessage className="text-center">{message.emailError}</InputErrorMessage>
                )}
            </Form>
        </div>
    );
}
