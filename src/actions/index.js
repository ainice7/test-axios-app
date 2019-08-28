import * as axios from 'axios';

import { BASE_URL, SET_USERS, ADD_USER, DELETE_USER, CHANGE_USER } from '../constance';
import { isLoading, loadingFail } from './loading';

export const setUsers = (users) => ({ type: SET_USERS, payload: users });

export const getUsers = () => {
    return dispatch => {
        dispatch(isLoading(true));
        axios.get(BASE_URL)
            .then( ({data}) => {
                dispatch(setUsers(data));
                dispatch(isLoading(false));
            })
            .catch(error => {
                dispatch(loadingFail(error.message));
                console.error(error)});
    }
} 

export const setNewUser = (user) => ({ type: ADD_USER, payload: user });

export const addUser = ( user ) => {
    
    return dispatch => {
        dispatch(isLoading(true));
        console.log('post', user);
        axios.post(BASE_URL,  user )
            .then( ({data}) => {
                dispatch(setNewUser(data));
                dispatch(isLoading(false));
            })
            .catch(error => {
                dispatch(loadingFail(error.message));
                console.error(error)});
    }
}

export const deleteSomeUser = (user) => ({ type: DELETE_USER, payload: user });

export const deleteUser = ( userId, index ) => {
    return dispatch => {
        dispatch(isLoading(true));
        axios.delete(BASE_URL + userId)
            .then( ({data}) => {
                dispatch(deleteSomeUser(index));
                dispatch(setUsers(data));
                dispatch(isLoading(false));
            })
            .catch(error => {
                debugger;
                dispatch(loadingFail(error.message));
                console.error(error)});
    }
}

export const changeSomeUser = (user) => ({ type: CHANGE_USER, payload: user });

export const changeUser = ( user, userId ) => {
    return dispatch => {
        dispatch(isLoading(true));
        axios.put(BASE_URL + userId, user)
            .then( ({data}) => {
                dispatch(changeSomeUser(user));
                dispatch(setUsers(data));
                dispatch(isLoading(false));
            })
            .catch(error => {
                dispatch(loadingFail(error.message));
                console.error(error)});
    }
}