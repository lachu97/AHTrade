import React, {useEffect, useState} from 'react';
import {Dimensions, Image, View, StyleSheet, ScrollView} from 'react-native';
import {HeaderComponent} from '../../../Components/HeaderComponent';
import {useNavigation, useRoute} from '@react-navigation/native';
import {MD2Colors, Text, List, DataTable} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {getContactsDetails} from '../../../Storage/AppLocalStorage/ContactsStorage';
import FastImage from 'react-native-fast-image';
import {isIos} from '../../../HelperFuntions/helpers';
import {
  displayNotifyAndroid,
  displayNotifyiOS,
} from '../../../Notifications/Notifications';
import AHButton from '../../../Components/AHButton';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const OrderTable = ({result}) => {
  return (
    <DataTable style={{flex: 1, marginVertical: 10}}>
      <DataTable.Header>
        <DataTable.Title textStyle={styles.textStyle}>Name</DataTable.Title>
        <DataTable.Title textStyle={styles.textStyle}>
          {result.item.name}
        </DataTable.Title>
      </DataTable.Header>
      <DataTable.Row>
        <DataTable.Cell textStyle={styles.textStyle}>
          Quantity(MT)
        </DataTable.Cell>
        <DataTable.Cell textStyle={styles.textStyle}>
          {result.item.quantity} MT
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell textStyle={styles.textStyle}>Price($)</DataTable.Cell>
        <DataTable.Cell textStyle={styles.textStyle}>
          $ {result.price}
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell textStyle={styles.textStyle}>
          Payment Term
        </DataTable.Cell>
        <DataTable.Cell textStyle={styles.textStyle}>
          {result.payment}
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell textStyle={styles.textStyle}>
          Packaging(kgs)
        </DataTable.Cell>
        <DataTable.Cell textStyle={styles.textStyle}>
          {result.packaging}
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell textStyle={styles.textStyle}>
          Shipment Mode
        </DataTable.Cell>
        <DataTable.Cell textStyle={styles.textStyle}>
          {result.mode.toUpperCase()}
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell textStyle={styles.textStyle}>Incoterm</DataTable.Cell>
        <DataTable.Cell textStyle={styles.textStyle}>
          {result.incoterm}
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell textStyle={styles.textStyle}>
          Destination
        </DataTable.Cell>
        <DataTable.Cell textStyle={styles.textStyle}>
          {result.contact.port}
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Header>
        <DataTable.Title textStyle={styles.textStyle}>
          Contact Details
        </DataTable.Title>
      </DataTable.Header>
      {Object.entries(result.contact)?.map(([key, value], idx) => (
        <DataTable.Row key={idx}>
          <DataTable.Cell textStyle={styles.textStyle}>{key}</DataTable.Cell>
          <DataTable.Cell textStyle={styles.textStyle}>{value}</DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
};
const Success = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [contactDetails, setContactDetails] = useState([]);
  let item = route.params?.item;
  let result = item;

  console.log('Fromm Place Order ' + JSON.stringify(result));
  useEffect(() => {
    const getContactDetails = async () => {
      let result = await getContactsDetails();
      if (result) {
        setContactDetails(result);
      }
    };
    getContactDetails();
  }, []);

  // useEffect(() => {
  //   const showNotification = () => {
  //     if (isIos()) {
  //       displayNotifyiOS({
  //         title: item.name,
  //         body: 'Your order has been placed Successfully',
  //       });
  //     } else {
  //       displayNotifyAndroid({
  //         title: item.name,
  //         body: 'Your order has been placed Successfully',
  //       });
  //     }
  //   };
  //   showNotification();
  // }, [item.name]);

  return (
    <ScrollView style={{backgroundColor: Colors.dark}}>
      <View style={{flex: 1, backgroundColor: Colors.dark}}>
        <Image
          style={{
            width: width,
            height: height / 3,
            resizeMode: 'contain',
            marginVertical: 5,
          }}
          //resizeMode={FastImage.resizeMode.contain}
          source={require('../../../assets/Icons/tick.png')}
        />
        <Text
          style={{
            color: MD2Colors.white,
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
            padding: 5,
            fontStyle: 'italic',
            marginHorizontal: isIos() ? 3 : 10,
          }}>
          Import Order Placed SuccessFully !!
        </Text>
        <View style={{flex: 1, padding: 10}}>
          <List.Section>
            <List.Subheader style={{color: MD2Colors.white, fontSize: 18}}>
              Order Details
            </List.Subheader>
            <OrderTable result={result} />
          </List.Section>
        </View>
      </View>
      <View style={{flex: 0.1, width: '100%'}}>
        <AHButton
          name={'Go Home'}
          style={{
            width: '90%',
            alignSelf: 'center',
            borderRadius: 8,
            marginVertical: 1,
          }}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            });
            //  getData();
          }}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    color: MD2Colors.white,
  },
});
export default React.memo(Success);
