import * as React from 'react';
import {Banner, Icon, MD2Colors} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';

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
      icon={() => <Icon source={'information'} size={24} />}>
      {message}
    </Banner>
  );
};

export default React.memo(InfoBanner);
