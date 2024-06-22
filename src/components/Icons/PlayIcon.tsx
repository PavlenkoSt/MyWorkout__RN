import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const PlayIcon = (props: SvgProps) => {
  return (
    <Svg width={40} height={40} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M21.409 9.353a2.998 2.998 0 010 5.294L8.597 21.614C6.534 22.736 4 21.276 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648l12.812 6.968z"
        fill={props.color}
      />
    </Svg>
  );
};

export default PlayIcon;
