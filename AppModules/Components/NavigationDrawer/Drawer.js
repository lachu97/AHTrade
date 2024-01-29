import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Drawer, Text} from 'react-native-paper';
const CollapDrawer = ({isDrawerVisible, closeDrawer}) => {
  return (
    <Drawer.Section>
      <Drawer.Item
        label="Item 1"
        onPress={() => {
          // Handle item 1 click
          closeDrawer();
        }}
      />
      <Drawer.Item
        label="Item 2"
        onPress={() => {
          // Handle item 2 click
          closeDrawer();
        }}
      />
      {/* Add more Drawer.Items as needed */}
    </Drawer.Section>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerContent: {
    flex: 1,
    padding: 16,
  },
});
export default React.memo(CollapDrawer);
