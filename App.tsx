/**
 * AHTrade Commodity Trading App
 * https://github.com/lachu97/AHTrade
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import AppNavigation from './AppModules/Navigation/Appnavigation';
import store from './AppModules/Redux/Store';
import {Provider} from 'react-redux';
import {PaperProvider} from 'react-native-paper';
import {RealmProvider} from './AppModules/Storage/Realm/RealmConfig';
import {NhostClient, NhostProvider} from '@nhost/react';
import {APP_REGION, APP_SUB_DOMAIN} from './AppModules/NHost/Variables';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const nhost = new NhostClient({
  subdomain: APP_SUB_DOMAIN,
  region: APP_REGION,
});
function App(): JSX.Element {
  return (
    <NhostProvider nhost={nhost}>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.dark}}>
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
