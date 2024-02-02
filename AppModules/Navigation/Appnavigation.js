import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, NavigationContext} from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen';
import DetailScreen from '../Screens/DetailScreen';
import SplashScreen from '../Screens/SplashScreen';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import ChatScreen from '../Screens/Miscellaneous/ChatScreen';
import CategorySearch from '../Screens/SearchModule/Views/CatergorySearch';
import PlaceBid from '../Screens/PlaceBid/Views/PlaceBid';
import ProductDetail from '../Screens/ProductDetail/Views/ProductDetail';
import AccountScreen from '../Screens/AccountScreen';
import BidHistory from '../Screens/PlaceBid/Views/BidHistory';
import Success from '../Screens/Checkout/Views/Success';
import ImportScreen from '../Screens/ImportDetails/Views/ImportScreen';
const screens = [
  {name: 'Home', component: HomeScreen},
  {name: 'Detail', component: DetailScreen},
  {name: 'Splash', component: SplashScreen},
  {name: 'Chat', component: ChatScreen},
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
        <Stack.Screen name={'Home'} component={HomeScreen} />
        <Stack.Screen name={'Detail'} component={DetailScreen} />
        <Stack.Screen name={'Splash'} component={SplashScreen} />
        <Stack.Screen name={'Chat'} component={ChatScreen} />
        <Stack.Screen name={'Account'} component={AccountScreen} />
        <Stack.Screen name={'Success'} component={Success} />
        <Stack.Screen name={'ProductDetail'} component={ProductDetail} />
        <Stack.Screen name={'PlaceBid'} component={PlaceBid} />
        <Stack.Screen name={'Import'} component={ImportScreen} />
        <Stack.Screen name={'BidHistory'} component={BidHistory} />
        <Stack.Screen name={'CategorySearch'} component={CategorySearch} />
        <Stack.Screen name={'AuthStack'} component={AuthNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigation;
