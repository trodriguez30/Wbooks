import axios from 'axios';
import {HOST_URL} from '../../definitions/constants';

// Define action types
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';
export const USER_LOGOUT = 'USER_LOGOUT';
export const CLEAR_LOGIN_ERROR = 'CLEAR_LOGIN_ERROR';

//Define actions
export const loginUser = (payload) => {
  return async (dispatch) => {
    dispatch(loginUserRequest());
    try {
      const opts = {
        method: 'post',
        url: `${HOST_URL}/sign_in`,
        data: payload,
      };
      const response = await axios(opts);

      if (response.data) {
        dispatch(loginUserSuccess(response.data));
      } else {
        throw new Error(
          'Tenemos inconvenientes verificando tus datos, intenta más tarde',
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(loginUserError(error.message));
    }
  };
};

const loginUserSuccess = (payload) => ({
  type: USER_LOGIN_SUCCESS,
  payload,
});

const loginUserRequest = () => ({
  type: USER_LOGIN_REQUEST,
});

const loginUserError = (error) => ({
  type: USER_LOGIN_ERROR,
  payload: {
    error,
  },
});

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch({
      type: USER_LOGOUT,
    });
  };
};

export const clearLoginError = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_LOGIN_ERROR,
    });
  };
};
