import React from 'react';
import {Icon, MD2Colors, Text, TouchableRipple} from 'react-native-paper';
import {FlatList, View} from 'react-native';
import AHText from '../AHText';
import {useNavigation} from '@react-navigation/native';

const CardComponent = ({icon, title, onPress}) => {
  return (
    <TouchableRipple
      onPress={onPress}
      rippleColor="rgba(0, 0, 0, 0.2)"
      style={{
        borderRadius: 5,
        borderWidth: 1,
        borderColor: MD2Colors.white,
        margin: 5,
        height: 95,
      }}>
      <View
        style={{
          alignItems: 'center',
          marginVertical: 5,
          marginHorizontal: 5,
          justifyContent: 'center',
        }}>
        <Icon source={icon} size={45} />
        <Text style={{color: MD2Colors.white, marginVertical: 10}}>
          {title}
        </Text>
      </View>
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
