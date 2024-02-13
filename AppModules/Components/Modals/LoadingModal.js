import React from 'react';
import {Dimensions, View} from 'react-native';
import {Dialog, Text, Modal} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const LoadingModal = ({isVisible}) => {
  return (
    <Dialog
      visible={isVisible}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        width: width * 0.85,
      }}>
      <Dialog.Content>
        <LottieView
          autoPlay
          loop
          style={{
            height: 84,
            width: width * 0.87,
            alignSelf: 'center',
          }}
          source={require('../../assets/anim/myLoading3.json')}
        />
        <Text
          style={{
            alignSelf: 'center',
          }}>
          Please Wait..
        </Text>
      </Dialog.Content>
    </Dialog>
  );
};
export default React.memo(LoadingModal);
