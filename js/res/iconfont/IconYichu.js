/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconYichu = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M161.643355 545.032258h700.71329a33.032258 33.032258 0 0 0 0-66.064516H161.643355a33.032258 33.032258 0 0 0 0 66.064516z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconYichu.defaultProps = {
  size: 18,
};

IconYichu = React.memo ? React.memo(IconYichu) : IconYichu;

export default IconYichu;
