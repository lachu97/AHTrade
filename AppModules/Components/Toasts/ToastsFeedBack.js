import Toast from 'react-native-simple-toast';
import {Toast as toast} from 'react-native-toast-notifications';
export const showBottomFeedBack = text => {
  return Toast.showWithGravity(text, Toast.LONG, Toast.BOTTOM);
};
export const showMiddleFeedBack = text => {
  return Toast.showWithGravity(text, Toast.LONG, Toast.CENTER);
};
export const showToastSuccess = text => {
  return toast.show(text, {
    type: 'success',
    placement: 'bottom',
    duration: 1575,
    offset: 30,
    successColor: 'green',
    animationType: 'slide-in',
  });
};
export const showToastInfo = text => {
  return toast.show(text, {
    type: 'warning',
    placement: 'bottom',
    duration: 1475,
    offset: 45,
    animationType: 'slide-in',
  });
};
export const showToastError = text => {
  return toast.show(text, {
    type: 'danger',
    placement: 'bottom',
    duration: 1375,
    offset: 45,
    animationType: 'slide-in',
  });
};
