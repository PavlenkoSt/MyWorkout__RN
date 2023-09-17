import React, {ElementType, FC} from 'react';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';

interface IProps {
  Trigger: ElementType;
  Content: ElementType;
}

const Popover: FC<IProps> = ({Content, Trigger}) => {
  return (
    <Menu
      renderer={renderers.Popover}
      rendererProps={{
        preferredPlacement: 'top',
        placement: 'top',
      }}>
      <MenuTrigger>
        <Trigger />
      </MenuTrigger>
      <MenuOptions>
        <Content />
      </MenuOptions>
    </Menu>
  );
};

export default Popover;
