import React from 'react';
import {Text, Dialog, Chip, Button} from 'react-native-paper';
import {View} from 'react-native';

export const paymentTypes = [
  {name: 'L/C', id: 'lc'},
  {name: 'Advance Payment', id: 'ap'},
  {name: 'Advance + L/C', id: 'al'},
  {name: 'Advance + D/A', id: 'ad'},
];
const PaymentDialog = ({isVisible, hideDialog, onChipPress, selected}) => {
  return (
    <Dialog visible={isVisible} onDismiss={hideDialog}>
      <Dialog.Title>Select Payment Term</Dialog.Title>
      <Dialog.Content>
        {paymentTypes.map((itm, idx) => {
          return (
            <View key={idx}>
              <Chip
                icon={itm.name === selected.name ? 'check-decagram' : null}
                style={{margin: 5}}
                onPress={() => {
                  onChipPress(itm);
                  setTimeout(() => {
                    hideDialog();
                  }, 250);
                }}>
                {itm.name}
              </Chip>
            </View>
          );
        })}
      </Dialog.Content>
    </Dialog>
  );
};
export default React.memo(PaymentDialog);
