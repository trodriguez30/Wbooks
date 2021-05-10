import AuthReducer from './auth/reducers';
import BooksReducer from './books/reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['info', 'authenticated'],
};

const booksPersistConfig = {
  key: 'books',
  storage: AsyncStorage,
  whitelist: ['favoriteList'],
};

const createRootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, AuthReducer),
  books: persistReducer(booksPersistConfig, BooksReducer),
});

export default createRootReducer;
