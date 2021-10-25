/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconTendency = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M132.352 527.552L427.072 266.24a12.8 12.8 0 0 1 17.28 0.256L605.44 419.136a12.8 12.8 0 0 0 18.368-0.768l160.448-180.096-39.872-40.512a12.8 12.8 0 0 1 9.088-21.76H896v130.88a12.8 12.8 0 0 1-21.824 9.024l-38.72-38.4L624 524.352a12.8 12.8 0 0 1-18.752 0.768L442.56 363.776a12.8 12.8 0 0 0-17.6-0.448L177.6 585.472a12.8 12.8 0 0 1-18.88-1.92L130.56 544.64a12.8 12.8 0 0 1 1.856-17.152z m55.488 128.448h64.64a32 32 0 0 1 32 32v128a32 32 0 0 1-32 32h-64.64a32 32 0 0 1-32-32v-128a32 32 0 0 1 32-32z m193.088-128h64.704a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H380.928a32 32 0 0 1-32-32v-256a32 32 0 0 1 32-32z m193.088 64H638.72a32 32 0 0 1 32 32v192a32 32 0 0 1-32 32H574.08a32 32 0 0 1-32-32v-192a32 32 0 0 1 32-32z m193.088-128h64.704a32 32 0 0 1 32 32v320a32 32 0 0 1-32 32h-64.704a32 32 0 0 1-32-32v-320a32 32 0 0 1 32-32z"
        fill={getIconColor(color, 0, '#f86442')}
      />
    </Svg>
  );
};

IconTendency.defaultProps = {
  size: 18,
};

IconTendency = React.memo ? React.memo(IconTendency) : IconTendency;

export default IconTendency;
