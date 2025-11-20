import { User } from 'firebase/auth';
export interface AuthSignUpInputInterface {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface AuthErrorInterface {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  checked: boolean;
  firebaseError: string;
  forgotPassword: string;
  resetPassword: string;
}
export interface LoginInputInterface {
  email: string;
  password: string;
}

export interface ResetPasswordInterface {
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordInterface {
  email: string;
}

export interface OTPVerificationInterface {
  otp: string;
}

export interface InvoiceDataInterface {
  amount: number;
  created_at: string;
  created_by: string;
  discount: number;
  due_date: string;
  invoice: string;
  invoice_pdf: string;
  payment_reference: string | null;
  payment_type: string[];
  plan_id: string;
  plan_name: string;
  promoCode: string | null;
  referenceId: string;
  start_date: string;
  status: number;
  updated_at: string;
  updated_by: string;
  userId: string;
  _id: string;
}
export interface AuthReducerInterface {
  loading: boolean;
  authDetails: AuthSignUpInputInterface;
  validationErrorMessage: AuthErrorInterface;
  loginDetails: LoginInputInterface;
  resetPassword: ResetPasswordInterface;
  subscriptionsList: InvoiceDataInterface[];
}
export interface AuthUser extends User {
  access_token?: string;
}

export interface UserDetailsInterface {
  _id: string;
  first_name: string;
  last_name: string;
  password: string;
  userId: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}

export interface ImageGenrateCategoryListInterface {
  additional: [string];
  category: [string];
}

export interface createImageGenerationCollectionInterface {
  userId: string;
  prompt: string;
}
export interface FacebookAdAccount {
  id: string;
  name: string;
}

export interface UpdateUserPayloadInterfcae {
  fb_access_token: string;
  fb_token_expire: string;
  userId: string;
}
