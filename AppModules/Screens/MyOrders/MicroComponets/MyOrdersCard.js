import React from 'react';
import {Card, Text} from 'react-native-paper';
import {useWindowDimensions} from 'react-native';
import {TextView} from '../../../Components/AHText';

const MyOrdersCard = ({item}) => {
  const {width} = useWindowDimensions();
  return (
    <Card style={{width: width * 0.94, alignSelf: 'center', margin: 2}}>
      <Card.Title
        title={`Name : ${item.product_name}`}
        subtitle={`Product Code : ${item.productID}`}
      />
      <Card.Content>
        <TextView>
          Quantity : {item.quantity}
          {item.unit}
        </TextView>
        <TextView>
          Price : ${item.price} / {item.unit}
        </TextView>
        <TextView>
          Incoterm : {item.incoterm}({item.destination})
        </TextView>
        <Text>Payment Term : {item.payment}</Text>
        <TextView>
          Contact Person :{item.user_name} Email:{item.email}
        </TextView>
      </Card.Content>
    </Card>
  );
};
export default React.memo(MyOrdersCard);
