import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import {Metrics, Colors, FontStyle} from '../definitions/theme';

import LoginScreen from '../screens/Login';
import LibraryScreen from '../screens/Library';
import FavoritesScreen from '../screens/Favorites';
import BookDetailsScreen from '../screens/BookDetails';
import ProfileScreen from '../screens/Profile';
import TabbarIcon from '../components/TabbarIcon';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RootStateOrAny, useSelector} from 'react-redux';
const Stack = createStackNavigator();

const AuthStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

function MyTabBar({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.tabbarContainer}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <TouchableOpacity
            key={index.toString()}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarIcon}>
            <TabbarIcon focused={isFocused} route={label} />
            <Text
              style={{
                ...styles.tabbarLabel,
                color: isFocused ? Colors.Third : Colors.GrayScale.SuperDark,
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const TabbarStack = () => (
  <Tab.Navigator tabBar={(props: any) => <MyTabBar {...props} />}>
    <Tab.Screen
      name="Biblioteca"
      component={LibraryScreen}
      options={{
        tabBarLabel: 'Biblioteca',
      }}
    />
    <Tab.Screen
      name="Favoritos"
      component={FavoritesScreen}
      options={{
        tabBarLabel: 'Favoritos',
      }}
    />
    <Tab.Screen
      name="Perfil"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Perfil',
      }}
    />
  </Tab.Navigator>
);
const AppStack = () => (
  <NavigationContainer>
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Library" component={TabbarStack} />
      <Stack.Screen name="BookDetails" component={BookDetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  tabbarContainer: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: Colors.Primary,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  tabbarIcon: {
    flex: 1,
    width: Metrics.ScreenWidth / 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: Metrics.Padding,
  },
  tabbarLabel: {
    ...FontStyle.Normal,
  },
});
export default function Routes() {
  const authenticated = useSelector(
    (state: RootStateOrAny) => state.auth.authenticated,
  );
  return authenticated ? <AppStack /> : <AuthStack />;
}
