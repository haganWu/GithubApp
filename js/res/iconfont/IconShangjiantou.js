/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconShangjiantou = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M139.636364 733.090909a35.141818 35.141818 0 0 1-24.669091-10.24 34.676364 34.676364 0 0 1 0-49.338182l372.363636-372.363636a34.909091 34.909091 0 0 1 49.338182 49.338182l-372.363636 372.363636A35.141818 35.141818 0 0 1 139.636364 733.090909z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M884.363636 733.090909a35.141818 35.141818 0 0 1-24.669091-10.24l-372.363636-372.363636a34.909091 34.909091 0 0 1 49.338182-49.338182l372.363636 372.363636a34.676364 34.676364 0 0 1 0 49.338182 35.141818 35.141818 0 0 1-24.669091 10.24z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconShangjiantou.defaultProps = {
  size: 18,
};

IconShangjiantou = React.memo ? React.memo(IconShangjiantou) : IconShangjiantou;

export default IconShangjiantou;
