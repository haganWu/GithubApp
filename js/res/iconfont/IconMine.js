/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconMine = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M860.424 903.415H163.673c-43.608 0-34.051-68.072-34.051-68.072-1.047-41.48 34.051-68.071 34.051-68.071s178.688-86.152 204.214-102.107c20.774-12.996 30.149-38.391 32.973-47.464-60.643-56.67-118.06-151.166-118.06-207.803v-85.09c-2.127-100.045 108.438-204.213 204.213-204.213h34.037c89.375-1.065 207.405 99.912 204.197 204.214v85.089c0 46.499-38.938 147.278-101.542 207.24 2.594 8.575 11.916 34.766 33.055 48.028 25.461 15.955 203.666 102.107 203.666 102.107s35.017 26.59 33.953 68.071c-0.002 0 9.538 68.07-33.955 68.07z m-33.935-102.107L622.824 699.201s-50.904-22.335-50.904-68.072l0.182-0.066v-32.705c67.19-40.185 102.107-147.678 102.107-202.753V312.71c0-76.48-85.82-141.062-157.084-141.062h-26.19c-67.872 0-157.083 66.476-157.083 141.062v82.896c0 68.869 62.355 171.108 119.109 206.175v29.35c0 45.735-51.037 68.07-51.037 68.07L197.71 801.309c-24.463 20.208-17.017 51.055-17.017 51.055H843.459c-0.001-0.001 7.426-30.847-16.97-51.055z"
        fill={getIconColor(color, 0, '#f86442')}
      />
    </Svg>
  );
};

IconMine.defaultProps = {
  size: 18,
};

IconMine = React.memo ? React.memo(IconMine) : IconMine;

export default IconMine;
