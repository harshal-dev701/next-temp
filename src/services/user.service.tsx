import customAxios from '@/serverCall';

export const getAllUsersService = async () => {
  const response = await customAxios.get('/users');
  if (response.status === 200) {
    return response?.data;
  } else {
    throw new Error(response?.data?.message || 'Failed to send OTP');
  }
};

export const UsersService = {
  getAllUsers: getAllUsersService
};
