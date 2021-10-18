/**
 * @author HaganWu
 * @description DynamicTabNavigator
 * @fileName DynamicTabNavigator.js
 * @data 2021/10/14 14:08
 */
import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import PopularPage from "../page/PopularPage";
import TrendingPage from "../page/TrendingPage";
import FavoritePage from "../page/FavoritePage";
import MyPage from "../page/MyPage";
import {NavigationContainer} from "@react-navigation/native";
import {LogBox} from "react-native";
import IconFont from "../res/iconfont";


const Tab = createBottomTabNavigator();
type Props = {};

const TABS = {
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: '最热',
            headerShown: false,
            tabBarIcon: ({color, size}) => (
                <IconFont name={'hot'} color={color} size={size}/>
            ),
        },
    },
    TrendingPage: {
        screen: TrendingPage,
        navigationOptions: {
            tabBarLabel: '趋势',
            headerShown: false,
            tabBarIcon: ({color, size}) => (
                <IconFont name={'tendency'} color={color} size={size}/>
            ),
        },
    },
    FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarLabel: '收藏',
            headerShown: false,
            tabBarIcon: ({color, size}) => (
                <IconFont name={'collectionActive'} color={color} size={size}/>
            ),
        },
    },
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: '我的',
            headerShown: false,
            tabBarIcon: ({color, size}) => (
                <IconFont name={'mine'} color={color} size={size}/>
            ),
        },
    },
}

class DynamicTabNavigator extends React.Component<Props> {

    constructor(props) {
        super(props);
        LogBox.ignoreAllLogs(true);
    }

    _tabNavigator() {
        if (this.Tabs) {
            return this.Tabs;
        }
        const {PopularPage, TrendingPage, FavoritePage, MyPage} = TABS;
        const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage};
        //动态配置Tab属性
        PopularPage.navigationOptions.tabBarLabel = '最热';//动态配置Tab属性
        return this.Tabs =
            <NavigationContainer independent={true}>
                <Tab.Navigator
                    tabBarOptions={{
                        activeTintColor: "#DC971D",
                        inactiveTintColor: "gray",
                    }}
                >
                    {
                        Object.entries(tabs).map(item => {
                            return <Tab.Screen
                                name={item[0]}
                                component={item[1].screen}
                                options={item[1].navigationOptions}/>
                        })
                    }
                </Tab.Navigator>
            </NavigationContainer>
    }

    render() {
        return this._tabNavigator();
    }
}

// class TabBarComponent extends React.Component {
//     constructor(props) {
//         super(props);
//         this.theme = {
//             tintColor: props.activeTintColor,
//             updateTime: new Date().getTime(),
//         };
//     }
//
//     render() {
//         return <BottomTabBar
//             activeTintColor={"#ff562a"}
//         />;
//     }
// }

export default DynamicTabNavigator;
