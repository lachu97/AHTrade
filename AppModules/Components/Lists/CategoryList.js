import React from 'react';
import {
  Icon,
  MD2Colors,
  Surface,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import {FlatList, View} from 'react-native';
import AHText from '../AHText';
import {useNavigation} from '@react-navigation/native';
import {isIos} from '../../HelperFuntions/helpers';

const CardComponent = ({icon, title, onPress}) => {
  return (
    <TouchableRipple
      onPress={onPress}
      rippleColor="rgba(0, 0, 0, 0.2)"
      style={{
        borderRadius: 5,
        borderWidth: 1,
        // borderColor: MD2Colors.white,
        margin: 5,
        height: 98,
        width: 100,
      }}>
      <Surface elevation={5}>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 5,
            marginHorizontal: 5,
            justifyContent: 'center',
          }}>
          <Icon source={icon} size={45} />
          <Text
            numberOfLines={1}
            userSelect={'text'}
            style={{
              color: isIos() ? MD2Colors.black : MD2Colors.white,
              marginVertical: 10,
              textAlign: 'center',
            }}>
            {title}
          </Text>
        </View>
      </Surface>
    </TouchableRipple>
  );
};
const CategoryList = ({data}) => {
  const navigation = useNavigation();

  const onPress = item => {
    navigation.navigate('CategorySearch', {
      name: item.name,
    });
  };
  const renderItem = ({item}) => (
    <CardComponent
      icon={item.image}
      title={item.name}
      onPress={() => onPress(item)}
    />
  );
  return (
    <FlatList
      style={{margin: 5}}
      data={data}
      keyExtractor={(item, index) => `${index}`}
      renderItem={renderItem}
      horizontal
    />
  );
};
export default React.memo(CategoryList);
