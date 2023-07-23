/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppNavigation from './AppModules/Navigation/Appnavigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import store from './AppModules/Redux/Store';
import {Provider} from 'react-redux';
import {RealmProvider} from './AppModules/Storage/Realm/RealmConfig';
import {initialiseRealmAction} from './AppModules/Redux/Actions/AppActions';
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  //const dispatch = useDispatch();
  // useEffect(() => {
  //   store.dispatch(initialiseRealmAction());
  // }, []);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <RealmProvider>
          <AppNavigation />
        </RealmProvider>
      </Provider>
    </SafeAreaView>
  );
}

export default App;
