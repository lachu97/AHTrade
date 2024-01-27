import React from 'react';
import {Text} from 'react-native-paper';
const AHText = props => <Text {...props}>{props.name}</Text>;
export default React.memo(AHText);
