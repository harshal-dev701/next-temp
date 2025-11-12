'use client';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function Page404() {
  const router = useRouter();

  const onClickNavigate = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <div className='flex flex-col gap-2'>
      <div className='text-2xl font-bold'>Whoops!</div>
      <div className='text-sm text-gray-500'>We can’t seem to find the page thatyou’re looking for</div>
      <button className='bg-blue-500 text-white px-4 py-2 rounded-md' onClick={onClickNavigate}>
        Go Home
      </button>
    </div>
  );
}
