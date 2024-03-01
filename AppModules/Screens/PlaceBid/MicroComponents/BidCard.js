import React from 'react';
import {Card, MD2Colors, Text} from 'react-native-paper';
import {useWindowDimensions, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BidCard = ({item, bidDetails}) => {
  const {width} = useWindowDimensions();
  return (
    <Card style={{width: width * 0.87}}>
      <Card.Title title={`${item.title}`} />
      <Card.Content>
        <Text>
          Bid Price : $ {bidDetails.bidPrice}/ {item.unit}{' '}
        </Text>
        <Text>
          Bid Quantity : {bidDetails.quantity} {item.unit}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 2,
            alignItems: 'center',
          }}>
          <Text>Bid Status:</Text>
          <MaterialCommunityIcons
            size={15}
            style={{margin: 1}}
            name={'clock-time-eight'}
            color={MD2Colors.orange300}
          />
          <Text style={{color: MD2Colors.orange300}}>In Review</Text>
        </View>
      </Card.Content>
    </Card>
  );
};
export default React.memo(BidCard);
