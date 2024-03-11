import React from 'react';
import {
  ActivityIndicator,
  Icon,
  MD2Colors,
  Surface,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import {Dimensions, FlatList, View} from 'react-native';
import AHText from '../AHText';
import {useNavigation} from '@react-navigation/native';
import {HapticFeedback, isIos} from '../../HelperFuntions/helpers';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';
const width = Dimensions.get('window').width;

const CardComponent = ({image, title, onPress}) => {
  return (
    <TouchableRipple
      onPress={onPress}
      rippleColor="rgba(0, 0, 0, 0.2)"
      style={{
        borderRadius: 5,
        borderWidth: 1,
        // borderColor: MD2Colors.white,
        margin: 5,
        height: 110,
        width: 110,
      }}>
      <Surface elevation={5} style={{flex: 1}}>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 10,
            marginHorizontal: 5,
            justifyContent: 'center',
          }}>
          <FastImage
            source={{
              uri: image,
              priority: FastImage.priority.high,
            }}
            style={{
              height: 50,
              width: 52,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text
            numberOfLines={1}
            userSelect={'text'}
            style={{
              color: isIos() ? MD2Colors.black : MD2Colors.white,
              marginVertical: 10,
              textAlign: 'center',
              fontWeight: 'bold',
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
    HapticFeedback();
    navigation.navigate('CategorySearch', {
      name: item.name,
      id: item.id,
    });
  };
  const renderItem = ({item}) => (
    <CardComponent
      image={item.image}
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
      ListEmptyComponent={() => (
        <View style={{width: width}}>
          <LottieView
            autoPlay
            loop
            source={require('../../assets/anim/myLoading8.json')}
            style={{
              flex: 1,
              height: 70,
            }}
          />
          <Text style={{color: MD2Colors.teal50, textAlign: 'center'}}>
            Loading Category...
          </Text>
        </View>
      )}
    />
  );
};
export default React.memo(CategoryList);
