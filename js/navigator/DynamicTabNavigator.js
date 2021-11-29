/**
 * @author HaganWu
 * @description DynamicTabNavigator
 * @fileName DynamicTabNavigator.js
 * @data 2021/10/14 14:08
 */
import React from "react";
import {BottomTabBar, createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import PopularPage from "../page/PopularPage";
import TrendingPage from "../page/TrendingPage";
import FavoritePage from "../page/FavoritePage";
import MyPage from "../page/MyPage";
import {NavigationContainer} from "@react-navigation/native";
import IconFont from "../res/iconfont";
import {connect} from "react-redux";
import EventBus from "react-native-event-bus";
import EventTypes from "../util/EventTypes";

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
        this.lastIndex = 0;
    }

    fireEvent(navigationState) {
        const {index} = navigationState;
        let fromIndex = this.lastIndex;
        console.log(`navigationState ->fromIndex:${fromIndex}, to:${index} `);
        EventBus.getInstance().fireEvent(EventTypes.bottom_tab_select, {
            from: fromIndex,
            to: index,
        });
        this.lastIndex = index;
    }

    _tabNavigator() {
        // if (this.Tabs) {
        //     console.log("返回  this.Tabs");
        //     return this.Tabs;
        // }
        const {PopularPage, TrendingPage, FavoritePage, MyPage} = TABS;
        const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage};
        //动态配置Tab属性
        PopularPage.navigationOptions.tabBarLabel = '最热';//动态配置Tab属性
        return <NavigationContainer independent={true}>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: this.props.theme,
                }}
                tabBar={props => {
                    this.fireEvent(props.state);
                    return <TabBarComponent theme={this.props.theme} {...props}/>
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


class TabBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime(),
        };
        // this.state = {
        //     theme: {
        //         tintColor: props.activeTintColor,
        //         updateTime: new Date().getTime(),
        //     }
        // };
    }

    render() {
        return <BottomTabBar
            {...this.props}
            activeTintColor={this.props.theme.themeColor}
        />;
    }
}


/**
 * 将store中的theme数据注入到当前页面的props里面
 */
const mapStateToProps = state => ({
    theme: state.theme.theme,
})

export default connect(mapStateToProps)(DynamicTabNavigator);
