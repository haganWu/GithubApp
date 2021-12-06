/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconGouxuan = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M571.84 661.12l-46.08 43.2-46.08-43.2-223.36-217.28 92.16-90.24 177.28 172.16 342.08-336L960 280zM640 192H128v640h640v-192h64v256H64V128h640v64h-64z"
        fill={getIconColor(color, 0, '#0590DF')}
      />
    </Svg>
  );
};

IconGouxuan.defaultProps = {
  size: 18,
};

IconGouxuan = React.memo ? React.memo(IconGouxuan) : IconGouxuan;

export default IconGouxuan;
