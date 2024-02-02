import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {MD2Colors, List, TouchableRipple, Text} from 'react-native-paper';
import importStyles from '../Styles/ImportStyles';
import {HeaderComponent} from '../../../Components/HeaderComponent';
import {useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BidDialog from '../../PlaceBid/MicroComponents/BidDialog';
import PaymentDialog, {paymentTypes} from '../MicroComponents/PaymentDialog';
import AHTextInput from '../../../Components/AHTextInput';
import ContactDetailsDialog from '../../PlaceBid/MicroComponents/ContactDetailsDialog';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AHButton from '../../../Components/AHButton';
const width = Dimensions.get('window').width;
const Sections = ({value, name, onPress}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <List.Item titleStyle={{color: MD2Colors.white}} title={name} />
      <TouchableRipple onPress={onPress}>
        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
          <Text
            numberOfLines={1}
            style={{
              color: MD2Colors.white,
              marginRight: 5,
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            {value}
          </Text>
          <MaterialCommunityIcons
            name={'archive-edit-outline'}
            size={16}
            color={MD2Colors.yellow400}
          />
          <Text
            style={{
              color: MD2Colors.yellow400,
              textDecorationLine: 'underline',
              fontSize: 13,
            }}>
            Edit {name}
          </Text>
        </View>
      </TouchableRipple>
    </View>
  );
};
const ImportScreen = () => {
  const route = useRoute();
  let item = route.params?.item;
  const [contactDetails, setContactDetails] = useState([]);
  const [quantity, setQuantity] = useState(item.quantity);
  const [showQuantity, setShowQuantity] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [paymentDialog, setPaymentDialog] = useState(false);
  const [contactsDialog, setContactsDialog] = useState(false);
  const [price, setPrice] = useState(item.price);
  const [payment, setPayment] = useState(paymentTypes[0]);

  const onPressContactDetails = item => setContactDetails(item);
  const showDialog = () => setShowQuantity(true);
  const showContactsDialog = () => setContactsDialog(true);
  const hideContactsDialog = () => setContactsDialog(false);
  const showPriceDialog = () => setShowPrice(true);
  const showPaymentDialog = () => setPaymentDialog(true);
  const hideDialog = () => setShowQuantity(false);
  const hidePaymentDialog = () => setPaymentDialog(false);
  const hidePriceDialog = () => setShowPrice(false);
  const onQuantitySuccess = item => setQuantity(item);
  const onPriceSuccess = item => setPrice(item);

  const onChipPress = item => setPayment(item);
  return (
    <View style={importStyles.container}>
      <HeaderComponent showHeader={true} name={'Place Import Order'} />
      <View
        style={{
          flex: 1,
          backgroundColor: MD2Colors.transparent,
          padding: 10,
        }}>
        <List.Section>
          <List.Subheader style={importStyles.titleStyles}>
            Place Order for {item.name}
          </List.Subheader>
          <Sections
            value={quantity}
            name={'Quantity'}
            onPress={() => {
              showDialog();
            }}
          />
          <Sections
            value={price}
            name={'Price'}
            onPress={() => {
              showPriceDialog();
            }}
          />
        </List.Section>
        <List.Section>
          <List.Subheader style={importStyles.titleStyles}>
            Payment Terms
          </List.Subheader>
          <List.Item
            titleStyle={{color: MD2Colors.white}}
            title={payment.name}
            style={{
              marginLeft: 15,
              marginRight: 15,
            }}
            right={props => {
              return (
                <TouchableRipple
                  onPress={() => {
                    showPaymentDialog();
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <MaterialCommunityIcons
                      name={'archive-edit-outline'}
                      size={16}
                      color={MD2Colors.yellow400}
                    />
                    <Text
                      style={{
                        color: MD2Colors.yellow400,
                        textDecorationLine: 'underline',
                        fontSize: 13,
                      }}>
                      Edit Payment Term
                    </Text>
                  </View>
                </TouchableRipple>
              );
            }}
          />
        </List.Section>
        <List.Section>
          <List.Subheader style={importStyles.titleStyles}>
            Contact Details
          </List.Subheader>
          {contactDetails.length === 0 ? (
            <List.Item
              onPress={() => {
                showContactsDialog();
              }}
              style={{
                marginHorizontal: 30,
                alignSelf: 'center',
                alignContent: 'center',
              }}
              title={'Add Details'}
              titleStyle={importStyles.titleStyles}
              left={() => (
                <Ionicons
                  size={25}
                  name={'add-circle-sharp'}
                  color={MD2Colors.white}
                />
              )}
            />
          ) : (
            <View>
              {contactDetails.map((itm, idx) => {
                return (
                  <List.Item
                    key={idx}
                    titleStyle={importStyles.titleStyles}
                    style={{
                      marginHorizontal: 15,
                    }}
                    title={itm.title}
                    right={() => {
                      return (
                        <Text style={importStyles.titleStyles}>
                          {itm.value}
                        </Text>
                      );
                    }}
                  />
                );
              })}
              <AHButton
                style={{
                  width: width * 0.35,
                  alignSelf: 'center',
                  borderRadius: 8,
                }}
                icon={'email-edit'}
                name={'Edit Details'}
                onPress={() => showContactsDialog()}
              />
            </View>
          )}
        </List.Section>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            width: width,
            flex: 1,
            alignContent: 'center',
          }}>
          <AHButton
            name={'Place Order'}
            icon={"export"}
            style={{
              width: width * 0.94,
              marginHorizontal: 5,
              alignSelf: 'center',
              borderRadius: 10,
            }}
            onPress={() => {}}
          />
        </View>
      </View>
      <BidDialog
        isVisible={showQuantity}
        title={'Enter Quantity'}
        placeholder={'Enter Quantity'}
        keyBoardType={'numeric'}
        hideDialog={hideDialog}
        onSuccess={onQuantitySuccess}
      />
      <BidDialog
        isVisible={showPrice}
        title={'Enter Price'}
        placeholder={'Enter Price'}
        keyBoardType={'numeric'}
        hideDialog={hidePriceDialog}
        onSuccess={onPriceSuccess}
      />
      <PaymentDialog
        isVisible={paymentDialog}
        hideDialog={hidePaymentDialog}
        onChipPress={onChipPress}
        selected={payment}
      />
      <ContactDetailsDialog
        isVisible={contactsDialog}
        hideDialog={hideContactsDialog}
        onSuccess={onPressContactDetails}
      />
    </View>
  );
};
export default React.memo(ImportScreen);
