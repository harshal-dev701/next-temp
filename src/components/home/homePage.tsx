'use client';

import { setAllUsersList } from '@/actions/userActions';
import { UsersService } from '@/services/user.service';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
      } else {
        console.log('error', response.message);
      }
    } catch (error) {
      console.log('error', error);
    }
  }, []);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className='w-full h-full text-black dark:text-white'>
      <h1 className='text-black dark:text-white'>Home Page</h1>
      {/* <Button variant='outline'>Click me</Button> */}
    </div>
  );
};

export default HomePage;
