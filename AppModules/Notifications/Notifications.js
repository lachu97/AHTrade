import notifee, {AuthorizationStatus} from '@notifee/react-native';
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
export {requestUserPermission};
