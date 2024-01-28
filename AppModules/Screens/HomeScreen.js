import React, {useEffect, useState} from 'react';
import {View, Pressable, FlatList} from 'react-native';
import {Appbar, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import styles from '../Styles/HomeStyles';
import {data} from '../MockData/MockDatas';
import Shimmer from '../ShimmerEffects/shimmer';
import YourShimmer from '../ShimmerEffects/shimmer2';
import {Header} from 'react-native/Libraries/NewAppScreen';
import HeaderComponent from '../Components/HeaderComponent';
import CategoryList from "../Components/Lists/CategoryList";
import AHText from "../Components/AHText";
const act = () => ({type: 'ADDHOME'});
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
      <HeaderComponent
        onPress={() => {}}
        backAction={() => {}}
        title={'Home'}
        icon={'cart'}
      />
      <AHText style={styles.textStyle} name={'Category'}/>
        <View style={{marginVertical:5,padding:1}}>
            <CategoryList data={catData} />
        </View>
    </View>
  );
};
export default React.memo(HomeScreen);
