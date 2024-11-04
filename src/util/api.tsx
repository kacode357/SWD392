import { defaultAxiosInstance, axiosWithoutLoading } from './axios.customize';
//Helo
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
  const URL_API = '/api/user/current-user';
  const token = localStorage.getItem('token');
  if (token) {
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

const googleSignUpApi = async (googleId: string) => {
  const URL_API = `/api/user/email?googleId=${googleId}`;
  const response = await defaultAxiosInstance.post(URL_API);
  return response.data;
};

const googleSigInpApi = async (googleId: string) => {
  const URL_API = `/api/user/loginmail?googleId=${googleId}`;
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

const changeUserStatusApi = async (id: number, status: boolean) => {
  const URL_API = `/api/user/change-status/${id}?status=${status}`;
  const response = await defaultAxiosInstance.post(URL_API);
  return response.data;
};

const searchClubApi = async (data: { pageNum: number; pageSize: number; keyWord: string; status: boolean }) => {
  const URL_API = '/api/club/search';
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};
const getClubApi = async (data: { pageNum: number; pageSize: number; keyWord: string; status: boolean }) => {
  const URL_API = '/api/club/search';
  const response = await axiosWithoutLoading.post(URL_API, data);
  return response.data;
};
const searchClientClubApi = async (data: { pageNum: number; pageSize: number; keyWord: string; status: boolean }) => {
  const URL_API = '/api/club/search';
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};
const getAllClubApi = async (data: { pageNum: number; pageSize: number; keyWord: string; status: boolean }) => {
  const URL_API = '/api/club/search';
  const response = await axiosWithoutLoading.post(URL_API, data);
  return response.data;
};
const createClubApi = async (data: { name: string; country: string; establishedYear: string; stadiumName: string; clubLogo: string; description: string; }) => {
  const URL_API = '/api/club';
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};

const editClubApi = async (id: number, data: { name: string; country: string; establishedYear: string; stadiumName: string; clubLogo: string; description: string; status: boolean }) => {
  const URL_API = `/api/club?id=${id}`;
  const response = await defaultAxiosInstance.put(URL_API, data);
  return response.data;
};

const getClubByIdApi = async (id: number) => {
  const URL_API = `/api/club/${id}`;
  const response = await axiosWithoutLoading.get(URL_API);
  return response.data;
};

const changeClubStatusApi = async (id: number, status: boolean) => {
  const URL_API = `/api/club/change-status/${id}?status=${status}`;
  const response = await defaultAxiosInstance.post(URL_API);
  return response.data;
};

const searchSessionApi = async (data: { pageNum: number; pageSize: number; keyWord: string; status: boolean }) => {
  const URL_API = '/api/session/search';
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};
const getSessionApi = async (data: { pageNum: number; pageSize: number; keyWord: string; status: boolean }) => {
  const URL_API = '/api/session/search';
  const response = await axiosWithoutLoading.post(URL_API, data);
  return response.data;
};
const changeSessionStatusApi = async (id: number, status: boolean) => {
  const URL_API = `/api/session/change-status/${id}?status=${status}`;
  const response = await defaultAxiosInstance.delete(URL_API);
  return response.data;
};

const createSessionApi = async (data: { name: string; startDdate: string; endDdate: string; description: string; }) => {
  const URL_API = '/api/session';
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};

const getSessionByIdApi = async (id: number) => {
  const URL_API = `/api/session/${id}`;
  const response = await axiosWithoutLoading.get(URL_API);
  return response.data;
};

const editSessionApi = async (id: number, data: { name: string; startDdate: string; endDdate: string; description: string; }) => {
  const URL_API = `/api/session?id=${id}`;
  const response = await defaultAxiosInstance.put(URL_API, data);
  return response.data;
};
const createPlayerApi = async (data: { clubId: number; fullName: string; height: number; weight: number; birthday: string; nationality: string; }) => {
  const URL_API = '/api/player';
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};
const getPlayerByIdApi = async (id: number) => {
  const URL_API = `/api/player/${id}`;
  const response = await axiosWithoutLoading.get(URL_API);
  return response.data;
};
const searchPlayerApi = async (data: { pageNum: number; pageSize: number; keyWord: string; status: boolean; }) => {
  const URL_API = '/api/player/search';
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};
const getPlayerApi = async (data: { pageNum: number; pageSize: number; keyWord: string; status: boolean; }) => {
  const URL_API = '/api/player/search';
  const response = await axiosWithoutLoading.post(URL_API, data);
  return response.data;
};
const changePlayerStatusApi = async (id: number, status: boolean) => {
  const URL_API = `/api/session/player/${id}?status=${status}`;
  const response = await defaultAxiosInstance.delete(URL_API);
  return response.data;
};
const updatePlayerApi = async (id: number, data: { clubId: number; fullName: string; height: number; weight: number; birthday: string; nationality: string; }) => {
  const URL_API = `/api/player/${id}`;
  const response = await defaultAxiosInstance.put(URL_API, data);
  return response.data;
};
const searchTypeShirtApi = async (data: { pageNum: number; pageSize: number; keyWord: string; status: boolean }) => {
  const URL_API = '/api/typeshirt/search';
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};
const getTypeShirtApi = async (data: { pageNum: number; pageSize: number; keyWord: string; status: boolean }) => {
  const URL_API = '/api/typeshirt/search';
  const response = await axiosWithoutLoading.post(URL_API, data);
  return response.data;
};
const changeTypeShirtStatusApi = async (id: number, status: boolean) => {
  const URL_API = `/api/typeshirt/change-status/${id}?status=${status}`;
  const response = await defaultAxiosInstance.delete(URL_API);
  return response.data;
};
const getTypeShirtByIdApi = async (id: number) => {
  const URL_API = `/api/typeshirt/${id}`;
  const response = await axiosWithoutLoading.get(URL_API);
  return response.data;
};
const updateTypeShirtApi = async (id: number, data: { sessionId: number; clubId: number; name: string; description: string; status: boolean }) => {
  const URL_API = `/api/typeshirt?id=${id}`;
  const response = await defaultAxiosInstance.put(URL_API, data);
  return response.data;
};
const createTypeShirtApi = async (data: { sessionId: number; clubId: number; name: string; description: string; status: boolean }) => {
  const URL_API = '/api/typeshirt';
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};
const createShirtApi = async (data: { typeShirtId: number; playerId: number; name: string; number: number; price: number; date: string; description: string; urlImg: string; status: number }) => {
  const URL_API = '/api/shirt';
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};
const searchShirtApi = async (data: { pageNum: number; pageSize: number; keyWord: string; status: number }) => {
  const URL_API = '/api/shirt/search';
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};
const getShirtApi = async (data: { pageNum: number; pageSize: number; keyWord: string; status: number }) => {
  const URL_API = '/api/shirt/search';
  const response = await axiosWithoutLoading.post(URL_API, data);
  return response.data;
};
const searchClientShirtApi = async (data: { pageNum: number; pageSize: number; keyWord: string; status: number }) => {
  const URL_API = '/api/shirt/search';
  const response = await axiosWithoutLoading.post(URL_API, data);
  return response.data;
};
const getShirtByIdApi = async (id: number) => {
  const URL_API = `/api/shirt/${id}`;
  const response = await axiosWithoutLoading.get(URL_API);
  return response.data;
};
const changeShirtStatusApi = async (id: number, status: number) => {
  const URL_API = `/api/shirt/${id}?status=${status}`;
  const response = await defaultAxiosInstance.delete(URL_API);
  return response.data;
};
const deleteShirtApi = async (id: number, status: number) => {
  const URL_API = `/api/shirt/${id}?status=${status}`;
  const response = await defaultAxiosInstance.delete(URL_API);
  return response.data;
};
const updateShirtApi = async (id: number, data: { typeShirtId: number; playerId: number; name: string; number: number; price: number; date: string; description: string; urlImg: string; status: number }) => {
  const URL_API = `/api/shirt/${id}`;
  const response = await defaultAxiosInstance.put(URL_API, data);
  return response.data;
};
const getShirtByMultipleNamesApi = async (data: { pageNum: number; pageSize: number; nameShirt: string; nameClub: string; nameSeason: string; namePlayer: string;nameTypeShirt  :string ;status: number }) => {
  const URL_API = '/api/shirt/searchbymutilname';
  const response = await axiosWithoutLoading.post(URL_API, data);
  return response.data;
};
const searchSizeApi = async (data: { pageNum: number; pageSize: number; keyWord: string; status: boolean }) => {
  const URL_API = '/api/size/search';
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};
const getSizeApi = async (data: { pageNum: number; pageSize: number; keyWord: string; status: boolean }) => {
  const URL_API = '/api/size/search';
  const response = await axiosWithoutLoading.post(URL_API, data);
  return response.data;
};
const createSizeApi = async (data: { name: string; description: string; status: boolean }) => {
  const URL_API = '/api/size';
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};
const getSizeByIdApi = async (id: number) => {
  const URL_API = `/api/size/${id}`;
  const response = await axiosWithoutLoading.get(URL_API);
  return response.data;
};
const updateSizeApi = async (id: number, data: { name: string; description: string; status: boolean }) => {
  const URL_API = `/api/size?id=${id}`;
  const response = await defaultAxiosInstance.put(URL_API, data);
  return response.data;
};
const changeSizeStatusApi = async (id: number, status: boolean) => {
  const URL_API = `/api/size/change-status/${id}?status=${status}`;
  const response = await defaultAxiosInstance.delete(URL_API);
  return response.data;
};
const addToCartApi = async (data: { shirtId: number; quantity: number, sizeId: number }) => {
  const URL_API = `/api/order/addtocart`;
  const response = await axiosWithoutLoading.post(URL_API, data);
  return response.data;
};
const searchOrderApi = async (data: { pageNum: number; pageSize: number; orderId : string ;status: number | null}) => {
  const URL_API = `/api/order/search`;
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};
const getCartApi = async () => {
  const URL_API = '/api/order/cart';
  const response = await axiosWithoutLoading.get(URL_API);
  return response.data;
};
const getCartDetailApi = async () => {
  const URL_API = '/api/order/cart';
  const response = await defaultAxiosInstance.get(URL_API);
  return response.data;
};

const searchShirtSizeApi = async (data: { pageNum: number; pageSize: number; keyWord?: string; status?: boolean; }) => {
  const URL_API = `/api/shirtsize/search`;
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};
const createShirtSizeApi = async (data: { shirtId: number; sizeId: number; quantity: number; description: string; status: boolean; }) => {
  const URL_API = `/api/shirtsize`;
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};
const getShirtSizeByIdApi = async (id: number) => {
  const URL_API = `/api/shirtsize/${id}`;
  const response = await axiosWithoutLoading.get(URL_API);
  return response.data;
};
const updateShirtSizeApi = async (id: number, payload: { shirtId: number; sizeId: number; quantity: number; description: string; status: boolean; }) => {
  const URL_API = `/api/shirtsize?id=${id}`;
  const response = await defaultAxiosInstance.put(URL_API, payload);
  return response.data;
};
const deleteShirtSizeApi = async (id: number, status: boolean) => {
  const URL_API = `/api/shirtsize?id=${id}&status=${status}`;
  const response = await defaultAxiosInstance.delete(URL_API);
  return response.data;
};
const updateCartApi = async (data: { orderId: string; shirtSizeId: number; quantity: number }) => {
  const URL_API = '/api/order/updatecart';
  const response = await axiosWithoutLoading.post(URL_API, data);
  return response.data;
};
const deleteCartApi = async (orderId: string, status: 0) => {
  const URL_API = `/api/order/${orderId}?status=${status}`;
  const response = await defaultAxiosInstance.delete(URL_API);
  return response.data;
};
const deleteItemInCartApi = async (payload: { orderId: string; shirtSizeId: number; }) => {
  const URL_API = `/api/order/deteleitemincart`;
  const response = await defaultAxiosInstance.post(URL_API, payload);
  return response.data;
};
const getUrlPaymentApi = async (payload: { orderId: string; amount: number; createDate: string; }) => {
  const URL_API = `/api/payment/geturlpayment`;
  const response = await axiosWithoutLoading.post(URL_API, payload);
  return response.data;
};
const getPaymentStatusApi = async (params: { vnp_Amount: string; vnp_BankCode: string; vnp_BankTranNo: string; vnp_CardType: string; vnp_OrderInfo: string; vnp_PayDate: string; vnp_ResponseCode: string; vnp_TmnCode: string; vnp_TransactionNo: string; vnp_TransactionStatus: string; vnp_TxnRef: string; vnp_SecureHash: string; }) => {
  const queryString = new URLSearchParams(params).toString();
  const URL_API = `/api/payment/status?${queryString}`;
  const response = await defaultAxiosInstance.get(URL_API);
  return response.data;
};
const createPaymentApi = async (params: { vnp_Amount: string; vnp_BankCode: string; vnp_BankTranNo: string; vnp_CardType: string; vnp_OrderInfo: string; vnp_PayDate: string; vnp_ResponseCode: string; vnp_TmnCode: string; vnp_TransactionNo: string; vnp_TransactionStatus: string; vnp_TxnRef: string; vnp_SecureHash: string; }) => {
  const queryString = new URLSearchParams(params).toString();
  const URL_API = `/api/payment/createpayment?${queryString}`;
  const response = await defaultAxiosInstance.get(URL_API);
  return response;
};

const paymentByCurrentUserApi = async (data: { pageNum: number; pageSize: number; keyWord?: string; status?: boolean; }) => {
  const URL_API = `/api/payment/paymentbycurrentuser`;
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};
const updateOrderApi = async (id: string, data: { userId: string; totalPrice: number; shipPrice: number; deposit: number; date: string; refundStatus: boolean; status: number; }) => {
  const URL_API = `/api/order?id=${id}`;
  const response = await defaultAxiosInstance.put(URL_API, data);
  return response.data;
};
const changePasswordApi = async (data: { currentPassword: string; newPassword: string; }) => {
  const URL_API = `/api/user/change-password`;
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};
const searchOrderByCurrentUserApi = async (data: { pageNum: number; pageSize: number;orderId : string ;status: number | null; }) => {
  const URL_API = `/api/order/user/search`;
  const response = await axiosWithoutLoading.post(URL_API, data);
  return response.data;
};
const searchPaymentApi = async (data: { pageNum: number; pageSize: number;keyword : string ;status: boolean }) => {
  const URL_API = `/api/payment/search`;
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};
const createReviewApi = async (data: { orderId: string, orderDetailId: number, scoreRating: number, comment: string }) => {
  const URL_API = '/api/review/create';
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};
const resendVerificationApi = async (email: string) => {
  const URL_API = '/api/user/resend-verification';
  const response = await defaultAxiosInstance.post(URL_API, email);
  return response.data;
};
const forgotPasswordApi = async (email: string) => {
  const URL_API = '/api/user/forgot-password';
  const response = await defaultAxiosInstance.post(URL_API,  email );
  return response.data;
};
const resetPasswordApi = async (data: { email: string; verificationCode: string; newPassword: string }) => {
  const URL_API = '/api/user/reset-password';
  const response = await defaultAxiosInstance.post(URL_API, data);
  return response.data;
};
const getReviewByShirtApi = async (shirtId: number) => {
  const URL_API = `/api/review/by-shirt/${shirtId}`;
  const response = await axiosWithoutLoading.get(URL_API);
  return response.data;
};
const getDashboardUserApi = async () => {
  const URL_API = '/api/dashboard/dashboard-user';
  const response = await defaultAxiosInstance.get(URL_API);
  return response.data;
};
const getDashboardStaffApi = async () => {
  const URL_API = '/api/dashboard/dashboard-staff';
  const response = await defaultAxiosInstance.get(URL_API);
  return response.data;
};
const getDashboardAdminApi = async () => {
  const URL_API = '/api/dashboard/dashboard-admin-manager';
  const response = await defaultAxiosInstance.get(URL_API);
  return response.data;
};
export {
  getDashboardAdminApi,
  getDashboardStaffApi,
  getDashboardUserApi,
  getReviewByShirtApi,
  resetPasswordApi,
  forgotPasswordApi,
  resendVerificationApi,
  createReviewApi,
  searchPaymentApi,

  searchOrderByCurrentUserApi,
  changePasswordApi,
  updateOrderApi,
  paymentByCurrentUserApi,
  createPaymentApi,
  getPaymentStatusApi,
  getUrlPaymentApi,
  deleteItemInCartApi,
  getPlayerApi,
  getTypeShirtApi,
  getClubApi,
  getSessionApi,
  getSizeApi,
  getShirtApi,
  getShirtSizeByIdApi,
  updateShirtSizeApi,
  deleteShirtSizeApi,
  searchClientClubApi,
  getCartDetailApi,
  deleteCartApi,
  updateCartApi,
  createShirtSizeApi,
  searchShirtSizeApi,
  getCartApi,
  searchOrderApi,
  addToCartApi,
  changeSizeStatusApi,
  getSizeByIdApi,
  updateSizeApi,
  createSizeApi,
  searchSizeApi,
  searchClientShirtApi,
  updateShirtApi,
  deleteShirtApi,
  changeShirtStatusApi,
  getShirtByIdApi,
  searchShirtApi,
  createShirtApi,
  createTypeShirtApi,
  updateTypeShirtApi,
  getTypeShirtByIdApi,
  changeTypeShirtStatusApi,
  searchTypeShirtApi,
  updatePlayerApi,
  changePlayerStatusApi,
  searchPlayerApi,
  getPlayerByIdApi,
  createPlayerApi,
  editSessionApi,
  getSessionByIdApi,
  createSessionApi,
  changeSessionStatusApi,
  searchSessionApi,
  createUserApi,
  loginUserApi,
  getCurrentLogin,
  getAllUserApi,
  changeUserStatusApi,
  getUserByIdApi,
  updateUserByIdApi,
  verifyUserByIdApi,
  createStaffApi,
  createManagerApi,
  googleSignUpApi,
  googleSigInpApi,
  searchClubApi,
  getAllClubApi,
  createClubApi,
  editClubApi,
  getClubByIdApi,
  getShirtByMultipleNamesApi,
  changeClubStatusApi

};
