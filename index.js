/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {displayRemoteNotifyAndroid} from './AppModules/Notifications/RemoteNotifications/NotifeeRemote';
import notifee from '@notifee/react-native';

async function onMessageReceived(message) {
  console.log('Msg' + JSON.stringify(message));
  // await notifee.displayNotification({
  //   title: 'Your order has been shipped',
  //   body: 'Your order was shipped at!',
  //   android: {
  //     channelId: 'orders',
  //   },
  // });
  await displayRemoteNotifyAndroid({
    title: message.notification?.title,
    body: message.notification?.body,
  });
}
messaging().onMessage(onMessageReceived);

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  await displayRemoteNotifyAndroid({
    title: remoteMessage.notification?.title,
    body: remoteMessage.notification?.body,
  });
});
if (__DEV__) {
  import('./AppModules/DevConfig/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}
AppRegistry.registerComponent(appName, () => App);
