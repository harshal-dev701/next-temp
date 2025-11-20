'use client';
import { useFormik } from 'formik';
import React, { useCallback, useState, useEffect, useRef } from 'react';
import { ForgotPasswordInterface, ResetPasswordInterface } from '@/interfaces/authInterface';
import * as Yup from 'yup';
import Link from 'next/link';
import { IoIosCloseCircle } from 'react-icons/io';
import { resetPasswordService, verifyOTPService, sendForgotPasswordOTPService } from '@/services/authServices';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// Type-safe icon component wrapper for React 19 compatibility
const ErrorIcon: React.FC<{ className?: string; size?: number }> = (props) => {
  // @ts-ignore - React 19 compatibility issue with react-icons
  return <IoIosCloseCircle {...props} />;
};

type Step = 'email' | 'otp' | 'reset';

const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  // Countdown timer for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Email form
  const emailFormik = useFormik<ForgotPasswordInterface>({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        const response = await sendForgotPasswordOTPService(values.email);
        if (response.status === 200) {
          setEmail(values.email);
          setCurrentStep('otp');
          setResendTimer(60); // 60 seconds countdown
          toast.success('OTP sent to your email!');
        }
      } catch (error: any) {
        toast.error(error?.message || 'Failed to send OTP');
      } finally {
        setSubmitting(false);
      }
    }
  });

  // OTP input handlers
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits are entered
    if (newOtp.every((digit) => digit !== '') && newOtp.join('').length === 6) {
      handleOtpSubmit(newOtp.join(''));
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
      setOtp(newOtp.slice(0, 6));
      if (pastedData.length === 6) {
        handleOtpSubmit(pastedData);
      } else {
        otpInputRefs.current[pastedData.length]?.focus();
      }
    }
  };

  const handleOtpSubmit = useCallback(
    async (otpValue: string) => {
      try {
        const response = await verifyOTPService(email, otpValue);
        if (response.status === 200) {
          setCurrentStep('reset');
          toast.success('OTP verified successfully!');
        }
      } catch (error: any) {
        toast.error(error?.message || 'Invalid OTP');
        setOtp(['', '', '', '', '', '']);
        otpInputRefs.current[0]?.focus();
      }
    },
    [email]
  );

  const handleResendOTP = useCallback(async () => {
    if (resendTimer > 0 || isResending) return;

    try {
      setIsResending(true);
      const response = await sendForgotPasswordOTPService(email);
      if (response.status === 200) {
        setResendTimer(60);
        setOtp(['', '', '', '', '', '']);
        otpInputRefs.current[0]?.focus();
        toast.success('OTP resent to your email!');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to resend OTP');
    } finally {
      setIsResending(false);
    }
  }, [email, resendTimer, isResending]);

  // Reset password form
  const resetFormik = useFormik<ResetPasswordInterface>({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        const otpValue = otp.join('');
        const response = await resetPasswordService(email, otpValue, values.password);
        if (response.status === 200) {
          toast.success('Password reset successfully');
          router.push('/login');
        }
      } catch (error: any) {
        toast.error(error?.message || 'Failed to reset password');
      } finally {
        setSubmitting(false);
      }
    }
  });

  const renderStepIndicator = () => {
    const steps = [
      { key: 'email', label: 'Email', number: 1 },
      { key: 'otp', label: 'Verify', number: 2 },
      { key: 'reset', label: 'Reset', number: 3 }
    ];

    return (
      <div className='flex items-center justify-center mb-8'>
        {steps.map((step, index) => (
          <React.Fragment key={step.key}>
            <div className='flex flex-col items-center'>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  currentStep === step.key
                    ? 'bg-blue-600 text-white scale-110'
                    : steps.findIndex((s) => s.key === currentStep) > index
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                }`}>
                {steps.findIndex((s) => s.key === currentStep) > index ? (
                  <svg className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <p
                className={`mt-2 text-xs font-medium ${
                  currentStep === step.key ? 'text-blue-600' : 'text-gray-500'
                }`}>
                {step.label}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 w-20 mx-2 transition-all duration-300 ${
                  steps.findIndex((s) => s.key === currentStep) > index ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl animate-fade-in'>
        {/* Header */}
        <div className='text-center'>
          <h2 className='text-3xl font-extrabold text-gray-900 mb-2'>Forgot Password</h2>
          <p className='text-sm text-gray-600'>
            {currentStep === 'email' && 'Enter your email to receive OTP'}
            {currentStep === 'otp' && 'Enter the 6-digit OTP sent to your email'}
            {currentStep === 'reset' && 'Enter your new password'}
          </p>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Email Step */}
        {currentStep === 'email' && (
          <form onSubmit={emailFormik.handleSubmit} className='mt-8 space-y-6'>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                Email Address
            </label>
            <input
              id='email'
              name='email'
              type='email'
              autoComplete='email'
                value={emailFormik.values.email}
                onChange={emailFormik.handleChange}
                onBlur={emailFormik.handleBlur}
              className={`
                  appearance-none relative block w-full px-3 py-3 border rounded-lg 
                  placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent transition duration-150
                  ${emailFormik.errors.email && emailFormik.touched.email ? 'border-red-500' : 'border-gray-300'}
                `}
              placeholder='you@example.com'
            />
              {emailFormik.errors.email && emailFormik.touched.email && (
              <p className='mt-1 text-sm text-red-600 flex items-center gap-1'>
                <ErrorIcon className='text-red-500' size={20} />
                  {emailFormik.errors.email}
              </p>
            )}
          </div>

            <div>
              <button
                type='submit'
                disabled={emailFormik.isSubmitting}
                className='group relative w-full flex justify-center py-3 px-4 border 
                border-transparent text-sm font-medium rounded-lg text-white 
                bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-blue-500 transition duration-150 
                transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 
                disabled:cursor-not-allowed'>
                {emailFormik.isSubmitting ? 'Sending...' : 'Send OTP'}
              </button>
            </div>

            <div className='text-center'>
              <Link href='/login' className='text-sm font-medium text-blue-600 hover:text-blue-500 transition'>
                Back to Login
              </Link>
            </div>
          </form>
        )}

        {/* OTP Step */}
        {currentStep === 'otp' && (
          <div className='mt-8 space-y-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-3 text-center'>
                Enter OTP sent to <span className='font-semibold text-blue-600'>{email}</span>
              </label>
              <div className='flex justify-center gap-2 mb-4'>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      otpInputRefs.current[index] = el;
                    }}
                    type='text'
                    inputMode='numeric'
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onPaste={handleOtpPaste}
                    className={`
                      w-12 h-14 text-center text-2xl font-bold border-2 rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150
                      ${digit ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
                    `}
                  />
                ))}
              </div>
            </div>

            <div className='text-center space-y-4'>
              <p className='text-sm text-gray-600'>
                Didn't receive OTP?{' '}
                <button
                  type='button'
                  onClick={handleResendOTP}
                  disabled={resendTimer > 0 || isResending}
                  className={`font-medium transition ${
                    resendTimer > 0 || isResending
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-blue-600 hover:text-blue-500'
                  }`}>
                  {isResending
                    ? 'Resending...'
                    : resendTimer > 0
                      ? `Resend OTP (${resendTimer}s)`
                      : 'Resend OTP'}
                </button>
              </p>

              <button
                type='button'
                onClick={() => {
                  setCurrentStep('email');
                  setOtp(['', '', '', '', '', '']);
                  setResendTimer(0);
                }}
                className='text-sm font-medium text-gray-600 hover:text-gray-800 transition'>
                Change Email
              </button>
            </div>
          </div>
        )}

        {/* Reset Password Step */}
        {currentStep === 'reset' && (
          <form onSubmit={resetFormik.handleSubmit} className='mt-8 space-y-6'>
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>
                New Password
            </label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='new-password'
                value={resetFormik.values.password}
                onChange={resetFormik.handleChange}
                onBlur={resetFormik.handleBlur}
                className={`
                    appearance-none relative block w-full px-3 py-3 border rounded-lg 
                    placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 
                    focus:ring-blue-500 focus:border-transparent transition duration-150
                  ${resetFormik.errors.password && resetFormik.touched.password ? 'border-red-500' : 'border-gray-300'}
                `}
                placeholder='Enter new password'
              />
              {resetFormik.errors.password && resetFormik.touched.password && (
              <p className='mt-1 text-sm text-red-600 flex items-center gap-1'>
                <ErrorIcon className='text-red-500' size={20} />
                  {resetFormik.errors.password}
              </p>
            )}
          </div>

            <div>
              <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700 mb-1'>
                Confirm Password
              </label>
              <input
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                autoComplete='new-password'
                value={resetFormik.values.confirmPassword}
                onChange={resetFormik.handleChange}
                onBlur={resetFormik.handleBlur}
                className={`
                  appearance-none relative block w-full px-3 py-3 border rounded-lg 
                  placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent transition duration-150
                  ${resetFormik.errors.confirmPassword && resetFormik.touched.confirmPassword
                    ? 'border-red-500'
                    : 'border-gray-300'}
                `}
                placeholder='Confirm new password'
              />
              {resetFormik.errors.confirmPassword && resetFormik.touched.confirmPassword && (
                <p className='mt-1 text-sm text-red-600 flex items-center gap-1'>
                  <ErrorIcon className='text-red-500' size={20} />
                  {resetFormik.errors.confirmPassword}
                </p>
              )}
          </div>

          <div>
            <button
              type='submit'
                disabled={resetFormik.isSubmitting}
              className='group relative w-full flex justify-center py-3 px-4 border 
              border-transparent text-sm font-medium rounded-lg text-white 
              bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-blue-500 transition duration-150 
              transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 
              disabled:cursor-not-allowed'>
                {resetFormik.isSubmitting ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>

          <div className='text-center'>
              <button
                type='button'
                onClick={() => {
                  setCurrentStep('otp');
                  resetFormik.resetForm();
                }}
                className='text-sm font-medium text-gray-600 hover:text-gray-800 transition'>
                Back to OTP
              </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
