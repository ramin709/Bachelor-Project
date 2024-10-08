import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'});
API.interceptors.request.use(req => {
    if(localStorage.getItem('refresh')){
        req.headers.Authorization = `Bearer ${localStorage.getItem('refresh')}`;
    }
    return req;
});



export const fetchStats = () => API.get('/user/Stats/');
export const fetchFeaturedRooms = () => API.get('/roomType/FeaturedRooms/');
export const fetchTestimonials = () => API.get('/user/Testimonials/');
export const fetchBookNow = (data) => API.post('/room/BookNow/' , data);
export const getBookNow = () => API.get('/room/BookNow/' , {headers: {'Cache-Control': 'max-age=3000'}});
export const sendSignUpData = (data) => API.post('/user/SignUp/', data);
export const sendSignInData = (data) => API.post('/user/SignIn/', data);
export const getRoomsSummary = () => API.get('/roomType/Rooms/');
export const getRoomDetails = (data) => API.get(`/roomType/Rooms/${data}/`);
export const getReservationHistory = () => API.get('/reserve/history/');
export const fetchReserveInfo = (data) => API.post('/reserve/Info' , data);
export const sendReservationData = (data) => API.post('/reserve/' , data);
export const getUserData = (userId) => API.get(`/user/${userId}`);
export const sendChangePassData = (data) => API.patch('/user/ChangePassword/' , data);
export const sendProfileChange = (data) => API.patch('/user/Profile/' , data);
export const changeProfileImg = (data) => API.patch('/user/changeProfileImg/' , data);
export const addReview = (data) => API.post('/user/addReview' , data);
export const getUserNameAndLastName = () => API.get('/reserve/user');