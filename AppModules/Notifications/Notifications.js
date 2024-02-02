import notifee, {
  AuthorizationStatus,
  AndroidImportance,
  AndroidColor,
} from '@notifee/react-native';
import {setNotificationStatus} from './AccessFile';

const requestUserPermission = async () => {
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    console.log('Permission settings:', settings);
    await setNotificationStatus(true);
  } else {
    console.log('User declined permissions');
    await setNotificationStatus(false);
  }
};
const createChannelAndroid = async () => {
  await notifee.createChannel({
    id: 'normal',
    name: 'Notifications',
    lights: false,
    vibration: true,
    importance: AndroidImportance.DEFAULT,
  });
};
const displayNotifyAndroid = data => {
  let channelId = createChannelAndroid();
  notifee.displayNotification({
    title: data.title,
    body: data.body,
    android: {
      channelId,
      asForegroundService: true,
      color: AndroidColor.RED,
      colorized: true,
    },
  });
};
const displayNotifyiOS = data => {
  notifee.displayNotification({
    title: data.title,
    body: data.body,
    ios: {
      foregroundPresentationOptions: {
        badge: true,
        sound: true,
        banner: true,
        list: true,
      },
      attachments: [
        {
          // React Native asset.
          url: require('../assets/Icons/tick.png'),
        },
      ],
    },
  });
};

export {requestUserPermission, displayNotifyiOS, createChannelAndroid,displayNotifyAndroid};
