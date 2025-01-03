import sgMail from "@sendgrid/mail";

export async function sendEmail({
    name,
    email,
    message,
}: {
    name: string;
    email: string;
    message: string;
}) {
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

    if (!SENDGRID_API_KEY) {
        throw new Error("Unexpected SendGrid API key error");
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
        sgMail.send(msg);
        return {
            state: "success",
        };
    } catch {
        throw new Error(
            "Unexpected email error encountered, please direct your message to acm@uiowa.edu or kyle-chi@uiowa.edu",
        );
    }
}
