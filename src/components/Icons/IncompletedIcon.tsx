import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const IncompletedIcon = (props: any) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="48px"
      height="48px"
      {...props}>
      <Path
        fill="#F44336"
        d="M36.021 8.444l3.536 3.536L11.98 39.557 8.443 36.02z"
      />
      <Path
        fill="#F44336"
        d="M39.555 36.023l-3.536 3.535L8.445 11.976l3.536-3.535z"
      />
    </Svg>
  );
};

export default IncompletedIcon;
