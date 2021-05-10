import React, {useState} from 'react';

import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import {Colors, FontStyle, Metrics} from '../definitions/theme';

const LoaderHOC = (WrappperComponent: any, loadinMessage: string) => {
  function HOC(props: any) {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    //Function to be able to change loader state from WrapperComponet passing it through props
    const setLoadingState = (isComponentLoading: boolean) => {
      setIsLoading(isComponentLoading);
    };

    return (
      <>
        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={Colors.Primary} />
            <Text style={styles.loaderText}>{loadinMessage}</Text>
          </View>
        )}
        <WrappperComponent {...props} setLoading={setLoadingState} />
      </>
    );
  }

  return HOC;
};

const styles = StyleSheet.create({
  loaderContainer: {
    backgroundColor: Colors.Background,
    width: Metrics.ScreenWidth,
    height: Metrics.ScreenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    ...FontStyle.Subtitle,
    color: Colors.GrayScale.SuperDark,
    marginTop: Metrics.Margin,
  },
});

export default LoaderHOC;
