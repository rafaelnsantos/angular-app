import {computed, effect, inject, Injectable, InjectionToken, signal} from '@angular/core';
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

const TOKEN_KEY = 'token'

const WEBAUTHN_URLS = {
  register: '/q/webauthn/register-options-challenge',
  register2: '/webauthn/register',
  login: '/q/webauthn/login-options-challenge',
  login2: '/webauthn/login',
  logout: '/q/webauthn/logout'
}

@Injectable({
  providedIn: 'root'
})
export class WebAuthnService {
  private readonly http = inject(HttpClient)
  readonly isAvailable = !!navigator.credentials && (!!navigator.credentials.create || !!navigator.credentials.get);
  token = signal(localStorage.getItem(TOKEN_KEY))
  isSignedIn = computed(() => !!this.token());

  register(user: Input) {
    this.http.get(environment.api.url + WEBAUTHN_URLS.register, {
      ...httpOptions,
      params: { ...user }
    }).pipe(
      map(CredentialUtils.createPublicKey),
      switchMap(CredentialUtils.$createRegisterCredential),
      switchMap((credential) => this.$registerCallback(credential, user.username)),
      take(1)
    ).subscribe({
      next: (token) => {
        localStorage.setItem(TOKEN_KEY, token.token);
        this.token.set(token.token);
      },
      error: console.error
    })
  }

  login(user: Input) {
    this.http.get(environment.api.url + WEBAUTHN_URLS.login, {
      ...httpOptions,
      params: { ...user }
    })
      .pipe(
        map(CredentialUtils.createPublicKeyRequestOptions),
        switchMap(CredentialUtils.$createLoginCredential),
        switchMap(res => this.$loginCallback(res)),
        take(1)
      ).subscribe({
        next: (token) => {
          localStorage.setItem(TOKEN_KEY, token.token);
          this.token.set(token.token);
        },
        error: console.error
      })
  }

  $loginCallback (credential: ILoginCredential) {
    const body = new URLSearchParams({
      webAuthnId: credential.id,
      webAuthnRawId: credential.rawId,
      webAuthnResponseClientDataJSON: credential.response.clientDataJSON,
      webAuthnType: credential.type,
      webAuthnResponseAuthenticatorData: credential.response.authenticatorData,
      webAuthnResponseSignature: credential.response.signature,
      webAuthnResponseUserHandle: credential.response.userHandle,
    })

    return this.http.post<TokensDto>(environment.api.url + WEBAUTHN_URLS.login2, body.toString(), {
      ...httpOptions,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  $registerCallback (credential: IRegisterCredential, username: string) {
    const body = new URLSearchParams({
      webAuthnId: credential.id,
      webAuthnRawId: credential.rawId,
      webAuthnResponseClientDataJSON: credential.response.clientDataJSON,
      webAuthnType: credential.type,
      webAuthnResponseAttestationObject: credential.response.attestationObject,
      username,
    })

    return this.http.post<TokensDto>(environment.api.url + WEBAUTHN_URLS.register2, body.toString(), {
      ...httpOptions,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  logout() {

  }
}

