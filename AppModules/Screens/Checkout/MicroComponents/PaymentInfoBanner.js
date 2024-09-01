import * as React from 'react';
import {Banner, Icon, Text, MD2Colors} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useWindowDimensions} from 'react-native';
import {TextView} from '../../../Components/AHText';

const PaymentInfoBanner = ({isVisible, message, onDismiss}) => {
  const {width} = useWindowDimensions();
  return (
    <Banner
      visible={isVisible}
      style={{backgroundColor: Colors.dark}}
      contentStyle={{
        backgroundColor: Colors.light,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 1,
        alignSelf: 'center',
        width: width * 0.93,
      }}
      actions={[
        {
          label: 'OK ,Got it',
          onPress: () => onDismiss(),
        },
      ]}
      icon={() => (
        <Icon source={'information'} size={24} color={MD2Colors.blueA700} />
      )}>
      <TextView style={{color: MD2Colors.black}}>{message}</TextView>
    </Banner>
  );
};

export default React.memo(PaymentInfoBanner);
