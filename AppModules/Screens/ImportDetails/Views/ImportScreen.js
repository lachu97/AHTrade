import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  LayoutAnimation,
  ScrollView,
  View,
} from 'react-native';
import {
  MD2Colors,
  List,
  TouchableRipple,
  Text,
  SegmentedButtons,
  Chip,
  MD3Colors,
  Checkbox,
} from 'react-native-paper';
import importStyles from '../Styles/ImportStyles';
import {HeaderComponent} from '../../../Components/HeaderComponent';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BidDialog from '../../PlaceBid/MicroComponents/BidDialog';
import PaymentDialog, {paymentTypes} from '../MicroComponents/PaymentDialog';
import AHTextInput from '../../../Components/AHTextInput';
import ContactDetailsDialog from '../../PlaceBid/MicroComponents/ContactDetailsDialog';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AHButton from '../../../Components/AHButton';
import {
  getContactsDetails,
  storeContactsDetails,
} from '../../../Storage/AppLocalStorage/ContactsStorage';
import PackagingDialog, {
  packagingItems,
} from '../MicroComponents/PackagingDialog';
import {isIos} from '../../../HelperFuntions/helpers';
import {
  showBottomFeedBack,
  showMiddleFeedBack,
} from '../../../Components/Toasts/ToastsFeedBack';
const width = Dimensions.get('window').width;
const incoTermsList = [
  {
    value: 'FOB',
    label: 'FOB',
    uncheckedColor: MD2Colors.white,
    showSelectedCheck: true,
    style: {
      borderRadius: 0,
    },
  },
  {
    value: 'FAS',
    label: 'FAS',
    uncheckedColor: MD2Colors.white,
    showSelectedCheck: true,
    style: {
      borderRadius: 0,
    },
  },
  {
    value: 'FCA',
    label: 'FCA',
    uncheckedColor: MD2Colors.white,
    showSelectedCheck: true,
    style: {
      borderRadius: 0,
    },
  },
  {
    value: 'CFR',
    label: 'CFR',
    uncheckedColor: MD2Colors.white,
    showSelectedCheck: true,
    style: {
      borderRadius: 0,
    },
  },
  {
    value: 'CIF',
    label: 'CIF',
    uncheckedColor: MD2Colors.white,
    showSelectedCheck: true,
    style: {
      borderRadius: 0,
    },
  },
  {
    value: 'CPT',
    label: 'CPT',
    uncheckedColor: MD2Colors.white,
    showSelectedCheck: true,
    style: {
      borderRadius: 0,
    },
  },
  {
    value: 'CIP',
    label: 'CIP',
    uncheckedColor: MD2Colors.white,
    showSelectedCheck: true,
    style: {
      borderRadius: 0,
    },
  },
];
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
          <Text numberOfLines={1} style={importStyles.valueStyles}>
            {value}
          </Text>
          <MaterialCommunityIcons
            name={'archive-edit-outline'}
            size={16}
            color={MD2Colors.yellow400}
          />
          <Text style={importStyles.editText}>Edit {name}</Text>
        </View>
      </TouchableRipple>
    </View>
  );
};
const ImportScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  let item = route.params?.item;
  const [contactDetails, setContactDetails] = useState([]);
  const [quantity, setQuantity] = useState(item.quantity);
  const [showQuantity, setShowQuantity] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [paymentDialog, setPaymentDialog] = useState(false);
  const [contactsDialog, setContactsDialog] = useState(false);
  const [price, setPrice] = useState(item.price);
  const [packaging, setPackaging] = useState(packagingItems[0]);
  const [packagingDialog, setPackagingDialog] = useState(false);
  const [payment, setPayment] = useState('');
  const [shipment, setShipment] = useState('');
  const [incoterm, setIncoterm] = useState('');
  const [port, setPort] = useState('');
  const [checked, setChecked] = React.useState(false);
  function checkForEmptyProperties(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];

        if (typeof value !== 'object' || Array.isArray(value)) {
          // Check for empty or whitespace values only for non-object properties
          if (!value || (typeof value === 'string' && value.trim() === '')) {
            return true;
          }
        }
      }
    }

    return false;
  }
  useEffect(() => {
    const getContactDetails = async () => {
      let result = await getContactsDetails();
      console.log(result);

      if (result) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        setContactDetails(result);
      }
    };
    getContactDetails();
  }, []);
  const onPressContactDetails = item => {
    setContactDetails(item);
    storeContactsDetails(item).then(r => console.log(JSON.stringify(r)));
  };
  const showDialog = () => setShowQuantity(true);
  const showPackagingDialog = () => setPackagingDialog(true);
  const showContactsDialog = () => setContactsDialog(true);
  const hideContactsDialog = () => setContactsDialog(false);
  const hidePackagingDialog = () => setPackagingDialog(false);
  const showPriceDialog = () => setShowPrice(true);
  const showPaymentDialog = () => setPaymentDialog(true);
  const hideDialog = () => setShowQuantity(false);
  const hidePaymentDialog = () => setPaymentDialog(false);
  const hidePriceDialog = () => setShowPrice(false);
  const onQuantitySuccess = item => setQuantity(item);
  const onPriceSuccess = item => setPrice(item);
  const onPackagingSuccess = item => setPackaging(item);

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
        <ScrollView style={{marginBottom: 30, flex: 1}}>
          <List.Section>
            <List.Subheader style={importStyles.titleStyles}>
              Place Order for {item.name}
            </List.Subheader>
            <Sections
              value={quantity}
              name={'Quantity(MT)'}
              onPress={() => {
                showDialog();
              }}
            />
            <Sections
              value={price}
              name={'Price($)'}
              onPress={() => {
                showPriceDialog();
              }}
            />
            <Sections
              value={packaging}
              name={'Packaging'}
              onPress={() => {
                showPackagingDialog();
              }}
            />
          </List.Section>
          <List.Section>
            <List.Subheader style={importStyles.titleStyles}>
              Shipment Mode {shipment.toUpperCase()}
            </List.Subheader>
            <SegmentedButtons
              value={shipment}
              style={{marginHorizontal: 8, color: MD2Colors.white}}
              onValueChange={setShipment}
              density={'regular'}
              buttons={[
                {
                  value: 'air',
                  label: 'Air',
                  uncheckedColor: MD2Colors.white,
                  style: {
                    borderRadius: 8,
                  },
                  showSelectedCheck: true,
                  icon: require('../../../assets/Icons/air.png'),
                },
                {
                  value: 'ocean',
                  label: 'Ocean',
                  uncheckedColor: MD2Colors.white,
                  style: {
                    borderRadius: 8,
                  },
                  showSelectedCheck: true,
                  icon: require('../../../assets/Icons/ocean.png'),
                },
              ]}
            />
          </List.Section>
          <List.Section style={{width: width * 0.95}}>
            <List.Subheader style={importStyles.titleStyles}>
              Incoterm {incoterm}
            </List.Subheader>
            <FlatList
              data={incoTermsList}
              style={{
                marginVertical: 5,
              }}
              renderItem={({item}) => {
                return (
                  <Chip
                    style={{
                      margin: 2,
                      backgroundColor: isIos()
                        ? MD2Colors.white
                        : MD3Colors.primary20,
                      borderRadius: 4,
                      borderWidth: incoterm === item.value ? 1.5 : 0,
                      // borderColor: MD3Colors.tertiary20,
                    }}
                    mode={'outlined'}
                    elevated={true}
                    textStyle={{
                      fontSize: incoterm === item.value ? 15.4 : 14.1,
                      fontWeight: incoterm === item.value ? 'bold' : 400,
                      color: isIos() ? MD2Colors.blue900 : MD2Colors.white,
                    }}
                    icon={incoterm === item.value ? 'check-decagram' : null}
                    onPress={() => {
                      setIncoterm(item.value);
                    }}>
                    {item.label}
                  </Chip>
                );
              }}
              horizontal={true}
            />
          </List.Section>
          <List.Section style={{marginBottom: 1}}>
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
                      <Text style={importStyles.editText}>
                        Edit Payment Term
                      </Text>
                    </View>
                  </TouchableRipple>
                );
              }}
            />
          </List.Section>
          <List.Section style={{marginVertical: 10}}>
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
              flexDirection: 'row',
              width,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
            }}>
            <TouchableRipple
              style={{marginRight: 5}}
              onPress={() => setChecked(prev => !prev)}>
              <MaterialCommunityIcons
                name={checked ? 'check-all' : 'checkbox-blank-outline'}
                size={25}
                color={MD2Colors.white}
              />
            </TouchableRipple>
            <Text style={importStyles.titleStyles}>
              I have verified my Order Details
            </Text>
          </View>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 5,
            width: width,
            flex: 1,
            alignContent: 'center',
          }}>
          <AHButton
            name={'Place Import Order'}
            icon={'export'}
            style={{
              width: width * 0.9,
              marginHorizontal: 5,
              alignSelf: 'center',
              borderRadius: 8,
            }}
            onPress={() => {
              const contactObject = contactDetails.reduce(
                (result, {title, value}) => {
                  if (title === 'Email') {
                    result.email = value;
                  }
                  if (title === 'Phone') {
                    result.phone = value;
                  }
                  if (title === 'Company') {
                    result.company = value;
                  }
                  if (title === 'Address') {
                    result.address = value;
                  }
                  if (title === 'Name') {
                    result.name = value;
                  }
                  if (title === 'Port') {
                    result.port = value;
                  }
                  return result;
                },
                {},
              );
              let resultItem = {
                item,
                price,
                quantity,
                packaging,
                incoterm,
                mode: shipment,
                payment: payment.name,
                contact: contactObject,
                //isBid: false,
              };
              const isEmpty = checkForEmptyProperties(resultItem);
              if (isEmpty) {
                showMiddleFeedBack('Provide All Details to Place an Order');
                return;
              }
              if (!checked) {
                showBottomFeedBack('Please verify your Details,');
                return;
              }


              navigation.navigate('Success', {
                item: resultItem,
              });
            }}
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
      <PackagingDialog
        isVisible={packagingDialog}
        hideDialog={hidePackagingDialog}
        onDone={onPackagingSuccess}
      />
    </View>
  );
};
export default React.memo(ImportScreen);
