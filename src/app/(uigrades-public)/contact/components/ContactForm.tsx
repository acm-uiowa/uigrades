"use client";

import Form from "next/form";
import { useActionState, useEffect } from "react";
import { SubmitButton } from "./SubmitButton";
import { BorderContainerSmall } from "@/app/(uigrades-public)/components/BorderContainerSmall";
import { InputErrorMessage } from "./InputErrorMessage";
import submitForm from "@/app/lib/actions/contact/submit-form";
import emailjs from "@emailjs/browser";

export function ContactForm() {
    const [message, formAction, isPending] = useActionState(submitForm, {});

    useEffect(() => {
        if (message.state === "success") {
            emailjs.send("service_6u2qezo","template_aqz1bzh",{
                name: message.body.name,
                email: message.body.email,
                message: message.body.message,
            }, {publicKey: "Oj_-O_4l-1VLlKaCY"});
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [message]);

    return (
        <div className="flex w-5/6 flex-col gap-paragraph-gap md:w-1/2">
            {message.state === "success" && (
                <p className="content-normal text-center text-[#2EB88A]">
                    Your message was successfully emailed to acm@uiowa.edu,
                    thank you!
                </p>
            )}
            <Form
                action={formAction}
                className="flex flex-col items-center gap-flex-gap-large text-content-small text-off-white"
            >
                <div className="flex w-full flex-col gap-paragraph-gap-small">
                    <label>
                        <span className="content-tiny text-light-gray">
                            Name
                        </span>
                        <BorderContainerSmall>
                            <input
                                className="w-full placeholder-primary-medium-gray"
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
                    </label>
                    {message?.formErrors?.name && (
                        <InputErrorMessage>
                            {message.formErrors.name._errors[0]}
                        </InputErrorMessage>
                    )}
                </div>
                <div className="flex w-full flex-col gap-paragraph-gap-small">
                    <label>
                        <span className="content-tiny text-light-gray">
                            UIowa Email
                        </span>
                        <BorderContainerSmall>
                            <input
                                className="w-full placeholder-primary-medium-gray"
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
                    </label>
                    {message?.formErrors?.email && (
                        <InputErrorMessage>
                            {message.formErrors.email._errors[0]}
                        </InputErrorMessage>
                    )}
                </div>
                <div className="flex w-full flex-col gap-paragraph-gap-small">
                    <label>
                        <span className="content-tiny text-light-gray">
                            Message
                        </span>
                        <BorderContainerSmall>
                            <textarea
                                className="w-full resize-none placeholder-primary-medium-gray"
                                name="message"
                                placeholder="Your Message Here"
                                defaultValue={
                                    message.state === "error"
                                        ? message?.body.message
                                        : ""
                                }
                                rows={12}
                            />
                        </BorderContainerSmall>{" "}
                    </label>
                    {message?.formErrors?.message && (
                        <InputErrorMessage>
                            {message.formErrors.message._errors[0]}
                        </InputErrorMessage>
                    )}
                </div>
                <SubmitButton pending={isPending} />
                {message?.emailError && (
                    <InputErrorMessage className="text-center">
                        {message.emailError}
                    </InputErrorMessage>
                )}
            </Form>
        </div>
    );
}
