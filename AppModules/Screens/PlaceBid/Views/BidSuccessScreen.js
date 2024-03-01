import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  LayoutAnimation,
  useWindowDimensions,
  View,
} from 'react-native';
import {List, MD2Colors, Text, TouchableRipple} from 'react-native-paper';
import {isIos} from '../../../HelperFuntions/helpers';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getBidList} from '../LocalStorage/BidDatabase';
import {getBidListFromStorage} from '../Helpers/BidHelpers';
import AHButton from '../../../Components/AHButton';
import BidCard from '../MicroComponents/BidCard';
import {layoutAnimConfig} from '../../../Constants/AppConstants';
import importStyles from '../../ImportDetails/Styles/ImportStyles';
const BidSuccessScreen = () => {
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();
  let bidDetails = route.params?.bidDetails;
  let item = route.params?.item;
  const [bidList, setBidList] = useState({});
  console.log(`BId Detaisl = ${JSON.stringify(bidDetails)}`);
  console.log(`Items Detaisl = ${JSON.stringify(item)}`);
  useEffect(() => {
    const getBidDetails = async () => {
      getBidListFromStorage().then(result => {
        if (result) {
          setBidList(result);
        }
      });
    };
    getBidDetails();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: Colors.dark, alignItems: 'center'}}>
      <Image
        style={{
          width: width * 0.5,
          height: height / 4,
          resizeMode: 'contain',
          marginVertical: 5,
          alignSelf: 'center',
        }}
        //resizeMode={FastImage.resizeMode.contain}
        source={require('../../../assets/Icons/tick.png')}
      />
      <Text
        style={{
          color: MD2Colors.white,
          fontSize: 21,
          fontWeight: 'bold',
          textAlign: 'center',
          padding: 5,
          fontStyle: 'italic',
          marginHorizontal: isIos() ? 3 : 10,
        }}>
        Bid Placed SuccessFully,
      </Text>
      <Text
        style={{
          color: MD2Colors.white,
          fontSize: 18,
          fontWeight: '400',
          textAlign: 'center',
          padding: 5,
          fontStyle: 'italic',
          marginHorizontal: isIos() ? 3 : 10,
        }}>
        You will be notified if bid is Approved
      </Text>
      <AHButton
        style={{borderRadius: 8}}
        name={'Go Home'}
        onPress={() => {
          LayoutAnimation.configureNext(layoutAnimConfig);
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
        }}
      />
      <List.Section>
        <List.Subheader style={{color: MD2Colors.white}}>
          Your Bids
        </List.Subheader>
        <BidCard item={item} bidDetails={bidDetails} />
      </List.Section>
    </View>
  );
};
export default React.memo(BidSuccessScreen);
