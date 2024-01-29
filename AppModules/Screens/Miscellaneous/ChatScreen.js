import React from 'react';
import {View} from 'react-native';
import AHText from '../../Components/AHText';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {MD2Colors, TouchableRipple} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
const ChatScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: Colors.dark, flex: 1}}>
      <AHText name={'ChatScreen'} style={{color: MD2Colors.white}} />
      <TouchableRipple onPress={() => navigation.goBack()}>
        <AHText name={'Go back'} style={{color: MD2Colors.white}} />
      </TouchableRipple>
    </View>
  );
};
export default React.memo(ChatScreen);
