/**
 * AHTrade Commodity Trading App
 * https://github.com/lachu97/AHTrade
 *
 * @format
 */

import React, {useEffect} from 'react';
import {Platform, SafeAreaView, UIManager} from 'react-native';
import AppNavigation from './AppModules/Navigation/Appnavigation';
import store from './AppModules/Redux/Store';
import {Provider} from 'react-redux';
import {PaperProvider} from 'react-native-paper';
import {NhostClient, NhostProvider} from '@nhost/react';
import {APP_REGION, APP_SUB_DOMAIN} from './AppModules/NHost/Variables';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  getNotificationStatus,
  setNotificationStatus,
} from './AppModules/Notifications/AccessFile';
import Config from 'react-native-config';
import {requestUserPermission} from './AppModules/Notifications/Notifications';
const nhost = new NhostClient({
  subdomain: APP_SUB_DOMAIN,
  region: APP_REGION,
});
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
function App(): JSX.Element {
  useEffect(() => {
    const requestNotificationPermission = async () => {
      let result = await getNotificationStatus();
      console.log(result);
      if (!result) {
        requestUserPermission()
          .then(r => setNotificationStatus(true))
          .catch(e => setNotificationStatus(false));
      }
    };
    requestNotificationPermission();
    console.log(`From Env=${Config.API_KEY}`);
  }, []);
  return (
    // <NhostProvider nhost={nhost}>
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.dark}}>
      <Provider store={store}>
        <PaperProvider>
          <AppNavigation />
        </PaperProvider>
      </Provider>
    </SafeAreaView>
    // </NhostProvider>
  );
}

export default App;
