/**
 * AHTrade B2B Commodity Trading App
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
import {NhostClient} from '@nhost/react';
import {APP_REGION, APP_SUB_DOMAIN} from './AppModules/NHost/Variables';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  getNotificationStatus,
  setNotificationStatus,
} from './AppModules/Notifications/AccessFile';
import codePush from 'react-native-code-push';
import Config from 'react-native-config';
import {requestUserPermission} from './AppModules/Notifications/Notifications';
import {
  flushCache,
  storage,
} from './AppModules/Storage/AppLocalStorage/ProductsStorage';
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
export const LAST_CACHE_UPDATE = 'lastCacheUpdate';
let CACHE_CONTROL_TIME = Math.floor(0.31 * 60 * 60 * 1000);

const getDeploymentKey = () => {
  let productionKey = '7XodYvyEK7iGkc3jJPc3Rahzz8CaoXC_qgeJZ';
  let stagingKey = 'aa_j5MUXS3mrIkwbKB_clv8rYizgMY-NXGnNC';
  let productKeyIOS = 'mFm5CoS2SdCOlnepTTdfmKp5uDJoAlLkiL4qO';
  let stagingKeyIOS = 'j4ry2pVx1kj69Gj7SMzwOmNM9F4ycjp7XaWM7';
  return productionKey;
};

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
  deploymentKey: getDeploymentKey(),
};
const cacheCheck = () => {
  let lastTimeCacheTime = storage.getNumber(LAST_CACHE_UPDATE) ?? 0;
  let currentDate = new Date();
  let currentTimestamp = currentDate.getTime();
  let timeDifference = currentTimestamp - lastTimeCacheTime;
  if (timeDifference > CACHE_CONTROL_TIME) {
    storage.getAllKeys().forEach(item => console.log('==>' + item));
    flushCache();
    console.log(storage.getAllKeys());
    storage.set(LAST_CACHE_UPDATE, currentTimestamp);
  }
};

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
    cacheCheck();
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

export default codePush(codePushOptions)(App);
