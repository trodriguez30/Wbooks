import {
  GET_BOOKS_REQUEST,
  GET_BOOKS_SUCCESS,
  GET_BOOKS_ERROR,
  ADD_TO_FAVORITES_LIST,
  DELETE_ALL_BOOKS_FROM_FAVORITES_LIST,
  DELETE_BOOK_FROM_FAVORITES_LIST,
} from './actions';

const initialState = {
  fetchingBooks: false,
  books: [],
  error: null,
  booksFetched: false,
  booksFetchFailed: false,

  favoriteList: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS_REQUEST:
      return {
        ...state,
        fetchingBooks: true,
        books: [],
        error: null,
        booksFetched: false,
        booksFetchFailed: false,
      };
    case GET_BOOKS_SUCCESS:
      return {
        ...state,
        fetchingBooks: false,
        books: action.payload,
        error: null,
        booksFetched: true,
        booksFetchFailed: false,
      };
    case GET_BOOKS_ERROR:
      return {
        ...state,
        fetchingBooks: false,
        books: [],
        error: action.payload.error,
        booksFetched: false,
        booksFetchFailed: true,
      };
    case ADD_TO_FAVORITES_LIST:
      return {...state, favoriteList: [...state.favoriteList, action.payload]};
    case DELETE_BOOK_FROM_FAVORITES_LIST:
      const favoriteListWithOutBook = revomeBookFromList(
        state.favoriteList,
        action.payload,
      );
      return {
        ...state,
        favoriteList: favoriteListWithOutBook,
      };
    case DELETE_ALL_BOOKS_FROM_FAVORITES_LIST:
      return {...state, favoriteList: []};
    default:
      return state;
  }
}

function revomeBookFromList(booksArray, bookToRemoveId) {
  return booksArray.filter((book) => book.id !== bookToRemoveId);
}
