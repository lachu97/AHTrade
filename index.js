/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {displayRemoteNotifyAndroid} from './AppModules/Notifications/RemoteNotifications/NotifeeRemote';

async function onMessageReceived(message) {
  console.log('Msg' + JSON.stringify(message));
  await displayRemoteNotifyAndroid({
    title: message.notification?.title,
    body: message.notification?.body,
  });
}
messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

if (__DEV__) {
  import('./AppModules/DevConfig/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}
AppRegistry.registerComponent(appName, () => App);
