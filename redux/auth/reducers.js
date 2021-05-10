import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  USER_LOGOUT,
} from './actions';

const initialState = {
  authenticatingUser: false,
  info: {},
  error: '',
  authenticated: false,
  authenticationError: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        authenticatingUser: true,
        info: {},
        error: '',
        authenticated: false,
        authenticationError: false,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        authenticatingUser: false,
        info: action.payload,
        error: '',
        authenticated: true,
        authenticationError: false,
      };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        authenticatingUser: false,
        info: {},
        error: action.payload.error,
        authenticated: false,
        authenticationError: true,
      };
    case USER_LOGOUT:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
