import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const CompletedIcon = (props: any) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width="16px"
      height="16px"
      baseProfile="basic"
      {...props}>
      <Path
        fill="#00b569"
        d="M5.857 14.844L0.172 9.032 3.031 6.235 5.888 9.156 12.984 2.06 15.812 4.888z"
      />
    </Svg>
  );
};

export default CompletedIcon;
