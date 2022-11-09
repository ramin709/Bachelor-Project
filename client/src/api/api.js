import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'})

export const fetchStats = () => API.get('/Stats/');
export const fetchFeaturedRooms = () => API.get('/roomType/FeaturedRooms/');
export const fetchTestimonials = () => API.get('/Testimonials/');
export const fetchBookNow = (data) => API.post('/BookNow/' , data);
export const getBookNow = () => API.get('/BookNow/' , {headers: {'Cache-Control': 'max-age=3000'}});
export const reserveBookNow = (data) => API.post('/BookNow/' , data);
export const sendSignUpData = (data) => API.post('/user/SignUp/', data);
export const sendSignInData = (data) => API.post('/user/SignIn/', data);
export const getRoomsSummary = () => API.get('roomType/Rooms/');
export const getRoomDetails = (data) => API.get(`/Rooms/${data}/`)
export const fetchReserveInfo = (data) => API.post('/BookingInfo/' , data);
export const sendReservationData = (data) => API.post('/Booking/' , data);
export const getUserData = (userId) => API.get(`/user/${userId}`);
export const sendChangePassData = (data) => API.patch('/user/ChangePassword/' , data);
export const sendProfileChange = (data) => API.patch('/user/Profile/' , data);