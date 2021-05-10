import React from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  FlatList,
} from 'react-native';
import {Metrics, Shadow, Colors, FontStyle} from '../definitions/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getThumbBook, isFavorite} from '../helpers/utils';
import Divider from '../components/Divider';
import Detail from '../components/Detail';
import BookDetailByGenre from '../components/BookDetailByGenre';
import Comment from '../components/Comment';
import EmptyState from '../components/EmptyState';
import {BookProps} from '../definitions/interfaces';
import {RootStateOrAny, useSelector, useDispatch} from 'react-redux';
import {
  addBookToFavorites,
  removeBookToFavorites,
} from '../redux/books/actions';

const BookDetails = (props: any) => {
  const dispatch = useDispatch();
  const {bookItem} = props.route.params;

  const booksByProps = useSelector(
    (state: RootStateOrAny) => state.books.books,
  );

  const favoriteList = useSelector(
    (state: RootStateOrAny) => state.books.favoriteList,
  );
  const getBooksByGenre = (
    booksArray: Array<BookProps>,
    genre: string,
    id: number,
  ) => {
    let booksFiltered = [];
    if (booksArray.length === 0) {
      return booksFiltered;
    }
    booksFiltered = booksArray.filter(
      (b: any) => b.genre === genre && b.id !== id,
    );
    return booksFiltered;
  };

  function handleFavButton() {
    if (isFavorite(favoriteList, bookItem).isFavoriteState) {
      dispatch(removeBookToFavorites(bookItem.id));
    } else {
      dispatch(addBookToFavorites(bookItem));
    }
  }

  const recommends = getBooksByGenre(booksByProps, bookItem.genre, bookItem.id);
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.top}>
        <StatusBar barStyle="dark-content" />
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.option}>
          <Image
            source={require('../assets/icons/back.png')}
            resizeMode="contain"
            style={styles.icon}
          />
        </TouchableOpacity>
        <View style={styles.favContainer}>
          <TouchableOpacity onPress={handleFavButton} style={styles.option}>
            <Image
              source={isFavorite(favoriteList, bookItem).icon}
              resizeMode="contain"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={styles.imageContainer}>
        <View style={styles.imageContent}>
          <Image
            source={getThumbBook(bookItem.image_url)}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
      </View>
      <ScrollView
        style={styles.infoContainer}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.padding, styles.topInfo]}>
          <View style={styles.flex}>
            <Text style={styles.title}>{bookItem.title}</Text>
            <Text style={styles.author}>{bookItem.author}</Text>
          </View>
          <Text style={styles.year}>{bookItem.year}</Text>
        </View>
        <Divider color={Colors.Primary} style={styles.divider} />

        <Detail
          icon={require('../assets/icons/publisher.png')}
          label="Editorial"
          detail={bookItem.publisher}
          paddingTop={Metrics.Padding * 2}
        />
        <Detail
          icon={require('../assets/icons/genre.png')}
          label="Género"
          detail={bookItem.genre}
        />
        <Divider color={Colors.Primary} style={styles.divider} />

        <Text style={styles.subtitle}>Recomendaciones por género</Text>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={recommends}
          renderItem={({item, index}) => (
            <BookDetailByGenre
              item={item}
              index={index}
              navigation={props.navigation}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <EmptyState
              label="No se encontraron recomendaciones disponibles"
              style={styles.emptyState}
            />
          }
        />
        <Divider color={Colors.Primary} style={styles.divider} />
        <Text style={styles.subtitle}>Comentarios</Text>
        <FlatList
          data={bookItem.hasOwnProperty('comments') ? bookItem.comments : []}
          renderItem={({item}) => <Comment {...item} />}
          keyExtractor={(item, index) => `comment${item.id}${index}`}
          ListEmptyComponent={
            <EmptyState
              label="No se encontraron comentarios disponibles"
              style={styles.emptyState}
            />
          }
        />
        <View style={styles.spaceBottom} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  padding: {
    padding: Metrics.Padding * 2,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  top: {
    flexDirection: 'row',
    padding: Metrics.Padding,
    paddingBottom: 0,
  },
  option: {
    width: 32,
    height: 32,
  },
  favContainer: {flex: 1, alignItems: 'flex-end'},
  icon: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    paddingBottom: Metrics.Padding * 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageContent: {
    width: Metrics.ScreenWidth / 3,
    height: Metrics.ScreenWidth / 2,
    ...Shadow,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    backgroundColor: Colors.GrayScale.White,
  },
  topInfo: {
    flexDirection: 'row',
    width: '100%',
  },
  fav: {
    height: 25,
    width: 25,
  },
  year: {
    alignSelf: 'center',
    color: Colors.Primary,
    ...FontStyle.Subtitle,
  },
  title: {
    ...FontStyle.Title,
    color: Colors.GrayScale.SuperDark,
  },
  author: {
    ...FontStyle.Subtitle,
    color: Colors.GrayScale.Dark,
  },
  subtitle: {
    ...FontStyle.Subtitle,
    color: Colors.GrayScale.SuperDark,
    padding: Metrics.Padding * 2,
  },
  emptyState: {
    marginVertical: Metrics.Margin * 2,
    backgroundColor: Colors.GrayScale.White,
    width: Metrics.ScreenWidth,
  },
  divider: {width: '95%'},
  spaceBottom: {width: '100%', height: 50},
});
export default BookDetails;
