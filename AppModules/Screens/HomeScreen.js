import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  LayoutAnimation,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../Styles/HomeStyles';
import {HomeHeaderComponent} from '../Components/HeaderComponent';
import CategoryList from '../Components/Lists/CategoryList';
import AHText from '../Components/AHText';
import ProductList from '../Components/Lists/ProductsLists';
import BottomBar from '../Components/BottomBar/BottomBar';
const act = () => ({type: 'ADDHOME'});
const width = Dimensions.get('window').width;
const getCategoryData = () => ({type: 'GET_CATEGORY'});
const getProductData = () => ({type: 'GET_PRODUCT'});
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [categoryLoading, setCategoryLoading] = useState(false);

  let catData = useSelector(state => state.category.categoryData);
  let prodData = useSelector(state => state.category.productData);
  useEffect(() => {
    const loadCategory = () => {
      try {
        setCategoryLoading(true);
        dispatch(getCategoryData());
        dispatch(getProductData());
      } catch (e) {
      } finally {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        setCategoryLoading(false);
      }
    };
    loadCategory();
  }, [dispatch]);
  const ListHeader = useCallback(() => {
    return (
      <View style={{marginVertical: 5, padding: 2}}>
        <AHText style={styles.textStyle} name={'Category'} />
        <CategoryList data={catData} />
        <AHText style={styles.textStyle} name={'Products'} />
      </View>
    );
  }, [catData]);
  return (
    <View style={styles.container}>
      <HomeHeaderComponent />

      <View style={{marginVertical: 1, padding: 1, flex: 1}}>
        <ProductList data={prodData} ListHeader={ListHeader} />
      </View>
      <View style={{flex: 0.15}}>
        <BottomBar navigation={navigation} activeTab={'Home'} />
      </View>
    </View>
  );
};
export default React.memo(HomeScreen);
