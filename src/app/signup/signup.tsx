'use client';
import React, { useCallback, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signup } from '@/services/authServices';
import { IoIosCloseCircle } from 'react-icons/io';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const ErrorIcon: React.FC<{ className?: string; size?: number }> = (props) => {
  // @ts-ignore - React 19 compatibility issue with react-icons
  return <IoIosCloseCircle {...props} />;
};

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = useCallback(
    async (values: any, setSubmitting: (isSubmitting: boolean) => void) => {
      try {
        setSubmitting(true);
        const response = await signup(values.firstName, values.lastName, values.email, values.password);
        if (response.status === 200) {
          router.push('/login');
          toast.success(response.message || 'Signup successfully');
        } else {
          toast.error(response.message || 'Signup failed');
        }
      } catch (error: any) {
        console.error('error', error);
        toast.error(error?.message || 'Internal server error');
        setSubmitting(false);
      } finally {
        setSubmitting(false);
      }
    },
    [router]
  );

  const formik = useFormik<any>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('Password is required'),
      confirmPassword: Yup.string().required('Confirm password is required'),
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required')
    }),
    onSubmit: (values, { setSubmitting }) => {
      handleSubmit(values, setSubmitting);
    }
  });

  const { values, errors, touched, handleChange, handleBlur, isSubmitting }: any = formik;

  return (
    <div
      className='min-h-screen flex items-center justify-center 
  bg-linear-to-br from-purple-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-lg w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl'>
        {/* Header */}
        <div className='text-center'>
          <h2 className='text-4xl font-extrabold text-gray-900 mb-2'>Create Account</h2>
          <p className='text-base text-gray-600'>Sign up to get started</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={formik.handleSubmit} className='mt-8 space-y-4'>
          {/* Name Fields */}
          <div className='grid grid-cols-2 gap-4'>
            {/* First Name */}
            <div>
              <label htmlFor='firstName' className='block text-sm font-medium text-gray-700 mb-1'>
                First Name
              </label>
              <input
                id='firstName'
                name='firstName'
                type='text'
                autoComplete='given-name'
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`
              appearance-none relative block w-full px-3 py-3 border rounded-lg 
              placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 
              focus:ring-purple-500 focus:border-transparent transition duration-150
              ${errors.firstName && touched.firstName ? 'border-red-500' : 'border-gray-300'}
            `}
                placeholder='John'
              />
              {errors.firstName && touched.firstName && (
                <p className='mt-1 text-sm text-red-600 flex items-center gap-1'>
                  <ErrorIcon className='text-red-500' size={20} />
                  {errors.firstName}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor='lastName' className='block text-sm font-medium text-gray-700 mb-1'>
                Last Name
              </label>
              <input
                id='lastName'
                name='lastName'
                type='text'
                autoComplete='family-name'
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`
              appearance-none relative block w-full px-3 py-3 border rounded-lg 
              placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 
              focus:ring-purple-500 focus:border-transparent transition duration-150
              ${errors.lastName && touched.lastName ? 'border-red-500' : 'border-gray-300'}
            `}
                placeholder='Doe'
              />
              {errors.lastName && touched.lastName && (
                <p className='mt-1 text-sm text-red-600 flex items-center gap-1'>
                  <ErrorIcon className='text-red-500' size={20} />
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
              Email address
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
            focus:ring-purple-500 focus:border-transparent transition duration-150
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
                autoComplete='new-password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`
              appearance-none relative block w-full px-3 py-3 border rounded-lg 
              placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 
              focus:ring-purple-500 focus:border-transparent transition duration-150
              ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'}
            `}
                placeholder='Enter your password'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700'>
                {showPassword ? (
                  <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.736m0 0L21 21'
                    />
                  </svg>
                ) : (
                  <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
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

          {/* Confirm Password Field */}
          <div>
            <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700 mb-1'>
              Confirm Password
            </label>
            <div className='relative'>
              <input
                id='confirmPassword'
                name='confirmPassword'
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete='new-password'
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`
              appearance-none relative block w-full px-3 py-3 border rounded-lg 
              placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 
              focus:ring-purple-500 focus:border-transparent transition duration-150
              ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-300'}
            `}
                placeholder='Confirm your password'
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700'>
                {showConfirmPassword ? (
                  <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.736m0 0L21 21'
                    />
                  </svg>
                ) : (
                  <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
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
            {errors.confirmPassword && touched.confirmPassword && (
              <p className='mt-1 text-sm text-red-600 flex items-center gap-1'>
                <ErrorIcon className='text-red-500' size={20} />
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type='submit'
              disabled={isSubmitting}
              className='group relative w-full flex justify-center py-3 px-4 border 
          border-transparent text-sm font-medium rounded-lg text-white 
          bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 
          focus:ring-offset-2 focus:ring-purple-500 transition duration-150 
          transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 
          disabled:cursor-not-allowed'>
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>

          {/* Login Link */}
          <div className='text-center'>
            <p className='text-sm text-gray-600'>
              Already have an account?{' '}
              <Link href={'/login'} className='font-medium text-purple-600 hover:text-purple-500 transition'>
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
