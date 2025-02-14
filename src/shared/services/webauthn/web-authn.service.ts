import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { map, switchMap, take} from "rxjs";
import {
  ILoginCredential,
  IRegisterCredential,
  CredentialUtils
} from "./utils/credential.utils";
import {environment} from "../../../environments/environment";

const httpOptions = {
  withCredentials: true,
};

interface Input {
  username: string,
  displayName?: string
}

export interface TokensDto {
  token: string,
  refreshToken: string
}

const WEBAUTHN_URLS = {
  register: '/q/webauthn/register-options-challenge',
  register2: '/q/webauthn/register',
  login: '/q/webauthn/login-options-challenge',
  login2: '/q/webauthn/login',
  logout: '/q/webauthn/logout'
}

@Injectable({
  providedIn: 'root'
})
export class WebAuthnService {
  private readonly http = inject(HttpClient)
  readonly isAvailable = !!navigator.credentials && (!!navigator.credentials.create || !!navigator.credentials.get);

  register(user: Input) {
    return this.http.get(environment.api.url + WEBAUTHN_URLS.register, {
      ...httpOptions,
      params: { ...user }
    }).pipe(
      map(CredentialUtils.createPublicKey),
      switchMap(CredentialUtils.createRegisterCredential$),
      switchMap((credential) => this.registerCallback$(credential, user.username)),
    )
  }

  login(user: Input) {
    return this.http.get(environment.api.url + WEBAUTHN_URLS.login, {
      ...httpOptions,
      params: { ...user }
    })
      .pipe(
        map(CredentialUtils.createPublicKeyRequestOptions),
        switchMap(CredentialUtils.createLoginCredential$),
        switchMap(credential => this.loginCallback$(credential)),
      )
  }

  loginCallback$ (credential: ILoginCredential) {
    return this.http.post(environment.api.url + WEBAUTHN_URLS.login2, credential, httpOptions)
  }

  registerCallback$ (credential: IRegisterCredential, username: string) {
    const urlQuery = new URLSearchParams({
      username,
    })

    return this.http.post(environment.api.url + WEBAUTHN_URLS.register2 + '?' + urlQuery.toString(), credential, httpOptions)
  }

  logout() {
    console.log(environment.api.url + WEBAUTHN_URLS.logout)
    return this.http.get(environment.api.url + WEBAUTHN_URLS.logout, httpOptions)
  }
}

