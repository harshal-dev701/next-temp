'use client';
import { setAllUsersList } from '@/actions/userActions';
import { UsersService } from '@/services/user.service';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../ui/button';

const HomePage = () => {
  const userReducer = useSelector((state: any) => state.users);
  const { allUsersList } = userReducer;
  console.log('allUsersList--------------->', allUsersList);
  const dispatch = useDispatch();

  const getAllUsers = useCallback(async () => {
    try {
      const response = await UsersService.getAllUsers();
      if (response.status === 200) {
        dispatch(setAllUsersList(response?.data || []));
      }
    } catch (error) {
      console.log('error', error);
    }
  }, []);

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSendNotification = useCallback(
    async (userId: string, name: string) => {
      const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string;

      const urlBase64ToUint8Array = (base64String: string) => {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
      };

      if (!userId) {
        console.error('No user id found for subscription');
        return;
      }

      if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !('PushManager' in window)) {
        console.error('ServiceWorker or Push is not supported in this browser.');
        return;
      }

      const reg = await navigator.serviceWorker.ready;

      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
      });

      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          subscription
        })
      });

      // Send a nice notification to this specific user
      await fetch('/api/send-to-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          title: `Hey ${name || 'there'} 👋`,
          message: 'Tap to open your dashboard and see the latest updates just for you.',
          url: '/',
          icon: '/file.svg'
        })
      });
    },
    []
  );

  return (
    <div className='w-full h-full text-black dark:text-white'>
      <h1 className='text-2xl font-semibold mb-4 text-black dark:text-white'>Users</h1>
      <p className='mb-6 text-sm text-gray-600 dark:text-gray-300'>
        Click &quot;Send Notification&quot; to send a personalized push notification to that user.
      </p>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {allUsersList?.map((user: any) => (
          <div
            key={user._id}
            className='border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col justify-between shadow-sm bg-white dark:bg-zinc-900'
          >
            <div className='mb-3'>
              <h2 className='font-medium text-black dark:text-white'>
                {user.firstName} {user.lastName}
              </h2>
              <p className='text-xs text-gray-500 dark:text-gray-400 break-all'>{user.email}</p>
            </div>
            <Button
              variant='outline'
              className='mt-2'
              onClick={() => handleSendNotification(user._id?.toString(), user.firstName)}
            >
              Send Notification
            </Button>
          </div>
        ))}
        {!allUsersList?.length && (
          <p className='text-sm text-gray-500 dark:text-gray-400'>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
