import { SET_USERS, ADD_USER, DELETE_USER, CHANGE_USER } from '../constance';

const initialState = {
    users: []
}

export const data = ( state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return{
                ...state,
                users: action.payload
            };
        case ADD_USER: 
            return{
                ...state,
                users: [...state.users, action.payload]
            }
        case DELETE_USER: 
            const filteredUsers = state.users.filter((item, i) => (
                i !== action.payload
            ))

            return {
                ...state,
                users: filteredUsers
            }
        case CHANGE_USER:
            const updatedArray = state.users.map((item) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }

                return item;
            })

            return {
                ...state,
                users: updatedArray
            }
        default:
            return state;
    }
}