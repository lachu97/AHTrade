import React from 'react';
import {View} from 'react-native';
import {HeaderComponent} from '../Components/HeaderComponent';
import accountStyles from '../Styles/AccountStyles';
import BottomBar from '../Components/BottomBar/BottomBar';
import {useNavigation} from '@react-navigation/native';

const AccountScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={accountStyles.container}>
      <HeaderComponent />
        <BottomBar navigation={navigation} activeTab={'Account'}/>
    </View>
  );
};
export default React.memo(AccountScreen);
