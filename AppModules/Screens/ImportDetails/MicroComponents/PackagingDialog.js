import React from 'react';
import {Text, Dialog, Chip, RadioButton, Button} from 'react-native-paper';
import {View} from 'react-native';

export const packagingItems = [
  '5 kgs',
  '10 kgs',
  '15 kgs',
  '20 kgs',
  '25 kgs',
  '50 kgs',
];

const PackagingDialog = ({isVisible, hideDialog, onDone}) => {
  const [value, setValue] = React.useState(packagingItems[0]);
  return (
    <Dialog visible={isVisible} onDismiss={hideDialog}>
      <Dialog.Title>Select Packaging </Dialog.Title>
      <Dialog.ScrollArea>
        <View style={{padding: 10}}>
          <RadioButton.Group
            onValueChange={value => setValue(value)}
            value={value}>
            {packagingItems.map((itm, idx) => (
              <RadioButton.Item key={idx} label={itm} value={itm} />
            ))}
          </RadioButton.Group>
        </View>
      </Dialog.ScrollArea>
      <Dialog.Actions>
        <Button
          onPress={() => {
            hideDialog();
            onDone(value);
          }}>
          Done
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};
export default React.memo(PackagingDialog);
