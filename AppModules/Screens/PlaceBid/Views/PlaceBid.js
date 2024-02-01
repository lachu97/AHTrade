import React from 'react';
import styles from '../styles/PlaceBidStyles';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import AHText from '../../../Components/AHText';
import {HeaderComponent} from '../../../Components/HeaderComponent';
import {useRoute} from '@react-navigation/native';
const PlaceBid = () => {
  const route = useRoute();
  let item = route.params?.item
  return (
    <View style={styles.container}>
      <HeaderComponent showHeader={true} name={'Place Bid'} />
      <View style={styles.boxContainer} />
    </View>
  );
};
export default React.memo(PlaceBid);
