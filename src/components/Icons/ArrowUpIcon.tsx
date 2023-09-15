import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const ArrowUpIcon = (props: any) => {
  return (
    <Svg
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M12 6v12m0-12l-5 5m5-5l5 5"
        stroke={props.stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ArrowUpIcon;
