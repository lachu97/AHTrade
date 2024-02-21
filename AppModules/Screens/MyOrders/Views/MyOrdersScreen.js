import React from 'react';
import {View} from 'react-native';
import {MD2Colors, Text} from 'react-native-paper';
import myOrdersStyles from '../styles/MyOrdersStyles';
import {HeaderComponent} from '../../../Components/HeaderComponent';
import LottieView from 'lottie-react-native';
import AHText from '../../../Components/AHText';

const MyOrdersScreen = () => {
  return (
    <View style={myOrdersStyles.container}>
      <HeaderComponent />
      <View style={{flex: 1}}>
        <AHText
          name={'This Page is Under'}
          style={{color: MD2Colors.white, alignSelf: 'center', fontSize: 22}}
        />
        <AHText
          name={' Construction, Come back Later !!'}
          style={{color: MD2Colors.white, alignSelf: 'center', fontSize: 22}}
        />
        <LottieView
          style={{flex: 1}}
          source={require('../../../assets/anim/underConstruction.json')}
          autoPlay
          loop
        />
      </View>
    </View>
  );
};
export default React.memo(MyOrdersScreen);
