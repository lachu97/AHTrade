import React, {useEffect, useState} from 'react';
import {View, Pressable, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../Styles/HomeStyles';
import {data} from '../MockData/MockDatas';

import {HomeHeaderComponent} from '../Components/HeaderComponent';
import CategoryList from '../Components/Lists/CategoryList';
import AHText from '../Components/AHText';
import ProductList from '../Components/Lists/ProductsLists';
import BottomBar from '../Components/BottomBar/BottomBar';
const act = () => ({type: 'ADDHOME'});
const getCategoryData = () => ({type: 'GET_CATEGORY'});
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  let catData = useSelector(state => state.category.categoryData);
  let prodData = data[1].productData;
  useEffect(() => {
    dispatch(getCategoryData());
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <HomeHeaderComponent />

      <View style={{marginVertical: 1, padding: 1, flex: 1}}>
        <ProductList
          data={prodData}
          ListHeader={() => (
            <View style={{marginVertical: 5, padding: 2}}>
              <AHText style={styles.textStyle} name={'Category'} />
              <CategoryList data={catData} />
              <AHText style={styles.textStyle} name={'Products'} />
            </View>
          )}
        />
      </View>
      <View style={{flex: 0.15}}>
        <BottomBar navigation={navigation} activeTab={'Home'} />
      </View>
    </View>
  );
};
export default React.memo(HomeScreen);
