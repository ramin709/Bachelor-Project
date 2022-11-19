import { AUTH, LOGOUT } from '../constants.js';
import * as api from '../../api/api.js';

export const signUp = (formData, navigator) => async (dispatch) => {
    try {
        const { data } = await api.sendSignUpData(formData);
        console.log('data is', data);
        dispatch({ type: AUTH, data });
        navigator('/');
    } catch (e) {
        console.log(e)
    }
}

export const signIn = (formData, navigator) => async (dispatch) => {
    try {
        
        const {data} = await api.sendSignInData(formData);
        console.log('data is' , data);
        dispatch({ type: AUTH, data });
        navigator('/');

    } catch (error) {
        console.log(error)
    }
}