import { IS_LOADING, LOADING_FAIL, SET_USERS } from '../constance';

const initialState = {
    isLoading: false,
    loadingFail: false, 
    error: ''
};

export const loading = (state = initialState, action ) => {
    switch (action.type) {
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case SET_USERS:
            return {
                ...state,
                isLoading: false 
            }
        case LOADING_FAIL:
            return {
                ...state,
                isLoading: false,
                loadingFail: true,
                error: action.payload
            };
        default:
            return state;
    }
}