import React from 'react';
import {View} from 'react-native';
import {HeaderComponent} from '../../Components/HeaderComponent';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const PayuScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.dark,
        justifyContent: 'flex-start',
      }}>
      <HeaderComponent />
    </View>
  );
};
export default React.memo(PayuScreen);
