import React, {FC} from 'react';
import {Text} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import SelectDropdown from 'react-native-select-dropdown';

interface IProps {
  data: any[];
  defaultValue: any;
  onSelect: (selectedItem: any, index: number) => void;
}

const Dropdown: FC<IProps> = ({data, defaultValue, onSelect}) => {
  return (
    <SelectDropdown
      data={data}
      onSelect={onSelect}
      defaultValue={defaultValue}
      buttonStyle={styles.buttonStyle}
      buttonTextStyle={styles.buttonText}
      dropdownStyle={styles.dropdownStyle}
      rowTextStyle={styles.rowTextStyles}
      rowStyle={styles.rowStyle}
      dropdownIconPosition="right"
      renderDropdownIcon={() => <Text style={styles.icon}>&#8964;</Text>}
    />
  );
};

export default Dropdown;

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
  icon: {
    fontSize: 20,
    top: -5,
  },
});
