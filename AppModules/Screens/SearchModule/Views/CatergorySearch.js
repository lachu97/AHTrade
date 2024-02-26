import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  LayoutAnimation,
  useWindowDimensions,
  View,
} from 'react-native';
import styles from '../styles/CategorySearchStyles';
import {useNavigation, useRoute} from '@react-navigation/native';
import AHText from '../../../Components/AHText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Text,
  Chip,
  MD2Colors,
  MD3Colors,
  TouchableRipple,
  Button,
} from 'react-native-paper';
import SearchCardItem from '../MicroComponents/Card';
import BottomBar, {
  BOTTOM_APPBAR_HEIGHT,
} from '../../../Components/BottomBar/BottomBar';
import {data} from '../../../MockData/MockDatas';
import {isIos} from '../../../HelperFuntions/helpers';
import {useDispatch, useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import {cleanFilterProductData} from '../../../Redux/Reducers/CategoryReducer';
import AHButton from '../../../Components/AHButton';
import {layoutAnimConfig} from '../../../Constants/AppConstants';
const searchByIDAction = id => ({
  type: 'GET_PRODUCT_BY_ID',
  payload: {
    id: id,
  },
});
const CategoryListChip = ({select, onChipPress, categories}) => {
  // const [selected, setSelected] = useState(select);
  // const selected = true
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
          fontSize: select === item.name ? 15.2 : 14.3,
          fontWeight: select === item.name ? 'bold' : 500,
          color: isIos() ? MD2Colors.blue900 : MD2Colors.white,
        }}
        icon={select === item.name ? 'check-decagram' : null}
        onPress={() => onChipPress(item)}>
        {item.name}
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
  const dispatch = useDispatch();
  const {width, height} = useWindowDimensions();
  const [selected, setSelected] = useState(route.params?.name);
  const [selectedID, setSelectedID] = useState(null);
  const categoryData = useSelector(state => state.category.categoryData);
  const filterData = useSelector(state => state.category.filterData);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const ListEmpty = useCallback(() => {
    return (
      <>
        {filterData.length === 0 ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                flex: 1,
                color: MD2Colors.white,
                textAlign: 'center',
                fontSize: 15,
                alignSelf: 'center',
                padding: 8,
              }}>
              No Product Available for this Category,Try Selecting Other
              Category
            </Text>
            <Button
              style={{
                width: width * 0.51,
                borderRadius: 8,
                borderColor: MD2Colors.teal100,
                borderWidth: 1,
                alignSelf: 'center',
                marginVertical: 5,
              }}
              icon={'book-edit'}
              onPress={() => navigation.navigate('Recommendation')}>
              Suggest Products
            </Button>
          </View>
        ) : null}
      </>
    );
  }, [filterData.length, navigation, width]);
  const fadeIn = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  useEffect(() => {
    LayoutAnimation.configureNext(layoutAnimConfig);
    dispatch(searchByIDAction(route.params?.id));
    return () => {
      dispatch(cleanFilterProductData());
    };
  }, [dispatch, route.params?.id]);
  useEffect(() => {
    if (selectedID === null) {
      return;
    }
    console.log('Iam dispatching');
    LayoutAnimation.configureNext(layoutAnimConfig);

    dispatch(searchByIDAction(selectedID));
    fadeIn();
  }, [dispatch, fadeIn, selectedID]);
  const onChipPress = item => {
    LayoutAnimation.configureNext(layoutAnimConfig);
    setSelected(item.name);
    setSelectedID(item.id);
    fadeIn();
  };
  const renderSearchItem = ({item}) => {
    return <SearchCardItem navigation={navigation} item={item} />;
  };
  return (
    <View style={styles.container}>
      <CategoryHeader name={selected} onPress={() => navigation.goBack()} />
      <CategoryListChip
        select={selected}
        onChipPress={onChipPress}
        categories={categoryData}
      />
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: MD2Colors.transparent,
          margin: 5,
          padding: 1,
          alignItems: 'center',
          marginBottom: 70,
        }}>
        <FlatList
          keyExtractor={(_, idx) => `${idx}`}
          contentContainerStyle={{padding: 2}}
          data={filterData}
          renderItem={renderSearchItem}
          ListEmptyComponent={ListEmpty}
        />
      </Animated.View>
      <BottomBar navigation={navigation} activeTab={'Category'} />
    </View>
  );
};
export default React.memo(CategorySearch);
