import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import importStyles from '../Styles/ImportStyles';
import {HeaderComponent} from '../../../Components/HeaderComponent';
import {useRoute} from '@react-navigation/native';

const ImportScreen = () => {
  const route = useRoute();
  return (
    <View style={importStyles.container}>
      <HeaderComponent showHeader={true} name={'Place Import Order'}/>
      <Text>{route.params?.item?.name}</Text>
    </View>
  );
};
export default React.memo(ImportScreen);
