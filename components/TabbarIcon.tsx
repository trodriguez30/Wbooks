import React from 'react';
import {Image, StyleSheet} from 'react-native';

export default function TabbarIcon(props: any) {
  switch (props.route) {
    case 'Biblioteca': {
      const tabbarIcon = props.focused
        ? require('../assets/icons/tabbar/library_selected.png')
        : require('../assets/icons/tabbar/library.png');
      return (
        <Image
          source={tabbarIcon}
          style={styles.iconSize}
          resizeMode="contain"
        />
      );
    }
    case 'Favoritos': {
      const tabbarIcon = props.focused
        ? require('../assets/icons/tabbar/favorites_selected.png')
        : require('../assets/icons/tabbar/favorites.png');
      return (
        <Image
          source={tabbarIcon}
          style={styles.iconSize}
          resizeMode="contain"
        />
      );
    }
    case 'Perfil': {
      const tabbarIcon = props.focused
        ? require('../assets/icons/tabbar/user_selected.png')
        : require('../assets/icons/tabbar/user.png');
      return (
        <Image
          source={tabbarIcon}
          style={styles.iconSize}
          resizeMode="contain"
        />
      );
    }
    default:
      return (
        <Image
          source={require('../assets/icons/tabbar/library_selected.png')}
          style={styles.iconSize}
          resizeMode="contain"
        />
      );
  }
}

const styles = StyleSheet.create({
  iconSize: {width: 25, height: 25},
});
