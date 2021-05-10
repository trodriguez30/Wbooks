import React, {ReactNode} from 'react';
import {TextInput, StyleSheet} from 'react-native';

import {Colors, FontStyle, Metrics, Shadow} from '../definitions/theme';

interface InputFieldProps {
  label: string;
  onChangeText: any;
  onBlur?: any;
  value: string;
  error?: ReactNode;
}

const InputField = (props: InputFieldProps) => {
  return (
    <>
      <TextInput
        placeholder={props.label}
        onChangeText={props.onChangeText}
        onBlur={props.onBlur}
        value={props.value}
        style={styles.input}
        autoCapitalize="none"
      />
      {props.error}
    </>
  );
};

const styles = StyleSheet.create({
  inputSize: {
    height: 50,
    width: '100%',
  },
  input: {
    ...FontStyle.Normal,
    paddingHorizontal: Metrics.Padding,
    backgroundColor: Colors.GrayScale.White,
    ...Shadow,
    height: 50,
    width: '100%',
    borderRadius: Metrics.BorderRadius,
    marginBottom: Metrics.Margin,
  },
});

export default InputField;
