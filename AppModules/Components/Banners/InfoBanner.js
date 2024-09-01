import * as React from 'react';
import {Banner, Icon, Text, MD2Colors} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {TextView} from '../AHText';

const InfoBanner = ({isVisible, message, onDismiss}) => {
  return (
    <Banner
      visible={isVisible}
      contentStyle={{
        backgroundColor: Colors.light,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 1,
      }}
      actions={[
        {
          label: 'Ok ,Got it',
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

export default React.memo(InfoBanner);
