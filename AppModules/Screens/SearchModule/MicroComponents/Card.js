import React from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {Surface,Text} from 'react-native-paper';
import FastImage from 'react-native-fast-image';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Card = () => {
  return (
    <Surface style={styles.card}>
      <View style={{flexDirection: 'row', flex: 1,alignItem:'center'}}>
        <FastImage source={{uri: '', priority: FastImage.priority.high}} />
          <View style={{}}>
            <Text>title</Text>
            <Text>body</Text>

          </View>
      </View>
    </Surface>
  );
};
const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    height: Math.floor(height / 5),
    margin: 1,
    flex: 1,
  },
});
