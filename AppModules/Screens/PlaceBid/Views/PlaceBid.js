import React from 'react';
import styles from '../styles/PlaceBidStyles';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import AHText from '../../../Components/AHText';
import {HeaderComponent} from '../../../Components/HeaderComponent';
const PlaceBid = () => {
  return (
    <View style={styles.container}>
      <HeaderComponent />
      <AHText name={'PlaceBid'} />
    </View>
  );
};
export default React.memo(PlaceBid);
