/* eslint-disable */

import React from 'react';

import IconTriangleDown from './IconTriangleDown';
import IconTriangleUp from './IconTriangleUp';
import IconCollection from './IconCollection';
import IconWelcome from './IconWelcome';
import IconGithub1 from './IconGithub1';
import IconTendency from './IconTendency';
import IconHot from './IconHot';
import IconMine from './IconMine';
import IconCollectionActive from './IconCollectionActive';
import IconGithub from './IconGithub';
export { default as IconTriangleDown } from './IconTriangleDown';
export { default as IconTriangleUp } from './IconTriangleUp';
export { default as IconCollection } from './IconCollection';
export { default as IconWelcome } from './IconWelcome';
export { default as IconGithub1 } from './IconGithub1';
export { default as IconTendency } from './IconTendency';
export { default as IconHot } from './IconHot';
export { default as IconMine } from './IconMine';
export { default as IconCollectionActive } from './IconCollectionActive';
export { default as IconGithub } from './IconGithub';

let IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'triangle-down':
      return <IconTriangleDown key="1" {...rest} />;
    case 'triangle-up':
      return <IconTriangleUp key="2" {...rest} />;
    case 'collection':
      return <IconCollection key="3" {...rest} />;
    case 'welcome':
      return <IconWelcome key="4" {...rest} />;
    case 'github1':
      return <IconGithub1 key="5" {...rest} />;
    case 'tendency':
      return <IconTendency key="6" {...rest} />;
    case 'hot':
      return <IconHot key="7" {...rest} />;
    case 'mine':
      return <IconMine key="8" {...rest} />;
    case 'collectionActive':
      return <IconCollectionActive key="9" {...rest} />;
    case 'github':
      return <IconGithub key="10" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
