// In-memory store for OTPs (in production, use Redis or database)
interface OTPData {
  otp: string;
  expiresAt: number;
  email: string;
}

declare global {
  // eslint-disable-next-line no-var
  var __otpStore: Map<string, OTPData> | undefined;
}

const otpStore = globalThis.__otpStore ?? new Map<string, OTPData>();
globalThis.__otpStore = otpStore;

export const setOTP = (email: string, otp: string, expiresInMinutes: number = 10) => {
  const expiresAt = Date.now() + expiresInMinutes * 60 * 1000;
  otpStore.set(email, { otp, expiresAt, email });
};

export const getOTP = (email: string): OTPData | undefined => {
  return otpStore.get(email);
};

export const deleteOTP = (email: string) => {
  otpStore.delete(email);
};

export const verifyOTP = (email: string, otp: string): boolean => {
  const storedData = otpStore.get(email);
  if (!storedData) return false;
  if (Date.now() > storedData.expiresAt) {
    otpStore.delete(email);
    return false;
  }
  return storedData.otp === otp;
};

export default otpStore;

