import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccountStr = process.env.FIREBASE_ADMIN_SDK_CERT;
if (!serviceAccountStr) {
  throw new Error('Please define `FIREBASE_ADMIN_SDK_CERT` in .env');
}

const serviceAccountCert = JSON.parse(serviceAccountStr);

const app =
  admin.apps.length > 0 && admin.apps[0] !== null
    ? admin.apps[0]
    : admin.initializeApp({ credential: admin.credential.cert(serviceAccountCert) });

export const adminDb = getFirestore(app);
export const adminAuth = getAuth(app);
