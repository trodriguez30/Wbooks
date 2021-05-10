import * as React from 'react';
import {StyleSheet, Image, TouchableOpacity, View, Text} from 'react-native';
import {Shadow, Colors, Metrics, FontStyle} from '../definitions/theme';
import {BookProps} from '../definitions/interfaces';
import {getThumbBook} from '../helpers/utils';

interface BookDetailByGenreProps {
  item: BookProps;
  index: number;
  navigation: any;
}
const BookDetailByGenre = (props: BookDetailByGenreProps) => {
  const thumb = getThumbBook(props.item.image_url);

  return (
    <TouchableOpacity
      style={[
        styles.itemContent,
        props.index === 0 ? {marginLeft: Metrics.Margin * 2} : null,
      ]}
      onPress={() =>
        props.navigation.push('BookDetails', {bookItem: {...props.item}})
      }>
      <View style={styles.imageContainer}>
        <Image source={thumb} resizeMode="contain" style={styles.image} />
      </View>
      <View style={[styles.flex, styles.topInfo]}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {props.item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  itemContent: {
    width: Metrics.ScreenWidth / 3,
    height: Metrics.ScreenWidth / 2,
    padding: Metrics.Padding,
    borderRadius: Metrics.BorderRadius,
    flexDirection: 'column',
    backgroundColor: Colors.GrayScale.White,
    ...Shadow,
    margin: Metrics.Margin,
    alignItems: 'center',
    marginBottom: Metrics.Margin * 2,
  },
  imageContainer: {
    width: Metrics.ScreenWidth / 3 - 32,
    height: Metrics.ScreenWidth / 3 - 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  topInfo: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...FontStyle.Min,
    color: Colors.GrayScale.SuperDark,
    textAlign: 'center',
  },
});

export default BookDetailByGenre;
