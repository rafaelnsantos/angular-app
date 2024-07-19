import {Observable} from "rxjs";

export const createCredential = (publicKey: CredentialCreationOptions['publicKey']): Observable<Credential> =>
  new Observable((observer) => {
    navigator.credentials.create({ publicKey })
      .then((credential) => observer.next(credential!))
      .catch((error) => observer.error(error))
      .finally(() => observer.complete());
  })


export const getCredential = (publicKey: PublicKeyCredentialRequestOptions): Observable<Credential> =>
   new Observable((observer) => {
    navigator.credentials.get({ publicKey })
      .then((credential) => observer.next(credential!))
      .catch((error) => observer.error(error))
      .finally(() => observer.complete());
  })
