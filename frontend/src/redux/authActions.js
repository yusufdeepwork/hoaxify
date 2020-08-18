import * as ACTIONS from '../redux/Constants';

export const logoutSuccess = () => {
    return {
        type : ACTIONS.LOGOUT_SUCCESS
    };
};



export const loginSuccess = authState => {
    return {
        type : ACTIONS.LOGIN_SUCCESS,
        payload : authState
    }
}