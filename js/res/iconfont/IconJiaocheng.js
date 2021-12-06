/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconJiaocheng = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1376 1024" width={size} height={size} {...rest}>
      <Path
        d="M542.206157 930.292953q-3.327704 0-6.766331-0.197198c-22.332588-1.232483-45.700462-8.22066-72.716485-16.293422-100.163877-29.789109-139.147308-26.707902-170.440046-24.193638-46.341353 3.697448-83.439085 14.469348-116.186153 23.934816-51.037113 14.789794-95.110697 27.521341-133.576486-6.162414C17.057562 885.097808 2.760761 849.096986 0.02465 800.364616V169.025304c0-82.958417 62.228056-150.584748 139.147307-151.804906a993.578331 993.578331 0 0 1 368.364459 0 137.939475 137.939475 0 0 1 98.278178 45.219793c26.338157 28.66755 40.84448 66.554071 40.84448 106.585113V799.193758c-2.85936 48.153103-17.143836 84.326473-42.471357 107.534124-17.353358 15.825079-37.664674 23.565071-61.98156 23.565071z m-221.095089-84.979689c62.856623 0 112.673577 14.863743 153.900127 27.114621 52.294245 15.590907 78.398231 22.18469 99.966679 2.464966 16.675492-15.282787 26.276533-41.411422 28.507327-77.646416V169.025304c0-29.222167-10.463779-56.694209-29.468663-77.39992a95.825537 95.825537 0 0 0-68.723241-31.280413h-1.996622l-1.959648-0.369745a950.515382 950.515382 0 0 0-356.027305 0l-1.996622 0.382069h-2.033597c-25.734241 0-50.112751 11.092345-68.649292 31.292739-19.004885 20.681061-29.468664 48.165428-29.468663 77.399919v629.539888c2.11987 36.395217 11.474415 62.092483 27.792487 76.413933 9.391519 8.22066 19.534852 11.375816 33.905601 10.562378 16.022276-0.912037 36.087096-6.704706 59.270098-13.409413 32.98124-9.551742 74.035242-21.432876 124.714934-25.500069 11.10467-0.936687 21.864245-1.343406 32.2664-1.343406z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M1145.642059 930.292953q-3.327704 0-6.766331-0.197198c-22.332588-1.232483-45.700462-8.22066-72.716485-16.293422-100.126902-29.789109-139.085684-26.707902-170.390746-24.193638-46.341353 3.697448-83.439085 14.469348-116.186154 23.934816-51.037113 14.789794-95.123022 27.521341-133.576485-6.162414-25.463095-22.283289-39.759895-58.284111-42.496007-107.016481l43.075274-2.464965c2.058246 36.715663 11.425116 62.610126 27.829461 76.96855 9.391519 8.22066 19.522527 11.375816 33.905602 10.562378 16.022276-0.912037 36.087096-6.704706 59.270098-13.409413 32.95659-9.453143 74.035242-21.284978 124.714934-25.40147 78.311957-6.297987 138.124347 11.536039 186.166526 25.882138 52.294245 15.590907 78.398231 22.18469 99.96668 2.464966 16.675492-15.282787 26.276533-41.411422 28.507327-77.646416V169.025304c0-29.222167-10.463779-56.694209-29.480988-77.39992a95.825537 95.825537 0 0 0-68.723241-31.280413h-1.996622l-1.959648-0.369745a950.515382 950.515382 0 0 0-356.027305 0l-1.996623 0.382069h-2.033596c-25.734241 0-50.112751 11.092345-68.649292 31.292739-19.004885 20.681061-29.468664 48.165428-29.468664 77.399919h-43.136897c0-82.958417 62.228056-150.584748 139.147307-151.804906a993.590656 993.590656 0 0 1 368.364459 0 137.92715 137.92715 0 0 1 98.253528 45.207469c26.338157 28.66755 40.84448 66.554071 40.84448 106.585112V799.193758c-2.85936 48.153103-17.143836 84.326473-42.471357 107.534124-17.304058 15.825079-37.60305 23.565071-61.969235 23.565071zM164.8076 214.097199h344.146171v43.136898H164.8076zM164.8076 361.26797h344.146171v43.136898H164.8076zM164.8076 508.438741h249.861237v43.136898H164.8076z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M767.479362 214.097199h344.146172v43.136898H767.479362zM767.479362 361.26797h344.146172v43.136898H767.479362zM981.980668 578.480738h181.680289v43.136898H981.980668z"
        fill={getIconColor(color, 2, '#333333')}
      />
      <Path
        d="M1051.246201 509.215205h43.136898v181.680289h-43.136898z"
        fill={getIconColor(color, 3, '#333333')}
      />
    </Svg>
  );
};

IconJiaocheng.defaultProps = {
  size: 18,
};

IconJiaocheng = React.memo ? React.memo(IconJiaocheng) : IconJiaocheng;

export default IconJiaocheng;
