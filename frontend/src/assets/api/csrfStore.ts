// Holds the CSRF token in memory since it can't be read from the cross-domain cookie by JS.
let csrfToken: string | null = null;

export const setCsrfToken = (token: string) => {
  csrfToken = token;
};

export const getCsrfToken = () => csrfToken;
