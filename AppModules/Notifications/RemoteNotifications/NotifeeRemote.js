import notifee, {AndroidColor, AndroidImportance} from '@notifee/react-native';
const createRemoteChannelAndroid = async () => {
  return await notifee.createChannel({
    id: 'Remote',
    name: 'NotificationsRemote',
    lights: false,
    vibration: true,
    sound: 'hollow',
    importance: AndroidImportance.DEFAULT,
  });
};
export const displayRemoteNotifyAndroid = async data => {
  let channelId = await createRemoteChannelAndroid();
  await notifee.displayNotification({
    title: data.title,
    body: data.body,
    android: {
      channelId,
      asForegroundService: false,
      color: AndroidColor.CYAN,
      colorized: false,
      sound: 'hollow',
      largeIcon: require('../../assets/Icons/tick2.png'),
      vibrationPattern: [300, 500],
    },
  });
};
