import React, {FC} from 'react';
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
}

const ContextMenu: FC<IProps> = ({actions, disabled, children}) => {
  return (
    <Menu>
      <MenuTrigger disabled={disabled}>{children}</MenuTrigger>
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
};

export default ContextMenu;

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
