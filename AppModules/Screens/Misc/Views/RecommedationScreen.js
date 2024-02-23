import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {Colors} from "react-native/Libraries/NewAppScreen";
import {HeaderComponent} from "../../../Components/HeaderComponent";

const RecommendationScreen = () => {
  return (
    <View style={{flex:1,backgroundColor: Colors.dark}}>
        <HeaderComponent name={'Product Recommendation'} />
        <Text>Recommendation Screen</Text>
    </View>
  );
};
export default React.memo(RecommendationScreen);
