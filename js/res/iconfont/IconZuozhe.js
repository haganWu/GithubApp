/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconZuozhe = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 1024C229.239467 1024 0 794.760533 0 512 0 229.239467 229.239467 0 512 0c282.760533 0 512 229.239467 512 512 0 282.760533-229.239467 512-512 512z m181.998933-400.042667l-119.5008-59.904 0.989867-1.4336 35.2256-51.4048a14.848 14.848 0 0 0 2.594133-8.362666v-83.831467c0-54.510933-43.554133-97.1776-99.191466-97.1776-55.637333 0-99.157333 42.666667-99.157334 97.1776v83.831467c0 3.072 0.955733 6.075733 2.730667 8.567466l37.239467 52.5312-124.7232 59.869867a14.779733 14.779733 0 0 0-8.362667 13.346133v53.248c0 8.157867 6.587733 14.779733 14.7456 14.779734h350.8224a14.779733 14.779733 0 0 0 14.7456-14.813867v-53.213867a14.813867 14.813867 0 0 0-8.157867-13.243733z"
        fill={getIconColor(color, 0, '#ADADB3')}
      />
    </Svg>
  );
};

IconZuozhe.defaultProps = {
  size: 18,
};

IconZuozhe = React.memo ? React.memo(IconZuozhe) : IconZuozhe;

export default IconZuozhe;
