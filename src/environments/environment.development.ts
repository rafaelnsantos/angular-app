export const environment = {
  production: false,
  api: {
    url: 'http://localhost:8080',
    webauthn: {
      register: 'http://localhost:8080/q/webauthn/register',
      login: 'http://localhost:8080/q/webauthn/login',
      callback: 'http://localhost:8080/q/webauthn/callback',
    }
  },
};
