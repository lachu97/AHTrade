import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, NavigationContext} from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen';
import DetailScreen from '../Screens/DetailScreen';
import SplashScreen from '../Screens/SplashScreen';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
const screens = [
  {name: 'Home', component: HomeScreen},
  {name: 'Detail', component: DetailScreen},
  {name: 'Splash', component: SplashScreen},
];
const Stack = createNativeStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Login'}>
      <Stack.Screen
        name={'Login'}
        component={Login}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name={'Register'}
        component={Register}
        options={{animation: 'slide_from_right'}}
      />
    </Stack.Navigator>
  );
};
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'Splash'}>
        {screens.map((screen, idx) => {
          return (
            <Stack.Screen
              key={idx}
              name={screen.name}
              component={screen.component}
              options={{animation: 'slide_from_right'}}
            />
          );
        })}
        <Stack.Screen name={'AuthStack'} component={AuthNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigation;
