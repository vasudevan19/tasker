export type LoginResponse = {
    status: "success" | "error";
    message: string,
    access_token: string,
    token_type: string,
}

export type RegisterResponse = {
    status: "success" | "error";
    message: string,
}

export type IResetPasswordForm = {
  password: string;
  password_confirmation: string;
}

export type ResetPasswordResponse = {
    message: string,
}

export type ResetPasswordFormErrors = {
  password: string;
  password_confirmation?: string;
}

export type ResetLinkErrors = {
    token: string;
    email: string;
}

export type ForgotPasswordResponse = {
    message: string,
}

export type ForgotPasswordErrors = {
    email: string
}

export type LogoutResponse = {
    status: "success" | "error";
    message: string,
}