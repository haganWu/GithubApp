/* eslint-disable */

import React from 'react';

import IconPaixu from './IconPaixu';
import IconYoujiantou from './IconYoujiantou';
import IconFenxiang from './IconFenxiang';
import IconZuozhe from './IconZuozhe';
import IconGuanyu from './IconGuanyu';
import IconWentifankui from './IconWentifankui';
import IconZidingyizhuti from './IconZidingyizhuti';
import IconJiaocheng from './IconJiaocheng';
import IconGouxuan from './IconGouxuan';
import IconYichu from './IconYichu';
import IconShare from './IconShare';
import IconBack from './IconBack';
import IconTriangleDown from './IconTriangleDown';
import IconTriangleUp from './IconTriangleUp';
import IconCollectionSelected from './IconCollectionSelected';
import IconCollection from './IconCollection';
import IconWelcome from './IconWelcome';
import IconGithub1 from './IconGithub1';
import IconTendency from './IconTendency';
import IconHot from './IconHot';
import IconMine from './IconMine';
import IconCollectionActive from './IconCollectionActive';
import IconGithub from './IconGithub';
export { default as IconPaixu } from './IconPaixu';
export { default as IconYoujiantou } from './IconYoujiantou';
export { default as IconFenxiang } from './IconFenxiang';
export { default as IconZuozhe } from './IconZuozhe';
export { default as IconGuanyu } from './IconGuanyu';
export { default as IconWentifankui } from './IconWentifankui';
export { default as IconZidingyizhuti } from './IconZidingyizhuti';
export { default as IconJiaocheng } from './IconJiaocheng';
export { default as IconGouxuan } from './IconGouxuan';
export { default as IconYichu } from './IconYichu';
export { default as IconShare } from './IconShare';
export { default as IconBack } from './IconBack';
export { default as IconTriangleDown } from './IconTriangleDown';
export { default as IconTriangleUp } from './IconTriangleUp';
export { default as IconCollectionSelected } from './IconCollectionSelected';
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
    case 'paixu':
      return <IconPaixu key="1" {...rest} />;
    case 'youjiantou':
      return <IconYoujiantou key="2" {...rest} />;
    case 'fenxiang':
      return <IconFenxiang key="3" {...rest} />;
    case 'zuozhe':
      return <IconZuozhe key="4" {...rest} />;
    case 'guanyu':
      return <IconGuanyu key="5" {...rest} />;
    case 'wentifankui':
      return <IconWentifankui key="6" {...rest} />;
    case 'zidingyizhuti':
      return <IconZidingyizhuti key="7" {...rest} />;
    case 'jiaocheng':
      return <IconJiaocheng key="8" {...rest} />;
    case 'gouxuan':
      return <IconGouxuan key="9" {...rest} />;
    case 'yichu':
      return <IconYichu key="10" {...rest} />;
    case 'share':
      return <IconShare key="11" {...rest} />;
    case 'back':
      return <IconBack key="12" {...rest} />;
    case 'triangle-down':
      return <IconTriangleDown key="13" {...rest} />;
    case 'triangle-up':
      return <IconTriangleUp key="14" {...rest} />;
    case 'collection-selected':
      return <IconCollectionSelected key="15" {...rest} />;
    case 'collection':
      return <IconCollection key="16" {...rest} />;
    case 'welcome':
      return <IconWelcome key="17" {...rest} />;
    case 'github1':
      return <IconGithub1 key="18" {...rest} />;
    case 'tendency':
      return <IconTendency key="19" {...rest} />;
    case 'hot':
      return <IconHot key="20" {...rest} />;
    case 'mine':
      return <IconMine key="21" {...rest} />;
    case 'collectionActive':
      return <IconCollectionActive key="22" {...rest} />;
    case 'github':
      return <IconGithub key="23" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
