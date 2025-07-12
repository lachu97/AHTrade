import React from 'react';
import {Button, MD2Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {textTheme} from '../../../Themes/themes';
import {useWindowDimensions} from 'react-native';

const PartnerCTA = () => {
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  return (
    <Button
      style={{
        // width: width * 0.7,
        borderRadius: 8,
        borderColor: MD2Colors.teal100,
        borderWidth: 1,
        alignSelf: 'center',
        marginVertical: 20,
      }}
      icon={'party-popper'}
      textColor={MD2Colors.tealA100}
      labelStyle={{
        fontFamily: textTheme.bold.fontFamily,
        fontSize: 16,
        flexWrap: 'wrap',
      }}
      onPress={() => navigation.navigate('BecomePartner')}>
      Interested in Partnering with us ?
    </Button>
  );
};

export default React.memo(PartnerCTA);
