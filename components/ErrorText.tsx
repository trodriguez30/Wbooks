import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Colors, FontStyle, Metrics} from '../definitions/theme';

interface ErrorTextProps {
  error: string;
}

const ErrorText = (props: ErrorTextProps) => {
  return <Text style={styles.textError}>{props.error}</Text>;
};

const styles = StyleSheet.create({
  textError: {
    ...FontStyle.Min,
    color: Colors.Error,
    paddingHorizontal: 8,
    paddingBottom: Metrics.Padding,
  },
});

export default ErrorText;
