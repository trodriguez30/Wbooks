import * as React from 'react';
import {StyleSheet, View} from 'react-native';

interface DividerProps {
  color: string;
  style?: object;
}

const Divider = (props: DividerProps) => {
  return (
    <View
      style={[styles.divider, {backgroundColor: props.color}, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 0.5,
    alignSelf: 'center',
  },
});

export default Divider;
