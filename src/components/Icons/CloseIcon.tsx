import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const CloseIcon = (props: any) => {
  return (
    <Svg
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.94 12l-3.97 3.97 1.06 1.06L12 13.06l3.97 3.97 1.06-1.06L13.06 12l3.97-3.97-1.06-1.06L12 10.94 8.03 6.97 6.97 8.03 10.94 12z"
        fill={props.fill}
      />
    </Svg>
  );
};

export default CloseIcon;
