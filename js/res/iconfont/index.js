/* eslint-disable */

import React from 'react';

import IconWelcome from './IconWelcome';
import IconGithub1 from './IconGithub1';
import IconTendency from './IconTendency';
import IconHot from './IconHot';
import IconMine from './IconMine';
import IconCollectionActive from './IconCollectionActive';
import IconGithub from './IconGithub';
export { default as IconWelcome } from './IconWelcome';
export { default as IconGithub1 } from './IconGithub1';
export { default as IconTendency } from './IconTendency';
export { default as IconHot } from './IconHot';
export { default as IconMine } from './IconMine';
export { default as IconCollectionActive } from './IconCollectionActive';
export { default as IconGithub } from './IconGithub';

let IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'welcome':
      return <IconWelcome key="1" {...rest} />;
    case 'github1':
      return <IconGithub1 key="2" {...rest} />;
    case 'tendency':
      return <IconTendency key="3" {...rest} />;
    case 'hot':
      return <IconHot key="4" {...rest} />;
    case 'mine':
      return <IconMine key="5" {...rest} />;
    case 'collectionActive':
      return <IconCollectionActive key="6" {...rest} />;
    case 'github':
      return <IconGithub key="7" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
