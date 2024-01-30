import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import styles from '../styles/CategorySearchStyles';
import {useNavigation, useRoute} from '@react-navigation/native';
import AHText from '../../../Components/AHText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Chip, MD2Colors, TouchableRipple} from 'react-native-paper';

const CategoryListChip = ({select, onChipPress}) => {
  // const [selected, setSelected] = useState(select);
  // const selected = true
  const categories = ['Spices', 'Metals', 'Commodity', 'Fuel', 'Millets'];
  const renderItem = ({item}) => {
    return (
      <Chip
        style={{margin: 2}}
        elevated={true}
        mode={'outlined'}
        textStyle={{
          fontSize: select === item ? 15.2 : 14.3,
          fontWeight: select === item ? 'bold' : 200,
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
  const [selected, setSelected] = useState(route.params.name);
  const onChipPress = item => setSelected(item);
  return (
    <View style={styles.container}>
      <CategoryHeader name={selected} onPress={() => navigation.goBack()} />
      <CategoryListChip select={selected} onChipPress={onChipPress} />
      <View
        style={{
          flex: 1,
          backgroundColor: MD2Colors.white,
          margin: 5,
          padding: 5,
        }}
      />
    </View>
  );
};
export default React.memo(CategorySearch);
