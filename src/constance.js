export const BASE_URL = 'http://frontend-candidate.dev.sdh.com.ua/v1/contact/';

export const SET_USERS = 'SET_USERS';
export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const CHANGE_USER = 'CHANGE_USER';
export const IS_LOADING = 'IS_LOADING';
export const LOADING_FAIL = 'LOADING_FAIL';
export const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
}

export const formatDate = (date) => {

    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    var yy = date.getFullYear();
  
    return yy + '-' + mm + '-' + dd;
}