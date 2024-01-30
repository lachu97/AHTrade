import React, {useEffect, useState} from 'react';
import {View, Pressable, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import styles from '../Styles/HomeStyles';
import {data} from '../MockData/MockDatas';

import {HomeHeaderComponent} from '../Components/HeaderComponent';
import CategoryList from '../Components/Lists/CategoryList';
import AHText from '../Components/AHText';
import ProductList from '../Components/Lists/ProductsLists';
import BottomBar from '../Components/BottomBar/BottomBar';
const act = () => ({type: 'ADDHOME'});
const HomeScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [isDrawerVisible, setDrawerVisible] = useState(false);

  const openDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);
  let catData = data[0].categoryData;
  let prodData = data[1].productData;
  useEffect(() => {
    dispatch(act());
  }, []);
  const handlePress = () => {
    console.log('pressed');
    navigation.navigate('Detail');
  };
  return (
    <View style={styles.container}>
      <HomeHeaderComponent />
      <AHText style={styles.textStyle} name={'Category'} />
      <View style={{marginVertical: 5, padding: 1}}>
        <CategoryList data={catData} />
      </View>
      <AHText style={styles.textStyle} name={'Products'} />
      <View style={{marginVertical: 5, padding: 1, flex: 1}}>
        <ProductList data={catData} />
      </View>
      <View style={{flex: 0.15}}>
        <BottomBar navigation={navigation} />
      </View>
    </View>
  );
};
export default React.memo(HomeScreen);
