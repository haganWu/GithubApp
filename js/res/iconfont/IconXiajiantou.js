/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconXiajiantou = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M535.12 711.6L870.528 355.2a29.376 29.376 0 0 0 0-42.352 31.376 31.376 0 0 0-43.52 0l-315.2 334.912-315.2-334.912a31.376 31.376 0 0 0-43.52 0 29.376 29.376 0 0 0 0 42.352l335.408 356.4a36.272 36.272 0 0 0 46.624 0z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconXiajiantou.defaultProps = {
  size: 18,
};

IconXiajiantou = React.memo ? React.memo(IconXiajiantou) : IconXiajiantou;

export default IconXiajiantou;
