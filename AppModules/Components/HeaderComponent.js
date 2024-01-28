import React from 'react';
import {Appbar} from 'react-native-paper';

const HeaderComponent = ({backAction, title, icon, onPress}) => {
  return (
    <Appbar.Header style={{height: 54}} mode={'small'}>
      <Appbar.BackAction onPress={backAction} />
      <Appbar.Content title={title} />
      <Appbar.Action icon={icon} onPress={onPress} />
    </Appbar.Header>
  );
};
export default React.memo(HeaderComponent);
