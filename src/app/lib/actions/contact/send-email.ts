"use server";

import sgMail from "@sendgrid/mail";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

//This is the old implementation for sending emails through contact page
//This is currently unused. Emails are now sent through emailJS which is
//much simpler and handled in the frontend. Check the useEffect hook in 
//ContactForm.tsx for the emailjs send code
export async function sendEmail({
    name,
    email,
    message,
}: {
    name: string;
    email: string;
    message: string;
}) {
    if (!SENDGRID_API_KEY) {
        throw new Error(
            "Unexpected email error encountered, please direct your message to acm@uiowa.edu",
        );
    }

    sgMail.setApiKey(SENDGRID_API_KEY);

    const msg = {
        to: "acm@uiowa.edu",
        from: "acm@uiowa.edu",
        name: name,
        replyTo: email,
        subject: "ACM@UIOWA UIGrades Message",
        text: `New UIGrades message from user ${name}. Name: ${name}. Email: ${email}. ${message}`,
        html: `<h3>New UIGrades message from user ${name}</h3><p>Name: ${name}</p><p>Email: <a href="mailto:${email}">${email}</a></p><p>${message}</p>`,
    };
    try {
        await sgMail.send(msg);
        return {
            state: "success",
        };
    } catch {
        throw new Error(
            "Unexpected email error encountered, please direct your message to acm@uiowa.edu",
        );
    }
}
