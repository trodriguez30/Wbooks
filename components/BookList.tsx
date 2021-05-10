import React from 'react';

import {Animated, RefreshControl, StyleSheet} from 'react-native';
import ItemBook from '../components/ItemBook';
import {Colors, Metrics} from '../definitions/theme';
import EmptyState from '../components/EmptyState';
import {BookProps} from '../definitions/interfaces';

interface BookListProps {
  data: Array<BookProps>;
  error?: string;
  navigation: any;
  onRefresh?: () => void;
  refreshing?: boolean;
}
export const BookList = (props: BookListProps) => {
  const ITEM_SIZE = 100 + Metrics.Padding * 3;
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const renderItem = ({item, index}: any) => {
    const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });
    return <ItemBook item={item} navigation={props.navigation} scale={scale} />;
  };

  const refreshAction = props.hasOwnProperty('onRefresh')
    ? props.onRefresh
    : () => null;

  return (
    <Animated.FlatList
      onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
        useNativeDriver: true,
      })}
      refreshControl={
        <RefreshControl
          onRefresh={() => refreshAction()}
          refreshing={props.hasOwnProperty('refresing') && props.refreshing}
        />
      }
      contentContainerStyle={styles.flatlist}
      disableVirtualization={false}
      showsVerticalScrollIndicator={false}
      data={props.data}
      renderItem={renderItem}
      keyExtractor={(item: any) => `book${item.id.toString()}`}
      ListEmptyComponent={
        <EmptyState
          label={
            typeof props.error === 'string'
              ? props.error
              : 'No se encontraron libros disponibles'
          }
          style={styles.emptyState}
        />
      }
    />
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
  flatlist: {flexGrow: 1, paddingBottom: 50},
});
export default BookList;
