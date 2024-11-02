import React from 'react';
import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import SelectDropdown from 'react-native-select-dropdown';

import ArrowUpIcon from '../Icons/ArrowUpIcon';
import {ColorVars} from '@app/utilts/theme';

interface IProps {
  data: any[];
  defaultValue: any;
  onSelect: (selectedItem: any, index: number) => void;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  arrowColor?: string;
}

export default function Dropdown({
  data,
  defaultValue,
  onSelect,
  buttonStyle,
  buttonTextStyle,
  arrowColor,
}: IProps) {
  return (
    <SelectDropdown
      data={data}
      onSelect={onSelect}
      defaultValue={defaultValue}
      buttonStyle={[styles.buttonStyle, buttonStyle]}
      buttonTextStyle={[styles.buttonText, buttonTextStyle]}
      dropdownStyle={styles.dropdownStyle}
      rowTextStyle={styles.rowTextStyles}
      rowStyle={styles.rowStyle}
      dropdownIconPosition="right"
      renderDropdownIcon={() => (
        <View style={styles.arrowContainer}>
          <ArrowUpIcon
            stroke={arrowColor || EStyleSheet.value(ColorVars.$white)}
          />
        </View>
      )}
    />
  );
}

const styles = EStyleSheet.create({
  buttonStyle: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    height: 40,
    width: '100%',
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
  },
  dropdownStyle: {
    backgroundColor: '#333',
  },
  rowStyle: {
    height: 40,
    borderBottomWidth: 0,
  },
  rowTextStyles: {
    fontSize: 15,
    color: '#fff',
  },
  arrowContainer: {
    transform: [{rotate: '180deg'}],
  },
});
