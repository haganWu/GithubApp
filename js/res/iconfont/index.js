/* eslint-disable */

import React from 'react';

import IconPush from './IconPush';
import IconSearch from './IconSearch';
import IconYigouxuan from './IconYigouxuan';
import IconWeigouxuan from './IconWeigouxuan';
import IconQqqun from './IconQqqun';
import IconLianxifangshi from './IconLianxifangshi';
import IconComputer from './IconComputer';
import IconXiajiantou from './IconXiajiantou';
import IconShangjiantou from './IconShangjiantou';
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
export { default as IconPush } from './IconPush';
export { default as IconSearch } from './IconSearch';
export { default as IconYigouxuan } from './IconYigouxuan';
export { default as IconWeigouxuan } from './IconWeigouxuan';
export { default as IconQqqun } from './IconQqqun';
export { default as IconLianxifangshi } from './IconLianxifangshi';
export { default as IconComputer } from './IconComputer';
export { default as IconXiajiantou } from './IconXiajiantou';
export { default as IconShangjiantou } from './IconShangjiantou';
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
    case 'push':
      return <IconPush key="1" {...rest} />;
    case 'Search':
      return <IconSearch key="2" {...rest} />;
    case 'yigouxuan':
      return <IconYigouxuan key="3" {...rest} />;
    case 'weigouxuan':
      return <IconWeigouxuan key="4" {...rest} />;
    case 'qqqun':
      return <IconQqqun key="5" {...rest} />;
    case 'lianxifangshi':
      return <IconLianxifangshi key="6" {...rest} />;
    case 'Computer':
      return <IconComputer key="7" {...rest} />;
    case 'xiajiantou':
      return <IconXiajiantou key="8" {...rest} />;
    case 'shangjiantou':
      return <IconShangjiantou key="9" {...rest} />;
    case 'paixu':
      return <IconPaixu key="10" {...rest} />;
    case 'youjiantou':
      return <IconYoujiantou key="11" {...rest} />;
    case 'fenxiang':
      return <IconFenxiang key="12" {...rest} />;
    case 'zuozhe':
      return <IconZuozhe key="13" {...rest} />;
    case 'guanyu':
      return <IconGuanyu key="14" {...rest} />;
    case 'wentifankui':
      return <IconWentifankui key="15" {...rest} />;
    case 'zidingyizhuti':
      return <IconZidingyizhuti key="16" {...rest} />;
    case 'jiaocheng':
      return <IconJiaocheng key="17" {...rest} />;
    case 'gouxuan':
      return <IconGouxuan key="18" {...rest} />;
    case 'yichu':
      return <IconYichu key="19" {...rest} />;
    case 'share':
      return <IconShare key="20" {...rest} />;
    case 'back':
      return <IconBack key="21" {...rest} />;
    case 'triangle-down':
      return <IconTriangleDown key="22" {...rest} />;
    case 'triangle-up':
      return <IconTriangleUp key="23" {...rest} />;
    case 'collection-selected':
      return <IconCollectionSelected key="24" {...rest} />;
    case 'collection':
      return <IconCollection key="25" {...rest} />;
    case 'welcome':
      return <IconWelcome key="26" {...rest} />;
    case 'github1':
      return <IconGithub1 key="27" {...rest} />;
    case 'tendency':
      return <IconTendency key="28" {...rest} />;
    case 'hot':
      return <IconHot key="29" {...rest} />;
    case 'mine':
      return <IconMine key="30" {...rest} />;
    case 'collectionActive':
      return <IconCollectionActive key="31" {...rest} />;
    case 'github':
      return <IconGithub key="32" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
