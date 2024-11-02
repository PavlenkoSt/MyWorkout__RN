import React from 'react';
import {ViewStyle} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

interface IAction {
  text: string;
  action: () => void;
  danger?: boolean;
  disabled?: boolean;
}

interface IProps {
  actions: IAction[];
  children: React.ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
  triggerStyle?: ViewStyle;
}

export default function ContextMenu({
  actions,
  disabled,
  style,
  triggerStyle,
  children,
}: IProps) {
  return (
    <Menu style={style}>
      <MenuTrigger disabled={disabled} style={triggerStyle}>
        {children}
      </MenuTrigger>
      <MenuOptions>
        {actions.map((action, idx) => (
          <MenuOption
            style={styles.option}
            key={idx}
            onSelect={action.action}
            disabled={action.disabled}
            customStyles={{
              optionText: [
                styles.optionText,
                action.danger && {color: 'red'},
                action.disabled && {opacity: 0.5},
              ],
            }}
            text={action.text}
          />
        ))}
      </MenuOptions>
    </Menu>
  );
}

const styles = EStyleSheet.create({
  option: {
    backgroundColor: '#444',
    padding: 8,
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
  },
});
