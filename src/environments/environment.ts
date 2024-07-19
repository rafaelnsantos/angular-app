export const environment = {
  production: false,
  api: {
    url: 'https://monx.tech/api',
    webauthn: {
      register: 'https://monx.tech/api/q/webauthn/register',
      login: 'https://monx.tech/api/q/webauthn/login',
      callback: 'https://monx.tech/api/q/webauthn/callback',
    }
  },
};
