import Toast from 'react-native-simple-toast';

export const showBottomFeedBack = text => {
  return Toast.showWithGravity(text, Toast.LONG, Toast.BOTTOM);
};
export const showMiddleFeedBack = text => {
  return Toast.showWithGravity(text, Toast.LONG, Toast.CENTER);
};
