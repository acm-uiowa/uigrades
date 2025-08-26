import * as loginCode from "./login-code";
import * as session from "./session";
import { default as login } from "./login-admin";
import { default as authenticate } from "./authenticate";

const auth = {
    loginCode,
    session,
    login,
    authenticate,
};

export default auth;
