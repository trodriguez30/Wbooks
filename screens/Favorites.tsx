import React, {useState} from 'react';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {View, StatusBar, StyleSheet, FlatList} from 'react-native';
import Header from '../components/Header';
import ItemBook from '../components/ItemBook';
import {Colors, Metrics} from '../definitions/theme';

import {removeAllBooksToFavorites} from '../redux/books/actions';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';

const trashIcon = require('../assets/icons/trash.png');
const boxColor = require('../assets/images/box-color.png');
const warningIcon = require('../assets/icons/warning.png');

export const Favorites = (props: any) => {
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  const favoriteList = useSelector(
    (state: RootStateOrAny) => state.books.favoriteList,
  );

  const renderItem = ({item}: any) => (
    <ItemBook item={item} navigation={props.navigation} />
  );

  const modalOptions = () => {
    let options: any = {
      title: 'No es posible ejecutar la acción',
      message: 'No tienes libros agregados a favoritos',
      closable: true,
      icon: boxColor,
    };
    if (favoriteList.length !== 0) {
      options = {
        title:
          '¿Estas seguro que deseas eliminar todos los libros agregados a esta lista?',
        closable: true,
        icon: warningIcon,
        action: () => dispatch(removeAllBooksToFavorites()),
        actionLabel: 'Si, limpiar favoritos',
      };
    }
    return options;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header
        title={'Mis Favoritos'}
        onPress={() => setModalVisible(true)}
        icon={trashIcon}
      />
      <FlatList
        contentContainerStyle={styles.flatlist}
        disableVirtualization={false}
        showsVerticalScrollIndicator={false}
        data={favoriteList}
        renderItem={renderItem}
        keyExtractor={(item: any) => `book${item.id.toString()}`}
        ListEmptyComponent={
          <EmptyState
            label={'No tienes libros agregados a favoritos'}
            style={styles.emptyState}
          />
        }
      />
      <Modal
        onClose={() => setModalVisible(false)}
        modalVisible={modalVisible}
        {...modalOptions()}
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
});
export default Favorites;
