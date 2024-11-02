import React, {ElementType} from 'react';
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

export default function Popover({Content, Trigger}: IProps) {
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
}
