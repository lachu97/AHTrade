import React from 'react';
import {Banner, Icon, MD2Colors, Text} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useWindowDimensions} from 'react-native';

const BidInfoBanner = ({isVisible, onLoginSignUp, message}) => {
  const {width} = useWindowDimensions();
  return (
    <Banner
      visible={isVisible}
      style={{
        backgroundColor: Colors.light,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 1,
        width: width * 0.95,
        alignSelf: 'center',
      }}
      actions={[
        {
          label: 'LogIn or SignUp',
          onPress: () => onLoginSignUp(),
        },
      ]}
      icon={() => (
        <Icon source={'information'} size={24} color={MD2Colors.blueA700} />
      )}>
      <Text style={{color: MD2Colors.black}}>{message}</Text>
    </Banner>
  );
};
export default React.memo(BidInfoBanner);
