import React, {useEffect, useState} from 'react';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {View, StatusBar, StyleSheet} from 'react-native';
import Header from '../components/Header';
import InputField from '../components/InputField';
import {filterBooksByKeyword} from '../helpers/utils';

import {getBooks} from '../redux/books/actions';
import BookList from '../components/BookList';
import {Colors, Metrics} from '../definitions/theme';
import LoaderHOC from '../helpers/LoaderHOC';

const iconSearch = require('../assets/icons/search.png');
const closeSearch = require('../assets/icons/close.png');

export const Library = (props: any) => {
  const {setLoading} = props;

  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState('');
  const [searching, setSearching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [booksList, setBooksList] = useState([]);

  const fetchingBooks = useSelector(
    (state: RootStateOrAny) => state.books.fetchingBooks,
  );

  const booksFetched = useSelector(
    (state: RootStateOrAny) => state.books.booksFetched,
  );

  const booksFetchFailed = useSelector(
    (state: RootStateOrAny) => state.books.booksFetchFailed,
  );

  const booksByProps = useSelector(
    (state: RootStateOrAny) => state.books.books,
  );

  const error = useSelector((state: RootStateOrAny) => state.books.error);

  const info = useSelector((state: RootStateOrAny) => state.auth.info);

  useEffect(() => {
    setLoading(false);
  }, [setLoading, booksList]);

  useEffect(() => {
    if (fetchingBooks) {
      setLoading(true);
      setRefreshing(true);
    }
    if (booksFetched) {
      setRefreshing(false);
      setBooksList(booksByProps);
    }
    if (booksFetchFailed) {
      setRefreshing(false);
      setLoading(false);
      setBooksList([]);
    }
  }, [
    fetchingBooks,
    booksByProps,
    booksFetchFailed,
    booksFetched,
    setLoading,
    error,
  ]);

  useEffect(() => {
    setLoading(false);
    dispatch(getBooks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newBooksList = filterBooksByKeyword(booksByProps, keyword);
    setBooksList(newBooksList);
    if (!searching) {
      setKeyword('');
    }
  }, [keyword, searching, booksByProps]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header
        title={searching ? 'Buscador' : `¡Bienvenido(a), ${info.first_name}!`}
        component={
          searching && (
            <InputField
              label="Escribe aquí..."
              onChangeText={(value: string) => setKeyword(value)}
              value={keyword}
            />
          )
        }
        onPress={() => setSearching(!searching)}
        icon={searching ? closeSearch : iconSearch}
        iconSize={searching ? 17 : 25}
      />
      <BookList
        data={booksList}
        error={error}
        navigation={props.navigation}
        onRefresh={() => dispatch(getBooks())}
        refreshing={refreshing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  searchInput: {
    marginVertical: Metrics.Margin,
  },
  emptyState: {
    flex: 1,
    height: '100%',
    backgroundColor: Colors.Background,
    width: Metrics.ScreenWidth,
    paddingHorizontal: Metrics.Padding * 2,
  },
  flatlist: {flexGrow: 1},
  spaceBottom: {width: '100%', height: 50},
});
export default LoaderHOC(Library, 'Cargando datos...');
