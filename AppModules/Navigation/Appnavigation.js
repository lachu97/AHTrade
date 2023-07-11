import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen';
import DetailScreen from '../Screens/DetailScreen';
const screens = [
  {name: 'Home', component: HomeScreen},
  {name: 'Detail', component: DetailScreen},
];
const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRoute={HomeScreen} >
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigation;
