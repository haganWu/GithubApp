/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconTriangleDown = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M859.8528 292.9664H164.1472c-40.1408 0-60.3136 48.5376-31.8464 77.0048L480.1536 717.824c17.6128 17.6128 46.1824 17.6128 63.7952 0l347.8528-347.8528c28.3648-28.4672 8.2944-77.0048-31.9488-77.0048z"
        fill={getIconColor(color, 0, '#ffffff')}
      />
    </Svg>
  );
};

IconTriangleDown.defaultProps = {
  size: 18,
};

IconTriangleDown = React.memo ? React.memo(IconTriangleDown) : IconTriangleDown;

export default IconTriangleDown;
