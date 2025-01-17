"use server";

import sgMail from "@sendgrid/mail";
import auth from "..";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

export default async function sendLoginCode(name: string, email: string) {
    const { loginCode, docID } = await auth.loginCode.generate(email);

    if (!SENDGRID_API_KEY) {
        throw new Error(
            "Unexpected email service error encountered, please contact acm executives.",
        );
    }

    sgMail.setApiKey(SENDGRID_API_KEY);

    const msg = {
        to: email,
        from: "acm@uiowa.edu",
        subject: "UIGrades Admin Login One-time Code",
        text: `A new login for the UIGrades Admin dashboard has been initialized by ${name}. Your one-time code is: ${loginCode}. This code expires in 2 minutes.`,
        html: `<h3>A new login for the UIGrades Admin dashboard has been initialized by ${name}.</h3><p>Your one-time code is: ${loginCode}.</p><p>This code expires in 2 minutes.</p>`,
    };

    await sgMail.send(msg);

    return docID.toString();
}
