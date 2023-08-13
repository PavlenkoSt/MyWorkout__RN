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
}

interface IProps {
  actions: IAction[];
  children: React.ReactNode;
}

const ContextMenu: FC<IProps> = ({actions, children}) => {
  return (
    <Menu>
      <MenuTrigger>{children}</MenuTrigger>
      <MenuOptions>
        {actions.map((action, idx) => (
          <MenuOption
            style={styles.option}
            key={idx}
            onSelect={action.action}
            customStyles={{
              optionText: styles.optionText,
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
