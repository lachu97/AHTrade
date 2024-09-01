import React from 'react';
import {Button, Card, DataTable} from 'react-native-paper';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {isStartWithF} from '../../../HelperFuntions/helpers';
import {textTheme} from '../../../Themes/themes';

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
        titleStyle={styles.titleStyle}
        subtitle={'Commodity Name :' + result.item.title}
      />
      <Card.Content>
        <DataTable.Row>
          <DataTable.Cell textStyle={styles.titleStyle}>Price</DataTable.Cell>
          <DataTable.Cell textStyle={styles.titleStyle} numeric>
            $ {result.price}/{result.item.unit}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell textStyle={styles.titleStyle}>
            Total Price
          </DataTable.Cell>
          <DataTable.Cell textStyle={styles.titleStyle} numeric>
            $ {Math.ceil(result.price * result.quantity)}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell textStyle={styles.titleStyle}>
            Quantity
          </DataTable.Cell>
          <DataTable.Cell textStyle={styles.titleStyle} numeric>
            {result.quantity} {result.item.unit}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell textStyle={styles.titleStyle}>
            Incoterm
          </DataTable.Cell>
          {isStartWithF(result.incoterm) ? (
            <DataTable.Cell textStyle={styles.titleStyle}>
              {result.incoterm}(Chennai Port)
            </DataTable.Cell>
          ) : (
            <DataTable.Cell textStyle={styles.titleStyle}>
              {result.incoterm}({result.contact.port})
            </DataTable.Cell>
          )}
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell textStyle={styles.titleStyle}>
            Packaging
          </DataTable.Cell>
          <DataTable.Cell textStyle={styles.titleStyle} numeric>
            {result.packaging} kg
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell textStyle={styles.titleStyle}>
            Shipment Mode
          </DataTable.Cell>
          <DataTable.Cell textStyle={styles.titleStyle}>
            {result.mode.toUpperCase()}
          </DataTable.Cell>
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
      <Card.Title titleStyle={styles.titleStyle} title={'Contact Details'} />
      <Card.Content>
        {Object.entries(contact).map(([key, value]) => {
          return (
            <DataTable.Row key={key}>
              <DataTable.Cell textStyle={styles.titleStyle}>
                {key}
              </DataTable.Cell>
              <DataTable.Cell textStyle={styles.titleStyle}>
                {value}
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </Card.Content>
      <Card.Actions>
        <Button
          style={{borderRadius: 10}}
          icon={'account-edit'}
          labelStyle={{
            fontFamily: textTheme.regular.fontFamily,
          }}
          onPress={() => navigation.goBack()}>
          Edit Details
        </Button>
      </Card.Actions>
    </Card>
  );
};
const styles = StyleSheet.create({
  titleStyle: {
    fontFamily: textTheme.regular.fontFamily,
  },
});
export default React.memo(CheckoutCardComponent);
