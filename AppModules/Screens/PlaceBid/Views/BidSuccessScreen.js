import React, {useEffect, useState} from 'react';
import {Dimensions, Image, View} from 'react-native';
import {MD2Colors, Text, TouchableRipple} from 'react-native-paper';
import {isIos} from '../../../HelperFuntions/helpers';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';
import {getBidList} from '../LocalStorage/BidDatabase';
import {getBidListFromStorage} from '../Helpers/BidHelpers';
import AHButton from '../../../Components/AHButton';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const BidSuccessScreen = () => {
  const navigation = useNavigation();
  const [bidList, setBidList] = useState({});
  useEffect(() => {
    const getBidDetails = async () => {
      let result = getBidListFromStorage();
      if (result) {
        setBidList(result);
      }
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
          fontSize: 25,
          fontWeight: 'bold',
          textAlign: 'center',
          padding: 5,
          fontStyle: 'italic',
          marginHorizontal: isIos() ? 3 : 10,
        }}>
        Bid Placed SuccessFully
      </Text>
      <AHButton
        style={{borderRadius: 8}}
        name={'Go to Bid History'}
        onPress={() => {
          navigation.navigate('BidHistory');
        }}
      />
    </View>
  );
};
export default React.memo(BidSuccessScreen);
