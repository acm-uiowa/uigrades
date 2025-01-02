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
        to: "acm@uiowa.edu", // Change to your recipient
        from: "acm@uiowa.edu", // Change to your verified sender
        name: name,
        replyTo: email,
        subject: "Sending with SendGrid is Fun",
        text: message,
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
