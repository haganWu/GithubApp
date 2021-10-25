/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconCollectionActive = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M688.694857 219.428571C803.163429 219.428571 896 311.131429 896 424.228571 896 611.163429 521.142857 859.428571 521.142857 859.428571S146.285714 620.105143 146.285714 424.228571C146.285714 283.428571 239.104 219.428571 353.572571 219.428571c68.937143 0 129.865143 33.408 167.552 84.553143A207.689143 207.689143 0 0 1 688.694857 219.428571z"
        fill={getIconColor(color, 0, '#f86442')}
      />
    </Svg>
  );
};

IconCollectionActive.defaultProps = {
  size: 18,
};

IconCollectionActive = React.memo ? React.memo(IconCollectionActive) : IconCollectionActive;

export default IconCollectionActive;
