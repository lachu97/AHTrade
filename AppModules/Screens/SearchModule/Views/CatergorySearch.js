import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import styles from '../styles/CategorySearchStyles';
import {useNavigation, useRoute} from '@react-navigation/native';
import AHText from '../../../Components/AHText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Card,
  Chip,
  MD2Colors,
  MD3Colors,
  TouchableRipple,
} from 'react-native-paper';
import SearchCardItem from '../MicroComponents/Card';
import BottomBar from '../../../Components/BottomBar/BottomBar';
import {data} from '../../../MockData/MockDatas';
import {isIos} from '../../../HelperFuntions/helpers';

const CategoryListChip = ({select, onChipPress}) => {
  // const [selected, setSelected] = useState(select);
  // const selected = true
  const categories = ['Spices', 'Metals', 'Commodity', 'Fuel', 'Millets'];
  const renderItem = ({item}) => {
    return (
      <Chip
        style={{
          margin: 2,
          backgroundColor: isIos() ? MD2Colors.white : MD3Colors.primary20,
        }}
        elevated={true}
        mode={'outlined'}
        textStyle={{
          fontSize: select === item ? 15.2 : 14.3,
          fontWeight: select === item ? 'bold' : 500,
          color: isIos() ? MD2Colors.blue900 : MD2Colors.white,
        }}

        icon={select === item ? 'check-decagram' : null}
        onPress={() => onChipPress(item)}>
        {item}
      </Chip>
    );
  };
  return (
    <View style={{padding: 5}}>
      <FlatList
        style={{margin: 5}}
        data={categories}
        keyExtractor={(item, index) => `${index}`}
        contentContainerStyle={{
          margin: 5,
          padding: 2,
        }}
        renderItem={renderItem}
        horizontal
      />
    </View>
  );
};
const sample = [1, 2, 3, 4, 5, 6];
const CategoryHeader = ({name, onPress}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
      }}>
      <TouchableRipple onPress={onPress}>
        <MaterialCommunityIcons
          name={'arrow-left'}
          size={30}
          color={MD2Colors.white}
        />
      </TouchableRipple>
      <AHText
        style={{color: MD2Colors.white, fontSize: 20, marginHorizontal: 10}}
        name={name}
      />
    </View>
  );
};
const CategorySearch = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selected, setSelected] = useState(route.params?.name);
  let prodData = data[1].productData;

  const onChipPress = item => setSelected(item);
  const renderSearchItem = ({item}) => {
    return <SearchCardItem navigation={navigation} item={item} />;
  };
  return (
    <View style={styles.container}>
      <CategoryHeader name={selected} onPress={() => navigation.goBack()} />
      <CategoryListChip select={selected} onChipPress={onChipPress} />
      <View
        style={{
          flex: 1,
          backgroundColor: MD2Colors.transparent,
          margin: 5,
          padding: 1,
          alignItems: 'center',
        }}>
        <FlatList
          keyExtractor={(_, idx) => `${idx}`}
          contentContainerStyle={{padding: 2}}
          data={prodData}
          renderItem={renderSearchItem}
        />
      </View>
      <BottomBar navigation={navigation} activeTab={'Category'} />
    </View>
  );
};
export default React.memo(CategorySearch);
