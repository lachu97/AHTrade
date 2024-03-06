import React from 'react';
import {Card, Text} from 'react-native-paper';
import {useWindowDimensions} from 'react-native';

const MyOrdersCard = ({item}) => {
  const {width} = useWindowDimensions();
  return (
    <Card style={{width: width * 0.94, alignSelf: 'center', margin: 2}}>
      <Card.Title
        title={`Name : ${item.product_name}`}
        subtitle={`Product Code : ${item.productID}`}
      />
      <Card.Content>
        <Text>
          Quantity : {item.quantity}
          {item.unit}
        </Text>
        <Text>
          Price : ${item.price} / {item.unit}
        </Text>
        <Text>
          Incoterm : {item.incoterm}({item.destination})
        </Text>
        <Text>Payment Term : {item.payment}</Text>
        <Text>
          Contact Person :{item.user_name} Email:{item.email}
        </Text>
      </Card.Content>
    </Card>
  );
};
export default React.memo(MyOrdersCard);
