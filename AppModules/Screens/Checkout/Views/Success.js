import React, {useEffect, useState} from 'react';
import {Dimensions, Image, View} from 'react-native';
import {HeaderComponent} from '../../../Components/HeaderComponent';
import {useRoute} from '@react-navigation/native';
import {MD2Colors, Text} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {getContactsDetails} from '../../../Storage/AppLocalStorage/ContactsStorage';
import FastImage from 'react-native-fast-image';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Success = () => {
  const route = useRoute();
  const [contactDetails, setContactDetails] = useState([]);
  useEffect(() => {
    const getContactDetails = async () => {
      let result = await getContactsDetails();
      if (result) {
        setContactDetails(result);
      }
    };
    getContactDetails();
  }, []);

  return (
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
        }}>
        Import Order Placed SuccessFully !!
      </Text>
    </View>
  );
};
export default React.memo(Success);
