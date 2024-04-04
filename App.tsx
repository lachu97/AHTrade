/**
 * AHTrade B2B Commodity Trading App for Export of GI Products...
 * https://github.com/lachu97/AHTrade
 *
 * @format
 */

import React, {useEffect} from 'react';
import {Linking, Platform, SafeAreaView, UIManager} from 'react-native';
import AppNavigation from './AppModules/Navigation/Appnavigation';
import store from './AppModules/Redux/Store';
import NetInfo from '@react-native-community/netinfo';
import {Provider} from 'react-redux';
import {Button, Dialog, PaperProvider, Text} from 'react-native-paper';
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
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
export const LAST_CACHE_UPDATE = 'lastCacheUpdate';
let CACHE_CONTROL_TIME = Math.floor(24 * 60 * 60 * 1000);

const getDeploymentKey = () => {
  let productionKey = '7XodYvyEK7iGkc3jJPc3Rahzz8CaoXC_qgeJZ';
  let stagingKey = Config.ANDROID_CP_STAGING_KEY;
  let productKeyIOS = Config.IOS_CP_PRODUCTION_KEY;
  let stagingKeyIOS = Config.IOS_CP_STAGING_KEY;
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
  const [netWorkState, setNetworkState] = React.useState(true);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('NeT Module' + JSON.stringify(state.isConnected));
      // @ts-ignore
      setNetworkState(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

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
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.dark}}>
      <Provider store={store}>
        <PaperProvider>
          <AppNavigation />
          {!netWorkState ? (
            <Dialog visible={!netWorkState}>
              <Dialog.Title>Internet Connection Lost</Dialog.Title>
              <Dialog.Content>
                <Text>
                  Internet Connectivity has been lost,Try Switching On Mobile
                  Data or WiFi,And Then Close & Reopen App.
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  onPress={() => {
                    Linking.openSettings().then(r => console.log(r));
                  }}>
                  Go to Settings
                </Button>
              </Dialog.Actions>
            </Dialog>
          ) : null}
        </PaperProvider>
      </Provider>
    </SafeAreaView>
  );
}

export default codePush(codePushOptions)(App);
