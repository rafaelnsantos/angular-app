import {Observable} from "rxjs";
import { bufferToBase64, decodeBase64Url } from "./buffer.utils";

export interface IRegisterCredential extends Credential {
  rawId: string;
  response: {
    attestationObject: string,
    clientDataJSON: string
  },
}

export interface ILoginCredential extends Credential {
  rawId: string;
  response: {
    clientDataJSON: string,
    authenticatorData: string,
    signature: string,
    userHandle: string
  },
}

export class CredentialUtils {
  private static createLoginCretential (credential: any): ILoginCredential {
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
    }
  }


  private static createRegisterCredential (credential: any): IRegisterCredential {
    return {
      id: credential.id,
      rawId: bufferToBase64(credential.rawId),
      response: {
        attestationObject: bufferToBase64(credential.response.attestationObject),
        clientDataJSON: bufferToBase64(credential.response.clientDataJSON)
      },
      type: credential.type,
    }
  }

  static createRegisterCredential$(publicKey: CredentialCreationOptions['publicKey']): Observable<IRegisterCredential> {
    return new Observable((observer) => {
      navigator.credentials.create({ publicKey })
        .then((response) => observer.next(CredentialUtils.createRegisterCredential(response)))
        .catch(observer.error)
        .finally(() => observer.complete());
    })
  }

  static createLoginCredential$(publicKey: PublicKeyCredentialRequestOptions): Observable<ILoginCredential>{
    return new Observable((observer) => {
      navigator.credentials.get({ publicKey })
        .then((response) => observer.next(CredentialUtils.createLoginCretential(response)))
        .catch(observer.error)
        .finally(() => observer.complete());
    })
  }

  static createPublicKey (response: any): CredentialCreationOptions['publicKey'] {
    response.challenge = decodeBase64Url(response.challenge)
    response.user.id = decodeBase64Url(response.user.id)
    return response
  }


  static createPublicKeyRequestOptions (res: any): PublicKeyCredentialRequestOptions {
    res.challenge = decodeBase64Url(res.challenge);
    if (res.allowCredentials) {
      for (let i = 0; i < res.allowCredentials.length; i++) {
        res.allowCredentials[i].id = decodeBase64Url(res.allowCredentials[i].id);
      }
    }
    return res;
  }
}

function LogInputOutput(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Function ${propertyKey} called with arguments:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Function ${propertyKey} returned:`, result);
    return result;
  };

  return descriptor;
}
