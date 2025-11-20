'use client';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function Page404() {
  const router = useRouter();

  const onClickNavigate = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <div className='min-h-screen flex items-center justify-center px-4 py-12 bg-background'>
      <div className='max-w-2xl w-full text-center flex flex-col items-center gap-6'>
        {/* 404 Number */}
        <div className='flex items-center gap-2'>
          <h1 className='text-8xl md:text-9xl font-bold text-blue-500 dark:text-blue-400 opacity-80'>4</h1>0{' '}
          <div className='w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-500 dark:bg-blue-400 opacity-80 animate-pulse'></div>
          <h1 className='text-8xl md:text-9xl font-bold text-blue-500 dark:text-blue-400 opacity-80'>4</h1>
        </div>

        {/* Main Message */}
        <div className='flex flex-col gap-3'>
          <h2 className='text-3xl md:text-4xl font-bold text-foreground'>Oops! Page Not Found</h2>
          <p className='text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto'>
            We can't seem to find the page that you're looking for. It might have been doesn't exist.
          </p>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 mt-4'>
          <button
            onClick={onClickNavigate}
            className='bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 cursor-pointer dark:hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
            Go Back Home
          </button>
          <button
            onClick={() => router.back()}
            className='bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer text-gray-800 dark:text-gray-200 font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2'>
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className='mt-8 pt-8 border-t border-gray-200 dark:border-gray-700'>
          <p className='text-sm text-gray-500 dark:text-gray-400 mb-3'>Here are some helpful links:</p>
          <div className='flex flex-wrap justify-center gap-4 text-sm'>
            <a
              href='/'
              className='text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline transition-colors'>
              Home
            </a>
            <span className='text-gray-300 dark:text-gray-600'>•</span>
            <button
              onClick={() => window.location.reload()}
              className='text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline transition-colors bg-transparent border-none cursor-pointer'>
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
