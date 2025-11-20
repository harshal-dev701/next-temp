'use client';
import { useFormik } from 'formik';
import React, { useCallback, useState } from 'react';
import { LoginInputInterface } from '@/interfaces/authInterface';
import * as Yup from 'yup';
import Link from 'next/link';
import { IoIosCloseCircle } from 'react-icons/io';
import { login } from '@/services/authServices';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// Type-safe icon component wrapper for React 19 compatibility
const ErrorIcon: React.FC<{ className?: string; size?: number }> = (props) => {
  // @ts-ignore - React 19 compatibility issue with react-icons
  return <IoIosCloseCircle {...props} />;
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleSubmit = useCallback(
    async (values: LoginInputInterface, setSubmitting: (isSubmitting: boolean) => void) => {
      try {
        setSubmitting(true);
        const response = await login(values.email, values.password);
        if (response.status === 200) {
          router.push('/');
          toast.success(response.message || 'Login successful');
        } else {
          toast.error(response.message || 'Login failed');
        }
      } catch (error: any) {
        console.error('Login error:', error);
        toast.error(error?.message || 'Login failed');
        setSubmitting(false);
      } finally {
        setSubmitting(false);
      }
    },
    [router]
  );

  const formik = useFormik<LoginInputInterface>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: (values, { setSubmitting }) => {
      handleSubmit(values, setSubmitting);
    }
  });

  const { values, errors, touched, handleChange, handleBlur, isSubmitting } = formik;

  return (
    <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl'>
        {/* Header */}
        <div className='text-center'>
          {/* <h2 className='text-4xl font-extrabold mb-2 text-center text-blue-600'>Sign In</h2> */}
          <h2 className='text-3xl font-extrabold text-gray-900 mb-2 text-center'>Welcome to the platform</h2>
          <p className='text-sm text-gray-600'>Please enter your details to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={formik.handleSubmit} className='mt-8 space-y-6'>
            {/* Email Field */}
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`
                  appearance-none relative block w-full px-3 py-3 border rounded-lg 
                  placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent transition duration-150
                  ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'}
                `}
                placeholder='you@example.com'
              />
              {errors.email && touched.email && (
                <p className='mt-1 text-sm text-red-600 flex items-center gap-1'>
                  <ErrorIcon className='text-red-500' size={20} />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>
                Password
              </label>
              <div className='relative'>
                <input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  autoComplete='current-password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`
                    appearance-none relative block w-full px-3 py-3 border rounded-lg 
                    placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 
                    focus:ring-blue-500 focus:border-transparent transition duration-150
                    ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'}
                  `}
                  placeholder='Enter your password'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 cursor-pointer'>
                  {showPassword ? (
                    <svg className='h-5 w-5 cursor-pointer' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.736m0 0L21 21'
                      />
                    </svg>
                  ) : (
                    <svg className='h-5 w-5 cursor-pointer' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && touched.password && (
                <p className='mt-1 text-sm text-red-600 flex items-center gap-1'>
                  <ErrorIcon className='text-red-500' size={20} />
                  {errors.password}
                </p>
              )}
            </div>

          {/* Remember Me & Forgot Password */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center cursor-pointer'>
              <input
                id='rememberMe'
                name='rememberMe'
                type='checkbox'
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer'
              />
              <label htmlFor='rememberMe' className='ml-2 block text-sm text-gray-700 cursor-pointer'>
                Remember me
              </label>
            </div>

            <div className='text-sm'>
              <a href='#' className='font-medium text-blue-600 hover:text-blue-500 transition'>
                Forgot password?
              </a>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type='submit'
              disabled={isSubmitting}
              className='group relative w-full flex justify-center py-3 px-4 border 
              border-transparent text-sm font-medium rounded-lg text-white 
              bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-blue-500 transition duration-150 
              transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 
              disabled:cursor-not-allowed'>
              {isSubmitting ? 'Logging in...' : 'Log in'}
            </button>
          </div>

          {/* Signup Link */}
          <div className='text-center'>
            <p className='text-sm text-gray-600'>
              Don't have an account?{' '}
              <Link href='/signup' className='font-medium text-blue-600 hover:text-blue-500 transition'>
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
