import React, {useCallback, useEffect, useState} from 'react';
import styles from '../styles/PlaceBidStyles';
import {Dimensions, LayoutAnimation, View} from 'react-native';
import {MD2Colors, Surface, Text, TouchableRipple} from 'react-native-paper';
import AHText from '../../../Components/AHText';
import {HeaderComponent} from '../../../Components/HeaderComponent';
import {useNavigation, useRoute} from '@react-navigation/native';
import {isValidElement} from '../../../HelperFuntions/helpers';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BidDialog, {QuantityDialog} from '../MicroComponents/BidDialog';
import AHButton from '../../../Components/AHButton';
import {
  showBottomFeedBack,
  showMiddleFeedBack,
} from '../../../Components/Toasts/ToastsFeedBack';
import {setBidList} from '../LocalStorage/BidDatabase';
import BidInfoBanner from '../MicroComponents/BidInfoBanner';
import {BID_INFO, layoutAnimConfig} from '../../../Constants/AppConstants';
import {getIsGuestUser} from '../../../Storage/LocalStorage';
const width = Dimensions.get('window').width;
const PlaceBid = () => {
  const route = useRoute();
  let result = route.params?.item;
  let item = route.params?.item;

  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [qVisible, setQVisible] = useState(false);
  const [bidInfo, setBidInfo] = useState(false);
  const [isGuestUser, setIsGuestUser] = useState(false);
  const [bidPrice, setBidPrice] = useState(item.price);
  const [quantity, setQuantity] = useState(item.moq);

  useEffect(() => {
    getIsGuestUser().then(r => {
      console.log(r);
      console.log(typeof r);
      setTimeout(() => {
        setBidInfo(r);
        setIsGuestUser(r);
      }, 3000);
    });
  }, []);
  const hideDialog = () => setVisible(false);
  const showDialog = () => setVisible(true);
  const onSuccess = text => {
    if (text === ' ') {
      return;
    }
    if (text >= item.price) {
      setBidPrice(text);
    } else {
      showBottomFeedBack('Bid Price cannot be less than Minimum Price');
    }
  };
  const hideQDialog = () => setQVisible(false);
  const showQDialog = () => setQVisible(true);
  const onQSuccess = text => {
    if (text === ' ') {
      return;
    }
    if (text >= item.moq) {
      setQuantity(text);
    } else {
      showBottomFeedBack('Quantity cannot be less than MOQ');
    }
  };
  if (isValidElement(item)) {
    console.log(item);
  }
  const onLoginSignUp = useCallback(() => {
    LayoutAnimation.configureNext(layoutAnimConfig);
    navigation.reset({
      index: 0,
      routes: [{name: 'AuthStack'}],
    });
  }, [navigation]);
  const validateInputs = () => {
    if (item.price >= bidPrice) {
      showMiddleFeedBack('Bid Price should be more than Minimum Price');
      return false;
    }
    if (item.quantity >= quantity) {
      showMiddleFeedBack('Quantity should be more than Minimum Quantity');
      return false;
    }
    return true;
  };
  return (
    <View style={styles.container}>
      <HeaderComponent showHeader={true} name={'Place Bid'} />
      <BidInfoBanner
        isVisible={bidInfo}
        message={BID_INFO}
        onLoginSignUp={onLoginSignUp}
      />
      <View style={styles.boxContainer}>
        <AHText
          style={styles.headline}
          numberOfLines={2}
          variant={'headlineMedium'}
          name={`Commodity Name: ${item.title}`}
        />
      </View>
      <View style={styles.middleContainer}>
        <View>
          <Text style={{color: MD2Colors.white}}>Min Price ($)</Text>
          <Text
            style={{
              color: MD2Colors.white,
              textAlign: 'center',
              margin: 5,
              fontSize: 26,
            }}>
            {item?.price ? item.price : 0}
          </Text>
        </View>
        <View>
          <Text style={{color: MD2Colors.white}}>Your Bid Price($)</Text>
          <Text
            style={{
              color: MD2Colors.white,
              textAlign: 'center',
              margin: 5,
              fontSize: 26,
            }}>
            {'$ ' + bidPrice + `/ ${item.unit}`}
          </Text>
          <TouchableRipple
            onPress={() => {
              showDialog();
            }}
            style={{padding: 5}}>
            <View style={{flexDirection: 'row', margin: 1}}>
              <MaterialCommunityIcons
                name={'archive-edit-outline'}
                size={16}
                color={MD2Colors.yellow400}
              />
              <Text
                style={{
                  color: MD2Colors.yellow400,
                  fontSize: 12,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                }}>
                Edit your Bid
              </Text>
            </View>
          </TouchableRipple>
        </View>
      </View>
      <View style={styles.middleContainer}>
        <View>
          <Text style={{color: MD2Colors.white}}>
            Min Quantity ({item.unit})
          </Text>
          <Text
            style={{
              color: MD2Colors.white,
              textAlign: 'center',
              margin: 5,
              fontSize: 26,
            }}>
            {item?.moq ? item.moq : 0}
          </Text>
        </View>
        <View>
          <Text style={{color: MD2Colors.white}}>Your Quantity (in MT)</Text>
          <Text
            style={{
              color: MD2Colors.white,
              textAlign: 'center',
              margin: 5,
              fontSize: 26,
            }}>
            {quantity + item.unit}
          </Text>
          <TouchableRipple
            onPress={() => {
              showQDialog();
            }}
            style={{padding: 5, alignSelf: 'center'}}>
            <View style={{flexDirection: 'row', margin: 1}}>
              <MaterialCommunityIcons
                name={'archive-edit-outline'}
                size={16}
                color={MD2Colors.yellow400}
              />
              <Text
                style={{
                  color: MD2Colors.yellow400,
                  fontSize: 12,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                }}>
                Edit your Quantity
              </Text>
            </View>
          </TouchableRipple>
        </View>
      </View>
      <QuantityDialog
        title={`Enter Quantity(${item.unit})`}
        onSuccess={onQSuccess}
        isVisible={qVisible}
        hideDialog={hideQDialog}
        placeholder={'Enter Quantity'}
        keyBoardType={'numeric'}
      />
      <BidDialog
        title={'Enter Bid Price'}
        onSuccess={onSuccess}
        isVisible={visible}
        hideDialog={hideDialog}
        placeholder={'Enter Bid Price'}
        keyBoardType={'numeric'}
      />
      <View
        style={{
          bottom: 0,
          position: 'absolute',
          width: width,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AHButton
          style={{width: width * 0.94, margin: 10, borderRadius: 8}}
          icon={'clock-time-eight-outline'}
          name={'Place Bid'}
          onPress={() => {
            if (isGuestUser) {
              showBottomFeedBack('Try Registering and then Place a Bid');
              return;
            }
            if (validateInputs()) {
              setBidList({
                item,
                bidPrice,
                quantity,
              });
              navigation.navigate('BidSuccess', {
                bidDetails: {
                  bidPrice: bidPrice,
                  quantity: quantity,
                },
                item,
              });
            }
          }}
        />
      </View>
    </View>
  );
};
export default React.memo(PlaceBid);
