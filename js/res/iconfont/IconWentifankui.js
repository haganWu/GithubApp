/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconWentifankui = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M285.7472 963.2768A51.3024 51.3024 0 0 1 204.8 921.8048v-104.96H102.4c-28.2624 0-51.2-22.8864-51.2-51.0464V153.4464C51.2 125.2864 74.1376 102.4 102.4 102.4h819.2c28.2624 0 51.2 22.8352 51.2 51.0464v612.352c0 28.16-22.9376 50.9952-51.2 50.9952H491.52l-205.7728 146.4832zM921.6 153.6H102.4v611.9936h153.6V921.6l219.136-156.0064H921.6V153.6zM204.8 307.2h614.4v51.2H204.8V307.2z m0 204.8h307.2v51.2H204.8v-51.2z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconWentifankui.defaultProps = {
  size: 18,
};

IconWentifankui = React.memo ? React.memo(IconWentifankui) : IconWentifankui;

export default IconWentifankui;
