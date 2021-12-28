import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import * as serviceAccount from './serviceAccountKey.json';

const firebase_parms = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};

@Injectable()
export class FirebaseAppService {
  private defaultApps: firebase.app.App;

  constructor() {
    this.defaultApps = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_parms),
    });
  }

  async verify(token: string | null) {
    const user = await this.defaultApps
      .auth()
      .verifyIdToken(token.replace('Bearer', '').trim());

    return user;
  }

  async createCookie(token: string | null) {
    return this.defaultApps
      .auth()
      .createSessionCookie(token.replace('Bearer', '').trim(), {
        expiresIn: 60 * 60 * 24 * 5 * 1000,
      });
  }

  async verifySessionCookie(sessionCookie: string) {
    return this.defaultApps.auth().verifySessionCookie(sessionCookie, true);
  }
}
