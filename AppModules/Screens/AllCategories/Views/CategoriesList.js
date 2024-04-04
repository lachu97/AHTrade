import React, {useCallback} from 'react';
import {FlatList, View} from 'react-native';
import {Divider, List, MD2Colors} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {HeaderComponent} from '../../../Components/HeaderComponent';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomBar from '../../../Components/BottomBar/BottomBar';
import {HapticFeedback} from '../../../HelperFuntions/helpers';
import FastImage from 'react-native-fast-image';

const CategoriesList = () => {
  let catData = useSelector(state => state.category.categoryData);
  const navigation = useNavigation();

  const renderItems = useCallback(
    ({item}) => {
      return (
        <List.Item
          style={{height: 56}}
          title={item.name.toUpperCase()}
          titleStyle={{color: MD2Colors.white, fontWeight: '500', fontSize: 17}}
          onPress={() => {
            HapticFeedback();
            navigation.navigate('CategorySearch', {
              name: item.name,
              id: item.id,
            });
          }}
          left={() => (
            <FastImage
              source={{uri: item.image, priority: FastImage.priority.high}}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: 21,
                height: 21,
                marginHorizontal: 10,
              }}
            />
          )}
          right={() => (
            <MaterialCommunityIcons
              name={'arrow-right'}
              size={24}
              color={MD2Colors.white}
            />
          )}
        />
      );
    },
    [navigation],
  );
  return (
    <View style={{flex: 1, backgroundColor: Colors.dark}}>
      <HeaderComponent />
      <FlatList
        style={{flex: 1, marginVertical: 10, padding: 2, marginHorizontal: 2}}
        data={catData}
        renderItem={renderItems}
        ItemSeparatorComponent={() => <Divider style={{marginHorizontal: 8}} />}
      />
      <BottomBar activeTab={'Category'} navigation={navigation} />
    </View>
  );
};
export default React.memo(CategoriesList);
