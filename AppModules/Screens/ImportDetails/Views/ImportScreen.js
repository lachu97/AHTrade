import React, {useCallback, useEffect, useState} from 'react';
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
  Menu,
  Button,
  Divider,
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
import {
  getLongName,
  HapticFeedback,
  isIos,
} from '../../../HelperFuntions/helpers';
import {
  showBottomFeedBack,
  showMiddleFeedBack,
} from '../../../Components/Toasts/ToastsFeedBack';
import InfoBanner from '../../../Components/Banners/InfoBanner';
import {INFO_TEXT, layoutAnimConfig} from '../../../Constants/AppConstants';
import {useDispatch, useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
const getPriceDetailsAction = () => ({type: 'GET_PRICE_DETAILS'});
const menuItems = Array.from({length: 15}, (_, i) => i + 1);
const ImportScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  let item = route.params?.item;
  const [contactDetails, setContactDetails] = useState([]);
  const [quantity, setQuantity] = useState(item.moq);
  const [showQuantity, setShowQuantity] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [paymentDialog, setPaymentDialog] = useState(false);
  const [contactsDialog, setContactsDialog] = useState(false);
  const [price, setPrice] = useState(item.price);
  const basePrice = item.price;
  const [packaging, setPackaging] = useState('');
  const [packagingDialog, setPackagingDialog] = useState(false);
  const [payment, setPayment] = useState('');
  const [shipment, setShipment] = useState('');
  const [incotermItem, setIncoterm] = useState({});
  const [checked, setChecked] = React.useState(false);
  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);

  const priceDetails = useSelector(state => state.category.priceDetails);
  useEffect(() => {
    if (Object.keys(incotermItem).length === 0) {
      return;
    }
    console.log(`Value of Percentage = ${incotermItem.pricePercentage}`);
    let newPrice = basePrice + (basePrice * incotermItem.pricePercentage) / 100;
    setPrice(Math.floor(newPrice));
  }, [basePrice, incotermItem]);
  useEffect(() => {
    dispatch(getPriceDetailsAction());
  }, []);
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
        LayoutAnimation.configureNext(layoutAnimConfig);
        setContactDetails(result);
      }
    };
    const showInfoMessage = setTimeout(() => {
      LayoutAnimation.configureNext(layoutAnimConfig);
      setShowInfo(true);
    }, 2549);
    getContactDetails();
    return () => {
      clearTimeout(showInfoMessage);
    };
  }, []);
  const onPressContactDetails = item => {
    HapticFeedback();
    setContactDetails(item);
    storeContactsDetails(item).then(r => console.log(JSON.stringify(r)));
  };
  const showDialog = () => setShowQuantity(true);
  const showPackagingDialog = () => setPackagingDialog(true);
  const showContactsDialog = () => {
    HapticFeedback();
    setContactsDialog(true);
  };
  const hideContactsDialog = () => setContactsDialog(false);
  const hidePackagingDialog = () => setPackagingDialog(false);
  const showPriceDialog = () => setShowPrice(true);
  const showPaymentDialog = () => setPaymentDialog(true);
  const hideDialog = () => setShowQuantity(false);
  const hidePaymentDialog = () => setPaymentDialog(false);
  const hidePriceDialog = () => setShowPrice(false);
  const onQuantitySuccess = item => {
    HapticFeedback();
    if (item > 10) {
      showBottomFeedBack('Maximum Quantity is 10 MT per user per order');
      return;
    }
    setQuantity(item);
  };
  const onPriceSuccess = itm => {
    HapticFeedback();
    if (itm < item.price) {
      showBottomFeedBack(
        `Enter Price greater than Minimum price of $${item.price}`,
      );
      return;
    }
    setPrice(itm);
  };
  const onPackagingSuccess = item => {
    HapticFeedback();
    setPackaging(item);
  };

  const onChipPress = item => {
    HapticFeedback();
    setPayment(item);
  };

  const onPressPlaceOrder = useCallback(() => {
    HapticFeedback('impactMedium');
    const contactObject = contactDetails.reduce((result, {title, value}) => {
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
    }, {});
    if (Object.keys(contactObject).length === 0) {
      showMiddleFeedBack('Provide Contact Details');
      return;
    }
    let resultItem = {
      item,
      price,
      quantity,
      packaging,
      incoterm: incotermItem.incoterm,
      payment,
      mode: shipment,
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

    navigation.navigate('Checkout', {
      item: resultItem,
    });
  }, [
    checked,
    contactDetails,
    incotermItem,
    item,
    navigation,
    packaging,
    payment,
    price,
    quantity,
    shipment,
  ]);

  return (
    <View style={importStyles.container}>
      <HeaderComponent showHeader={true} name={'Place Import Order'} />
      <View
        style={{
          flex: 1,
          backgroundColor: MD2Colors.transparent,
          padding: 10,
        }}>
        <ScrollView style={{marginBottom: 35, flex: 1}}>
          <InfoBanner
            isVisible={showInfo}
            message={INFO_TEXT}
            onDismiss={() => {
              HapticFeedback();
              LayoutAnimation.configureNext(layoutAnimConfig);
              setShowInfo(false);
            }}
          />

          <List.Section>
            <List.Subheader style={importStyles.titleStyles}>
              Commodity Name : {item.title.toUpperCase()}
            </List.Subheader>
            {/*<Sections*/}
            {/*  value={quantity}*/}
            {/*  name={`Quantity(${item.unit})`}*/}
            {/*  onPress={() => {*/}
            {/*    HapticFeedback();*/}
            {/*    showDialog();*/}
            {/*  }}*/}
            {/*/>*/}
            <List.Item
              title={`Quantity(${item.unit})`}
              titleStyle={{
                color: MD2Colors.white,
                marginHorizontal: 25,
                fontSize: 14,
                fontWeight: '500',
              }}
              right={() => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10,
                  }}>
                  <Menu
                    visible={showMenu}
                    style={{marginTop: isIos() ? -25 : 18}}
                    onDismiss={closeMenu}
                    anchor={
                      <TouchableRipple
                        onPress={openMenu}
                        style={{padding: 5}}
                        hitSlop={{
                          top: 10,
                          bottom: 10,
                          left: 10,
                          right: 10,
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            style={{
                              color: MD2Colors.white,
                              marginHorizontal: 10,
                              fontSize: 15.5,
                              fontWeight: 'bold',
                            }}>
                            {quantity} {item.unit}
                          </Text>
                          <MaterialIcons
                            size={21}
                            color={MD2Colors.yellow500}
                            name={showMenu ? 'close' : 'edit'}
                          />
                        </View>
                      </TouchableRipple>
                    }>
                    <ScrollView style={{maxHeight: 270}}>
                      {menuItems.map(number => (
                        <Menu.Item
                          key={number}
                          onPress={() => {
                            console.log(number);
                            setQuantity(number);
                            closeMenu();
                          }}
                          title={number.toString()}
                        />
                      ))}
                    </ScrollView>
                  </Menu>
                </View>
              )}
            />
            {/*<List.Item*/}
            {/*  title={'Quantity'}*/}
            {/*  titleStyle={{*/}
            {/*    color: MD2Colors.white,*/}
            {/*    marginHorizontal: 25,*/}
            {/*    fontSize: 14,*/}
            {/*    fontWeight: '500',*/}
            {/*  }}*/}
            {/*  right={() => (*/}
            {/*    <Menu*/}
            {/*      visible={visible}*/}
            {/*      onDismiss={closeMenu}*/}
            {/*      anchor={*/}
            {/*        <View*/}
            {/*          style={{*/}
            {/*            flexDirection: 'row',*/}
            {/*            alignItems: 'baseline',*/}
            {/*            marginHorizontal: 2,*/}
            {/*          }}>*/}
            {/*          <TouchableRipple*/}
            {/*            style={{marginHorizontal: 5}}*/}
            {/*            onPress={openMenu}>*/}
            {/*            <Text style={{color: MD2Colors.white}}>*/}
            {/*              {quantity} {item.unit}*/}
            {/*            </Text>*/}
            {/*          </TouchableRipple>*/}
            {/*          <Text style={{color: MD2Colors.white}}>Edit</Text>*/}
            {/*          <MaterialCommunityIcons*/}
            {/*            name={'book-edit'}*/}
            {/*            size={15}*/}
            {/*            color={MD2Colors.white}*/}
            {/*          />*/}
            {/*        </View>*/}
            {/*      }>*/}
            {/*      <Menu.Item onPress={() => {}} title="Item 1" />*/}
            {/*      <Menu.Item onPress={() => {}} title="Item 2" />*/}
            {/*      <Divider />*/}
            {/*      <Menu.Item onPress={() => {}} title="Item 3" />*/}
            {/*/!*    </Menu>*!/*/}
            {/*    // <Text*/}
            {/*    //   style={{*/}
            {/*    //     color: MD2Colors.white,*/}
            {/*    //     marginHorizontal: 25,*/}
            {/*    //     fontSize: 14.5,*/}
            {/*    //     fontWeight: 'bold',*/}
            {/*    //   }}>*/}
            {/*    //   $ {price} / {getLongName(item.unit)}*/}
            {/*    // </Text>*/}
            {/*  )}*/}
            {/*/>*/}
            <List.Item
              title={'Price'}
              titleStyle={{
                color: MD2Colors.white,
                marginHorizontal: 25,
                fontSize: 14,
                fontWeight: '500',
              }}
              right={() => (
                <Text
                  style={{
                    color: MD2Colors.white,
                    marginHorizontal: 25,
                    fontSize: 14.5,
                    fontWeight: 'bold',
                  }}>
                  $ {price} / {getLongName(item.unit)}
                </Text>
              )}
            />
          </List.Section>
          <List.Section>
            <List.Subheader style={importStyles.titleStyles}>
              Packaging (in {packaging} KG)
            </List.Subheader>
            <SegmentedButtons
              value={packaging}
              style={{marginHorizontal: 8, color: MD2Colors.white}}
              onValueChange={e => {
                LayoutAnimation.configureNext(layoutAnimConfig);
                HapticFeedback();
                setPackaging(e);
              }}
              density={'regular'}
              buttons={[
                {
                  value: '10',
                  label: '10 kg',
                  uncheckedColor: MD2Colors.white,
                  style: {
                    borderRadius: 8,
                  },
                  showSelectedCheck: true,
                },
                {
                  value: '15',
                  label: '15 kg',
                  uncheckedColor: MD2Colors.white,
                  showSelectedCheck: true,
                },
                {
                  value: '25',
                  label: '25 kg',
                  uncheckedColor: MD2Colors.white,
                  showSelectedCheck: true,
                },
                {
                  value: '50',
                  label: '50 kg',
                  uncheckedColor: MD2Colors.white,
                  style: {
                    borderRadius: 8,
                  },
                  showSelectedCheck: true,
                },
              ]}
            />
          </List.Section>
          <List.Section>
            <List.Subheader style={importStyles.titleStyles}>
              Shipment Mode {shipment?.toUpperCase()}
            </List.Subheader>
            <SegmentedButtons
              value={shipment}
              style={{marginHorizontal: 8, color: MD2Colors.white}}
              onValueChange={e => {
                HapticFeedback();
                LayoutAnimation.configureNext(layoutAnimConfig);
                setShipment(e);
              }}
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
              Incoterm : {incotermItem.incoterm}
            </List.Subheader>
            <FlatList
              data={priceDetails}
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
                      borderWidth:
                        incotermItem.incoterm === item.incoterm ? 1.5 : 0,
                      // borderColor: MD3Colors.tertiary20,
                    }}
                    mode={'outlined'}
                    elevated={true}
                    textStyle={{
                      fontSize:
                        incotermItem.incoterm === item.incoterm ? 15.4 : 14.1,
                      fontWeight:
                        incotermItem.incoterm === item.incoterm
                          ? 'bold'
                          : '400',
                      color: isIos() ? MD2Colors.blue900 : MD2Colors.white,
                    }}
                    icon={
                      incotermItem.incoterm === item.incoterm
                        ? 'check-decagram'
                        : null
                    }
                    onPress={() => {
                      LayoutAnimation.configureNext(layoutAnimConfig);
                      HapticFeedback();
                      setIncoterm(item);
                    }}>
                    {item.incoterm}
                  </Chip>
                );
              }}
              ListEmptyComponent={() => {
                return (
                  <LottieView
                    source={require('../../../assets/anim/myLoading8.json')}
                    autoPlay
                    loop
                    style={{
                      height: 64,
                      alignSelf: 'center',
                    }}
                  />
                );
              }}
              horizontal={true}
            />
          </List.Section>
          <List.Section>
            <List.Subheader style={importStyles.titleStyles}>
              Payment Terms {payment}
            </List.Subheader>
            <SegmentedButtons
              value={payment}
              style={{marginHorizontal: 8, color: MD2Colors.white}}
              onValueChange={e => {
                LayoutAnimation.configureNext(layoutAnimConfig);
                HapticFeedback();
                setPayment(e);
              }}
              density={'regular'}
              buttons={[
                {
                  value: 'LC',
                  label: 'LC',
                  uncheckedColor: MD2Colors.white,
                  style: {
                    borderRadius: 8,
                  },
                  showSelectedCheck: true,
                },
                {
                  value: 'ADLC',
                  label: 'Advance + LC',
                  uncheckedColor: MD2Colors.white,
                  style: {
                    borderRadius: 8,
                  },
                  showSelectedCheck: true,
                },
              ]}
            />
          </List.Section>
          {/*<List.Section style={{marginBottom: 1}}>*/}
          {/*  <List.Subheader style={importStyles.titleStyles}>*/}
          {/*    Payment Terms*/}
          {/*  </List.Subheader>*/}
          {/*  <List.Item*/}
          {/*    titleStyle={{color: MD2Colors.white}}*/}
          {/*    title={payment.name}*/}
          {/*    style={{*/}
          {/*      marginLeft: 15,*/}
          {/*      marginRight: 15,*/}
          {/*    }}*/}
          {/*    right={props => {*/}
          {/*      return (*/}
          {/*        <TouchableRipple*/}
          {/*          onPress={() => {*/}
          {/*            showPaymentDialog();*/}
          {/*          }}>*/}
          {/*          <View style={{flexDirection: 'row'}}>*/}
          {/*            <MaterialCommunityIcons*/}
          {/*              name={'archive-edit-outline'}*/}
          {/*              size={16}*/}
          {/*              color={MD2Colors.yellow400}*/}
          {/*            />*/}
          {/*            <Text style={importStyles.editText}>*/}
          {/*              Edit Payment Term*/}
          {/*            </Text>*/}
          {/*          </View>*/}
          {/*        </TouchableRipple>*/}
          {/*      );*/}
          {/*    }}*/}
          {/*  />*/}
          {/*</List.Section>*/}

          <List.Section style={{marginVertical: 10}}>
            <List.Subheader style={importStyles.titleStyles}>
              Contact Details
            </List.Subheader>
            {contactDetails.length === 0 ? (
              <List.Item
                onPress={() => {
                  HapticFeedback();
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
              onPress={() => {
                HapticFeedback();
                setChecked(prev => !prev);
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialCommunityIcons
                  name={checked ? 'check-all' : 'checkbox-blank-outline'}
                  size={24}
                  color={checked ? MD2Colors.green300 : MD2Colors.white}
                  style={{marginHorizontal: 2}}
                />
                <Text style={importStyles.titleStyles}>
                  I have verified my Order Details
                </Text>
              </View>
            </TouchableRipple>
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
            name={'Checkout'}
            icon={'export'}
            style={{
              width: width * 0.9,
              marginHorizontal: 5,
              alignSelf: 'center',
              borderRadius: 8,
            }}
            onPress={onPressPlaceOrder}
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
