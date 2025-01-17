"use server";

import mutations from "@/db/mutations";
import { HOTP, Secret } from "otpauth";

const OTP_PASSWORD_EXPIRE_SECONDS = 60 * 2; // expires after 2 minutes
const OTP_PASSWORD_AUTO_DELETE_SECONDS = 60 * 30; // deletes after 30 minutes
const OTP_PASSWORD_LENGTH = 8;

export default async function generateLoginCode(email: string) {
    const otp = HOTP.generate({
        secret: new Secret(),
        digits: OTP_PASSWORD_LENGTH,
    });

    const insertedDoc = await mutations.admin.insertAdminLogin(
        email,
        otp,
        OTP_PASSWORD_EXPIRE_SECONDS,
        OTP_PASSWORD_AUTO_DELETE_SECONDS,
    );

    return insertedDoc;
}
