import {inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {bufferToBase64, decodeBase64Url} from "./utils/buffer.utils";
import {map, switchMap} from "rxjs";
import {createCredential, getCredential} from "./utils/credential.utils";

export const ROTAS_TOKEN = new InjectionToken<Routes>('rotas')

interface Routes {
  register: string,
  login: string,
  callback: string,
}

const httpOptions = {
  withCredentials: true,
};

interface Input {
  name: string,
  displayName: string
}

@Injectable({
  providedIn: 'root'
})
export class WebAuthnService {
  private readonly rotas = inject(ROTAS_TOKEN)
  private readonly http = inject(HttpClient)
  readonly isAvailable = !!navigator.credentials && (!!navigator.credentials.create || !!navigator.credentials.get);

  registerOnly(user: Input) {
    return this.http.post(this.rotas.register, user, httpOptions).pipe(
      map((response: any) => {
        response.challenge = decodeBase64Url(response.challenge)
        response.user.id = decodeBase64Url(response.user.id)
        return response
      }),
      switchMap((response) => createCredential(response)),
      map((credential: any) => {
        return {
          id: credential.id,
          rawId: bufferToBase64(credential.rawId),
          response: {
            attestationObject: bufferToBase64(credential.response.attestationObject),
            clientDataJSON: bufferToBase64(credential.response.clientDataJSON)
          },
          type: credential.type,
        }
      }),
    )
  }

  register(user: Input) {
    return this.registerOnly(user).pipe(
      switchMap((credential) => this.http.post(this.rotas.callback, credential, httpOptions)),
    )
  }

  loginOnly(user: Input) {
    return this.http.post(this.rotas.login, user, httpOptions)
      .pipe(
        map((res: any) => {
          res.challenge = decodeBase64Url(res.challenge);
          if (res.allowCredentials) {
            for (let i = 0; i < res.allowCredentials.length; i++) {
              res.allowCredentials[i].id = decodeBase64Url(res.allowCredentials[i].id);
            }
          }
          return res;
        }),
        switchMap((res) => getCredential(res)),
        map((credential: any) => {
          return {
            id: credential.id,
            rawId: bufferToBase64(credential.rawId),
            response: {
              clientDataJSON: bufferToBase64(credential.response.clientDataJSON),
              authenticatorData: bufferToBase64(credential.response.authenticatorData),
              signature: bufferToBase64(credential.response.signature),
              userHandle: bufferToBase64(credential.response.userHandle),
            },
            type: credential.type
          };
        })
      )
  }

  login(user: Input) {
    return this.loginOnly(user).pipe(
      switchMap((credential) => this.http.post(this.rotas.callback, credential, httpOptions)),
    )
  }


}

export const provideWebAuthn = (rotas: Routes) => ({
  provide: ROTAS_TOKEN,
  useValue: rotas
})
