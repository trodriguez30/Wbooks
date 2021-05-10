import * as React from 'react';
import {StyleSheet, Image, TouchableOpacity, View, Text} from 'react-native';
import {Shadow, Colors, Metrics, FontStyle} from '../definitions/theme';
import {BookProps} from '../definitions/interfaces';
import {getThumbBook, isFavorite} from '../helpers/utils';
import {RootStateOrAny, useSelector} from 'react-redux';

interface ItemBookProps {
  item: BookProps;
  navigation: any;
}
const ItemBook = (props: ItemBookProps) => {
  const thumb = getThumbBook(props.item.image_url);

  const favoriteList = useSelector(
    (state: RootStateOrAny) => state.books.favoriteList,
  );
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.itemContent}
        onPress={() =>
          props.navigation.push('BookDetails', {bookItem: {...props.item}})
        }>
        <View style={styles.imageContainer}>
          <Image source={thumb} resizeMode="contain" style={styles.image} />
        </View>
        <View style={[styles.flex, styles.info]}>
          <View style={[styles.flex, styles.topInfo]}>
            <View style={styles.flex}>
              <Text style={styles.title}>{props.item.title}</Text>
              <Text style={styles.author}>{props.item.author}</Text>
            </View>
            <Image
              source={isFavorite(favoriteList, props.item).icon}
              resizeMode="contain"
              style={styles.fav}
            />
          </View>
          <Text style={styles.year}>{props.item.year}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  itemContainer: {
    padding: Metrics.Padding,
    borderRadius: Metrics.BorderRadius,
  },
  itemContent: {
    height: 100 + Metrics.Padding * 2,
    padding: Metrics.Padding,
    backgroundColor: Colors.GrayScale.White,
    flexDirection: 'row',
    ...Shadow,
    borderRadius: Metrics.BorderRadius,
  },
  imageContainer: {
    width: 75,
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {paddingLeft: Metrics.Padding},
  topInfo: {
    flexDirection: 'row',
    width: '100%',
  },
  fav: {
    height: 25,
    width: 25,
  },
  year: {
    alignSelf: 'flex-end',
    color: Colors.Primary,
    ...FontStyle.NormalBold,
  },
  title: {
    ...FontStyle.Subtitle,
    color: Colors.GrayScale.SuperDark,
  },
  author: {
    ...FontStyle.Normal,
    color: Colors.GrayScale.Dark,
  },
});

export default ItemBook;
