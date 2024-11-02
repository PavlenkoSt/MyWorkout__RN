import React from 'react';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import Btn, {IBtnProps} from './Btn';
import {ColorVars} from '@app/utilts/theme';

interface IProps extends IBtnProps {
  color?: string;
}

export default function BtnGhost(props: IProps) {
  const color = props.color || EStyleSheet.value(ColorVars.$primaryColor);

  return (
    <Btn
      {...props}
      btnStyle={[
        {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: color,
        },
        props.btnStyle,
      ]}
      textStyle={[
        {
          color,
        },
        props.textStyle,
      ]}
    />
  );
}
