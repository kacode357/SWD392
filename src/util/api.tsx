import { defaultAxiosInstance, axiosWithoutLoading } from './axios.customize';

const createUserApi = async (data: { email: string, password: string, userName: string, dob: string, address: string, phoneNumber: string, gender: string, imgUrl: string }) => {
  const URL_API = '/api/user';
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};

const loginUserApi = async (data: { email: string, password: string }) => {
  const URL_API = '/api/user/login';
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};

const getCurrentLogin = async () => {
  const URL_API = '/api/user/currentuser';
  const token = localStorage.getItem('token');
  if (token){
    const response = await axiosWithoutLoading.get(URL_API);
    return response.data;
  } 
};
const verifyUserByIdApi = async (id: number) => {
  const URL_API = `/api/user/verify/${id}`;
  const response = await defaultAxiosInstance.put(URL_API);
  return response.data;
};

const getUserByIdApi = async (id: number) => {
  const URL_API = `/api/user/${id}`;
    const response = await axiosWithoutLoading.get(URL_API);
    return response.data;
};
const createStaffApi = async (email: string, password: string, name: string) => {
  const URL_API = `/api/user/staff?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&name=${encodeURIComponent(name)}`;
  const response = await defaultAxiosInstance.post(URL_API);
  return response.data;
};

const createManagerApi = async (email: string, password: string, name: string) => {
  const URL_API = `/api/user/manager?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&name=${encodeURIComponent(name)}`;
  const response = await defaultAxiosInstance.post(URL_API);
  return response.data;
};

const updateUserByIdApi = async (id: number, data: { userName: string; dob: string; address: string; phoneNumber: string; gender: string; imgUrl: string }) => {
  const URL_API = `/api/user/${id}`;
  const response = await defaultAxiosInstance.put(URL_API, data);
  return response.data;
};
const getAllUserApi = async (data: { pageNum: number; pageSize: number; keyWord: string; role: string; status: boolean; is_Verify: boolean; is_Delete: boolean; }) => {
  const URL_API = '/api/user/search';
  const response = await defaultAxiosInstance.post(URL_API, data);

  return response.data;
};
const changeUserRoleApi = async (data: { user_id: string, role: string }) => {
  const URL_API = '/v1/api/users/change-role';
  const response = await defaultAxiosInstance.put(URL_API, data);
  return response.data;
};

const changeUserStatusApi = async (id: number, status: boolean) => {
  const URL_API = `/api/user/changestatus/${id}`;
  const response = await defaultAxiosInstance.post(URL_API, { status });
  return response.data;
};

const deleteUserApi = async (user_id: string) => {
  const URL_API = `/v1/api/users/${user_id}`;
  const response = await defaultAxiosInstance.delete(URL_API);
  return response.data;
};
const updateAccountApi = async (account_id: string, data: { name: string, phone_number: string, avatar: string }) => {
  const URL_API = `/v1/api/account/${account_id}`;
  const response = await defaultAxiosInstance.put(URL_API, data);
  return response.data;
};
const createAdminUserApi = async (data: { name: string, email: string, password: string, phone_number: string }) => {
  const URL_API = '/v1/api/users/create';
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};

export { createUserApi, loginUserApi, getCurrentLogin, getAllUserApi, changeUserRoleApi, changeUserStatusApi, deleteUserApi, updateAccountApi, createAdminUserApi, getUserByIdApi, updateUserByIdApi, verifyUserByIdApi, createStaffApi, createManagerApi };


