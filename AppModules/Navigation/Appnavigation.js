import React, {useRef} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen';
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
import BidSuccessScreen from '../Screens/PlaceBid/Views/BidSuccessScreen';
import MyOrdersScreen from '../Screens/MyOrders/Views/MyOrdersScreen';
import RecommendationScreen from '../Screens/Misc/Views/RecommedationScreen';
import CheckoutScreen from '../Screens/Checkout/Views/Checkout';
import WebViewScreen from '../Screens/Misc/Views/WebViewScreeen';
import ProfileScreen from '../Screens/ProfileScreen';
import PayPalCheckout from '../PaymentGateway/PayPal/PayPalCheckout';
import CategoriesList from '../Screens/AllCategories/Views/CategoriesList';
const screenAnimation = {
  animation: 'slide_from_right',
};
const linking = {
  prefixes: ['ahtrade://'],
  config: {
    initialRouteName: 'Home',
    screens: {
      Home: 'Home',
      Account: 'Account',
    },
  },
};
const Stack = createNativeStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Login'}>
      <Stack.Screen
        name={'Login'}
        component={Login}
        options={screenAnimation}
      />
      <Stack.Screen
        name={'Register'}
        component={Register}
        options={screenAnimation}
      />
    </Stack.Navigator>
  );
};
const AppNavigation = () => {
  const navigationRef = useRef();
  const routeNameRef = useRef();
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

        if (previousRouteName !== currentRouteName) {
          // await analytics().logScreenView({
          //   screen_name: currentRouteName,
          //   screen_class: currentRouteName,
          // });
        }
        routeNameRef.current = currentRouteName;
      }}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'Splash'}>
        <Stack.Screen
          name={'Home'}
          component={HomeScreen}
          options={screenAnimation}
        />
        <Stack.Screen
          name={'Splash'}
          component={SplashScreen}
          options={screenAnimation}
        />
        <Stack.Screen
          name={'Chat'}
          component={ChatScreen}
          options={screenAnimation}
        />
        <Stack.Screen
          name={'Account'}
          component={AccountScreen}
          options={screenAnimation}
        />
        <Stack.Screen
          name={'Success'}
          component={Success}
          options={screenAnimation}
        />
        <Stack.Screen
          name={'ProductDetail'}
          component={ProductDetail}
          options={screenAnimation}
        />
        <Stack.Screen
          name={'Profile'}
          component={ProfileScreen}
          options={screenAnimation}
        />
        <Stack.Screen
          name={'PlaceBid'}
          component={PlaceBid}
          options={screenAnimation}
        />
        <Stack.Screen
          name={'Import'}
          component={ImportScreen}
          options={screenAnimation}
        />
        <Stack.Screen
          name={'BidHistory'}
          component={BidHistory}
          options={screenAnimation}
        />
        <Stack.Screen
          name={'MyOrders'}
          component={MyOrdersScreen}
          options={screenAnimation}
        />
        <Stack.Screen
          name={'BidSuccess'}
          component={BidSuccessScreen}
          options={screenAnimation}
        />
        <Stack.Screen
          name={'CategorySearch'}
          component={CategorySearch}
          options={screenAnimation}
        />
        <Stack.Screen
          name={'Recommendation'}
          component={RecommendationScreen}
          options={screenAnimation}
        />
        <Stack.Screen
          name={'Checkout'}
          component={CheckoutScreen}
          options={screenAnimation}
        />
        <Stack.Screen name={'AuthStack'} component={AuthNavigation} />
        <Stack.Screen name={'WebView'} component={WebViewScreen} />
        <Stack.Screen name={'PayPal'} component={PayPalCheckout} />
        <Stack.Screen name={'CategoryList'} component={CategoriesList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigation;
