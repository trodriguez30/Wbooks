import axios from 'axios';
import {HOST_URL} from '../../definitions/constants';

// Define action types
export const GET_BOOKS_REQUEST = 'GET_BOOKS_REQUEST';
export const GET_BOOKS_SUCCESS = 'GET_BOOKS_SUCCESS';
export const GET_BOOKS_ERROR = 'GET_BOOKS_ERROR';

export const ADD_TO_FAVORITES_LIST = 'ADD_TO_FAVORITES_LIST';
export const DELETE_BOOK_FROM_FAVORITES_LIST =
  'DELETE_BOOK_FROM_FAVORITES_LIST';
export const DELETE_ALL_BOOKS_FROM_FAVORITES_LIST =
  'DELETE_ALL_BOOKS_FROM_FAVORITES_LIST';

//Define actions
export const getBooks = () => {
  return async (dispatch) => {
    dispatch(getBooksRequest());
    try {
      const opts = {
        method: 'get',
        url: `${HOST_URL}/books`,
      };
      const response = await axios(opts);

      if (response.data) {
        dispatch(getBooksSuccess(response.data));
      } else {
        throw new Error(
          'Tenemos inconvenientes cargando los datos, intenta más tarde',
        );
      }
    } catch (error) {
      dispatch(getBooksError(error.message));
    }
  };
};

const getBooksSuccess = (payload) => ({
  type: GET_BOOKS_SUCCESS,
  payload,
});

const getBooksRequest = () => ({
  type: GET_BOOKS_REQUEST,
});

const getBooksError = (error) => ({
  type: GET_BOOKS_ERROR,
  payload: {
    error,
  },
});

export const addBookToFavorites = (payload) => ({
  type: ADD_TO_FAVORITES_LIST,
  payload,
});

export const removeBookToFavorites = (payload) => ({
  type: DELETE_BOOK_FROM_FAVORITES_LIST,
  payload,
});

export const removeAllBooksToFavorites = () => ({
  type: DELETE_ALL_BOOKS_FROM_FAVORITES_LIST,
});
