import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {Metrics, Colors, FontStyle} from '../definitions/theme';

interface DetailProps {
  icon: any;
  label: string;
  detail: string;
  paddingTop?: number;
}
const Detail = (props: DetailProps) => {
  return (
    <View style={[styles.detailContainer, {paddingTop: props.paddingTop || 0}]}>
      <View style={styles.iconContent}>
        <Image source={props.icon} resizeMode="contain" style={styles.icon} />
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.label}>{props.label}</Text>
        <Text style={styles.text}>{props.detail}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    flexDirection: 'row',
    width: '100%',
    padding: Metrics.Padding * 2,
  },
  iconContent: {width: 24, height: 24},
  icon: {
    width: '100%',
    height: '100%',
  },
  infoContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: Metrics.Padding / 2,
  },
  label: {
    ...FontStyle.NormalBold,
    color: Colors.GrayScale.SuperDark,
  },
  text: {...FontStyle.Normal, color: Colors.GrayScale.SuperDark},
});
export default Detail;
