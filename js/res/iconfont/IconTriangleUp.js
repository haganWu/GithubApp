/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconTriangleUp = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M149.5 682.3l355-355c4.7-4.7 12.3-4.7 17 0l355 355c7.6 7.6 2.2 20.5-8.5 20.5H158c-10.7 0-16.1-12.9-8.5-20.5z"
        fill={getIconColor(color, 0, '#ffffff')}
      />
    </Svg>
  );
};

IconTriangleUp.defaultProps = {
  size: 18,
};

IconTriangleUp = React.memo ? React.memo(IconTriangleUp) : IconTriangleUp;

export default IconTriangleUp;
