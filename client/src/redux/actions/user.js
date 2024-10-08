import { AUTH, LOGOUT } from '../constants.js';
import * as api from '../../api/api.js';

export const signUpUser = (formData, navigator) => async (dispatch) => {
    try {
        const { data } = await api.sendSignUpData(formData);
        console.log('data is', data);
        dispatch({ type: AUTH, data });
        navigator('/');
    } catch (e) {
        console.log(e)
    }
}

export const signInUser = (formData, navigator) => async (dispatch) => {
    try {
        
        const {data} = await api.sendSignInData(formData);
        console.log('data is' , data);
        dispatch({ type: AUTH, data });
        navigator('/');

    } catch (error) {
        console.log(error)
    }
}