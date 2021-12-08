/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconComputer = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M942.08 696.32H81.92V81.92h860.16zM122.88 655.36h778.24V122.88H122.88z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M491.52 675.84h40.96v163.84h-40.96zM204.8 860.16h614.4v40.96H204.8z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconComputer.defaultProps = {
  size: 18,
};

IconComputer = React.memo ? React.memo(IconComputer) : IconComputer;

export default IconComputer;
