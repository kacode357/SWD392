import { defaultAxiosInstance, axiosWithoutLoading } from './axios.customize';

const createUserApi = async (data: { email: string, password: string, userName: string, dob: string, address: string, phoneNumber: string, gender: string, imgUrl: string }) => {
  const URL_API = '/api/user/register';
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};


const loginUserApi = async (data: { email: string, password: string }) => {
  const URL_API = '/api/user/login';
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};

const getCurrentLogin = async () => {
  const URL_API = '/api/user/getcurrentuser';
  const token = localStorage.getItem('token');
  if (token){
    const response = await axiosWithoutLoading.get(URL_API);
    return response.data;
  } 
};

const getAllUserApi = async (data: {  searchCondition: {keyword: string; role: string; status: string; is_deleted: boolean;}; pageInfo: {pageNum: number; pageSize: number; };}) => {
  const URL_API = '/api/user';
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};
const changeUserRoleApi = async (data: { user_id: string, role: string }) => {
  const URL_API = '/api/users/change-role';
  const response = await defaultAxiosInstance.put(URL_API, data);
  return response.data;
};

const changeUserStatusApi = async (data: { user_id: string, status: string }) => {
  const URL_API = '/api/users/change-status';
  const response = await defaultAxiosInstance.put (URL_API, data);
  return response.data;
};
const deleteUserApi = async (user_id: string) => {
  const URL_API = `/api/users/${user_id}`;
  const response = await defaultAxiosInstance.delete(URL_API);
  return response.data;
};
const updateAccountApi = async (account_id: string, data: { name: string, phone_number: string, avatar: string }) => {
  const URL_API = `/api/account/${account_id}`;
  const response = await defaultAxiosInstance.put(URL_API, data);
  return response.data;
};
const createAdminUserApi = async (data: { name: string, email: string, password: string, phone_number: string }) => {
  const URL_API = '/api/users/create';
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};
const verifyEmailApi = async (email: string) => {
  const URL_API = `/api/user/verifyemail/${email}`;
  const response = await defaultAxiosInstance.post(URL_API);
  return response.data;
};

export { createUserApi, loginUserApi, getCurrentLogin, getAllUserApi, changeUserRoleApi, changeUserStatusApi, deleteUserApi, updateAccountApi, createAdminUserApi, verifyEmailApi };


