import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {CommentProps} from '../definitions/interfaces';
import {Metrics, Colors, FontStyle} from '../definitions/theme';
import moment from 'moment';

const Comment = (props: CommentProps) => {
  const avatar =
    props.hasOwnProperty('avatar') && typeof props.avatar === 'string'
      ? {uri: props.avatar}
      : require('../assets/images/default_avatar.png');

  return (
    <View style={styles.commentContainer}>
      <View style={styles.top}>
        <View style={styles.avatarContent}>
          <Image source={avatar} resizeMode="cover" style={styles.avatar} />
        </View>

        <View style={styles.commentDetails}>
          <Text style={styles.commenter}>{props.commenter}</Text>
          <Text style={styles.dateAgo}>
            {moment(props.date).format('L') || moment(new Date()).format('L')}
          </Text>
        </View>
      </View>

      <View style={styles.commentContent}>
        <Text style={styles.commentParagrah}>{props.comment}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    width: '100%',
    paddingHorizontal: Metrics.Padding * 2,
    paddingVertical: Metrics.Padding,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  avatarContent: {
    width: 50,
    height: 50,
    borderRadius: 30,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  commentDetails: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: Metrics.Padding,
  },
  commenter: {
    ...FontStyle.NormalBold,
    color: Colors.GrayScale.SuperDark,
  },
  dateAgo: {
    ...FontStyle.Min,
    color: Colors.GrayScale.Dark,
  },
  commentContent: {
    padding: Metrics.Padding,
  },
  commentParagrah: {
    ...FontStyle.Normal,
    color: Colors.GrayScale.SuperDark,
    textAlign: 'justify',
  },
});
export default Comment;
