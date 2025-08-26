interface LoginFormEmpty {
    state?: undefined;
    name?: undefined;
    email?: undefined;
    docID?: undefined;
    error?: undefined;
}

interface LoginFormError {
    state: "error";
    error: string;
}

interface LoginFormSuccess {
    state: "success";
    email: string;
    docID: string;
}

interface OAuthFormEmpty {
    state?: undefined;
    email?: undefined;
    docID?: undefined;
    code?: undefined;
    error?: undefined;
}

interface OAuthFormError {
    state: "error";
    error: string;
}

interface OAuthFormSuccess {
    state: "success";
}

interface AuthenticationFormEmpty {
    state?: undefined;
    email?: undefined;
    password?: undefined;
}

interface AuthenticationFormError {
    state: "error";
    error: string;
}

interface AuthenticationFormSuccess {
    state: "success";
}

export type LoginFormState = LoginFormEmpty | LoginFormError | LoginFormSuccess;
export type OAuthFormState = OAuthFormEmpty | OAuthFormError | OAuthFormSuccess;
export type AuthenticationFormState =
    | AuthenticationFormEmpty
    | AuthenticationFormError
    | AuthenticationFormSuccess;
