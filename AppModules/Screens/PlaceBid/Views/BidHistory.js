import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {HeaderComponent} from '../../../Components/HeaderComponent';
import bidHistoryStyles from "../styles/BidHistoryStyles";

const BidHistory = () => {
  return (
    <View style={bidHistoryStyles.container}>
      <HeaderComponent showHeader={true} name={'Bid History'} />
    </View>
  );
};
export default React.memo(BidHistory);
