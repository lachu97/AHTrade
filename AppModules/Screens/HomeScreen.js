import React, {useEffect, useState} from 'react';
import {View, Pressable, FlatList} from 'react-native';
import {Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import styles from '../Styles/HomeStyles';
import {data} from '../MockData/MockDatas';
import Shimmer from '../ShimmerEffects/shimmer';
import YourShimmer from '../ShimmerEffects/shimmer2';
const act = () => ({type: 'ADDHOME'});
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showEffect, setShowEffect] = useState(true);
  let catData = data[0].categoryData;
  let prodData = data[1].productData;
  useEffect(() => {
    dispatch(act());
    setTimeout(() => {
      setShowEffect(false);
    }, 1599);
  }, []);
  const handlePress = () => {
    console.log('pressed');
    navigation.navigate('Detail');
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={catData}
        ItemSeparatorComponent={() => <View style={{margin: 15}} />}
        ListHeaderComponent={() => (
          <Text style={styles.textStyle}>{data[0].title}</Text>
        )}
        renderItem={({item}) => (
          <Text style={styles.textStyle}>{item.name}</Text>
        )}
        ListHeaderComponentStyle={styles.categoryListHeader}
        numColumns={4}
      />
    </View>
  );
};
export default React.memo(HomeScreen);
