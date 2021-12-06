/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconYoujiantou = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M711.6 488.624L355.2 152.976a29.36 29.36 0 0 0-42.352 0 31.408 31.408 0 0 0 0 43.552L647.76 512 312.848 827.36a31.408 31.408 0 0 0 0 43.552 29.36 29.36 0 0 0 42.352 0l356.4-335.648a36.32 36.32 0 0 0 0-46.64z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconYoujiantou.defaultProps = {
  size: 18,
};

IconYoujiantou = React.memo ? React.memo(IconYoujiantou) : IconYoujiantou;

export default IconYoujiantou;
