import React from 'react';
import {Button, Card, DataTable} from 'react-native-paper';
import {useWindowDimensions} from 'react-native';
import {isStartWithF} from '../../../HelperFuntions/helpers';

const CheckoutCardComponent = ({result}) => {
  const {width} = useWindowDimensions();
  return (
    <Card
      style={{
        marginHorizontal: 5,
        marginVertical: 5,
        padding: 5,
        width: width * 0.95,
      }}>
      <Card.Title
        title={'Order Details'}
        subtitle={'Commodity Name :' + result.item.title}
      />
      <Card.Content>
        <DataTable.Row>
          <DataTable.Cell>Price</DataTable.Cell>
          <DataTable.Cell numeric>
            $ {result.price}/{result.item.unit}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Total Price</DataTable.Cell>
          <DataTable.Cell numeric>
            $ {Math.ceil(result.price * result.quantity)}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Quantity</DataTable.Cell>
          <DataTable.Cell numeric>
            {result.quantity} {result.item.unit}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Incoterm</DataTable.Cell>
          {isStartWithF(result.incoterm) ? (
            <DataTable.Cell>{result.incoterm}(Chennai Port)</DataTable.Cell>
          ) : (
            <DataTable.Cell>
              {result.incoterm}({result.contact.port})
            </DataTable.Cell>
          )}
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Packaging</DataTable.Cell>
          <DataTable.Cell numeric>{result.packaging} kg</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Shipment Mode</DataTable.Cell>
          <DataTable.Cell>{result.mode.toUpperCase()}</DataTable.Cell>
        </DataTable.Row>
      </Card.Content>
    </Card>
  );
};

export const ContactDetailsComponent = ({contact, navigation}) => {
  const {width} = useWindowDimensions();

  return (
    <Card
      style={{
        marginHorizontal: 5,
        marginVertical: 0,
        padding: 5,
        width: width * 0.95,
      }}>
      <Card.Title title={'Contact Details'} />
      <Card.Content>
        {Object.entries(contact).map(([key, value]) => {
          return (
            <DataTable.Row key={key}>
              <DataTable.Cell>{key}</DataTable.Cell>
              <DataTable.Cell>{value}</DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </Card.Content>
      <Card.Actions>
        <Button
          style={{borderRadius: 10}}
          icon={'account-edit'}
          onPress={() => navigation.goBack()}>
          Edit Details
        </Button>
      </Card.Actions>
    </Card>
  );
};
export default React.memo(CheckoutCardComponent);
