import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {MD2Colors, Text} from 'react-native-paper';
import {HeaderComponent} from '../../../Components/HeaderComponent';
import bidHistoryStyles from '../styles/BidHistoryStyles';
import BottomBar from '../../../Components/BottomBar/BottomBar';
import {useNavigation} from '@react-navigation/native';
import ListItem from 'react-native-paper/src/components/List/ListItem';
import {getBidListFromStorage} from '../Helpers/BidHelpers';

const BidHistory = () => {
  const navigation = useNavigation();
  const [bids, setBids] = useState([]);
  useEffect(() => {
    const getBids = async () => {
      let result = await getBidListFromStorage();
      if (result) {
        setBids(result);
      }
    };
    getBids();
  }, []);
  const renderItems = ({item}) => {
      console.log(`Item = ${item}`)
    return (
      <ListItem titleStyle={{color: MD2Colors.white}} title={item.bidPrice} />
    );
  };
  return (
    <View style={bidHistoryStyles.container}>
      <HeaderComponent showHeader={true} name={'Bid History'} />
      <BottomBar navigation={navigation} activeTab={'My Bids'} />
    </View>
  );
};
export default React.memo(BidHistory);
