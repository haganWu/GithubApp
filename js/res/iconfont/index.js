/* eslint-disable */

import React from 'react';

import IconWelcome from './IconWelcome';
import IconTendency from './IconTendency';
import IconHot from './IconHot';
import IconMine from './IconMine';
import IconCollectionActive from './IconCollectionActive';
import IconGithub from './IconGithub';
export { default as IconWelcome } from './IconWelcome';
export { default as IconTendency } from './IconTendency';
export { default as IconHot } from './IconHot';
export { default as IconMine } from './IconMine';
export { default as IconCollectionActive } from './IconCollectionActive';
export { default as IconGithub } from './IconGithub';

let IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'welcome':
      return <IconWelcome key="1" {...rest} />;
    case 'tendency':
      return <IconTendency key="2" {...rest} />;
    case 'hot':
      return <IconHot key="3" {...rest} />;
    case 'mine':
      return <IconMine key="4" {...rest} />;
    case 'collectionActive':
      return <IconCollectionActive key="5" {...rest} />;
    case 'github':
      return <IconGithub key="6" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
