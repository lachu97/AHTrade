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
import {PaperProvider} from 'react-native-paper';
import {RealmProvider} from './AppModules/Storage/Realm/RealmConfig';
import {NhostClient, NhostProvider} from '@nhost/react';
import {initialiseRealmAction} from './AppModules/Redux/Actions/AppActions';
import {APP_REGION, APP_SUB_DOMAIN} from './AppModules/NHost/Variables';
const nhost = new NhostClient({
  subdomain: APP_SUB_DOMAIN,
  region: APP_REGION,
});
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
    <NhostProvider nhost={nhost}>
      <SafeAreaView style={{flex: 1}}>
        <Provider store={store}>
          <RealmProvider>
            <PaperProvider>
              <AppNavigation />
            </PaperProvider>
          </RealmProvider>
        </Provider>
      </SafeAreaView>
    </NhostProvider>
  );
}

export default App;
