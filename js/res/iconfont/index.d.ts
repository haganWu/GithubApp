/* eslint-disable */

import { FunctionComponent } from 'react';
// Don't forget to install package: @types/react-native
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';

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

interface Props extends GProps, ViewProps {
  name: 'Search' | 'yigouxuan' | 'weigouxuan' | 'qqqun' | 'lianxifangshi' | 'Computer' | 'xiajiantou' | 'shangjiantou' | 'paixu' | 'youjiantou' | 'fenxiang' | 'zuozhe' | 'guanyu' | 'wentifankui' | 'zidingyizhuti' | 'jiaocheng' | 'gouxuan' | 'yichu' | 'share' | 'back' | 'triangle-down' | 'triangle-up' | 'collection-selected' | 'collection' | 'welcome' | 'github1' | 'tendency' | 'hot' | 'mine' | 'collectionActive' | 'github';
  size?: number;
  color?: string | string[];
}

declare const IconFont: FunctionComponent<Props>;

export default IconFont;
