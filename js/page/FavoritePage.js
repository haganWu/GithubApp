/**
 * @author HaganWu
 * @description FavoritePage
 * @fileName FavoritePage.js
 * @data 2021/10/14 14:04
 */
import React from "react";
import {Component} from "react";
import {FlatList, RefreshControl, StyleSheet, View} from "react-native";
import {connect} from "react-redux";
import actions from "../action"
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import NavigationUtil from "../navigator/NavigationUtil";
import {FLAG_STORAGE} from "../expand/dao/DataStore";
import FavoriteUtil from "../util/FavoriteUtil";
import Toast from "react-native-easy-toast";
import NavigationBar from "../common/NavigationBar";
import {NavigationContainer} from "@react-navigation/native";
import FavoriteDao from "../expand/dao/FavoriteDao";
import {screenWidth} from "../util/DisplayUtils";
import FavoriteItem from "../common/FavoriteItem";


const Theme_COLOR = '#7dc5eb';
type Props = {}
const Tab = createMaterialTopTabNavigator();


class FavoritePage extends Component<Props> {


    constructor(props) {
        super(props);
        this.tabNames = ["最热", "趋势"];
    }

    _genTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <FavoriteTabPage {...props} tabLabel={item}/>,
                navigationOptions: {
                    title: item,
                },
            }
        });
        return tabs;
    }

    render() {
        let statusBar = {
            backgroundColor: Theme_COLOR,
            barStyle: "light-content",
        }
        let navigationBar =
            <NavigationBar
                title={'收藏'}
                statusBar={statusBar}
                style={{backgroundColor: Theme_COLOR}}
            />
        let TabNavigator = <NavigationContainer independent={true}>
            <Tab.Navigator
                screenOptions={
                    {
                        tabBarItemStyle: styles.tabStyle,
                        tabBarScrollEnabled: false,
                        tabBarActiveTintColor: "#DC971D",
                        tabBarInactiveTintColor: "white",
                        tabBarStyle: {
                            backgroundColor: "#7dc5eb",//TabBar 的背景颜色
                        },
                        tabBarIndicatorStyle: styles.indicatorStyle,//标签指示器的样式
                        tabBarLabelStyle: styles.labelStyle,
                    }
                }
            >
                {
                    Object.entries(this._genTabs()).map(item => {
                        return <Tab.Screen
                            name={item[0]}
                            component={item[1].screen}
                            options={item[1].navigationOptions}
                        />
                    })
                }
            </Tab.Navigator>
        </NavigationContainer>

        return (
            <View style={styles.container}>
                {navigationBar}
                {TabNavigator}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabStyle: {
        width: screenWidth / 2,
        padding: 0,
    },
    indicatorStyle: {//指示器样式
        height: 4,
        width: 20,
        marginLeft: (screenWidth / 2 - 20) / 2,
        borderRadius: 2,
        backgroundColor: "#DC971D",
    },
    labelStyle: {
        fontSize: 18,
        margin: 0,
        textTransform: "lowercase",//设置Tab标题字母小写
    },
    popularTabContainer: {
        flex: 1,
        backgroundColor: '#e3e3e3',
        paddingBottom: 10,
    },
    indicatorContainer: {
        alignItems: "center",
        flex: 1,
        justifyContent: 'center',
    },
    indicator: {
        padding: 4,
        marginTop: 2,
    },
});
export default FavoritePage;

class FavoriteTab extends Component<Props> {


    constructor(props) {
        super(props);
        const {tabLabel} = this.props;
        this.storeName = this.getStoreName(tabLabel);
        console.log(`tabLabel:=====${tabLabel}`);
        this.favoriteDao = new FavoriteDao(tabLabel);
    }

    componentDidMount() {
        this.loadData();
    }

    getStoreName(tabLabel) {
        switch (tabLabel) {
            case "最热":
                return FLAG_STORAGE.flag_popular;
            case "趋势":
                return FLAG_STORAGE.flag_trending;
        }
    }

    loadData() {
        const {onLoadFavoriteData} = this.props;
        onLoadFavoriteData(this.storeName, true);
    }


    renderItem(data) {
        const item = data.item;
        return (
            <FavoriteItem
                flag={this.storeName}
                projectModel={item}
                onSelect={(callback) => {
                    //导航传值
                    NavigationUtil.goPage({
                        projectModel: item,
                        flag: this.storeName,
                        callback: callback,
                    }, "DetailPage");
                }}
                onFavorite={(item, isFavorite) => {
                    console.log(`FP点击收藏：isFavorite:${isFavorite}`);
                    FavoriteUtil.onFavorite(this.favoriteDao, item, isFavorite);
                }}
            />
        );
    }

    _store() {
        const {favorite} = this.props;
        let store = favorite[this.storeName];//动态获取state
        if (!store) {
            store = {
                isLoading: false,
                projectModes: [],//要显式的数据
            }
        }
        return store;
    }

    render() {
        let store = this._store();
        return (
            <View style={styles.popularTabContainer}>
                <FlatList
                    data={store.projectModes}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => "" + item.item.id}
                    refreshControl={
                        <RefreshControl
                            title={'loading'}
                            titleColor={Theme_COLOR}
                            colors={[Theme_COLOR]}
                            onRefresh={() => this.loadData(true)}
                            tintColor={Theme_COLOR}
                            refreshing={store.isLoading}/>
                    }
                />
                <Toast
                    ref={'toast'}
                    position={'center'}
                />
            </View>
        );
    }

}

/**
 * 将state中相关数据订阅到props中，在页面中通过this.props去除请求结果数据
 */
const mapStateToProps = state => ({
    favorite: state.favorite,
})

/**
 * 发送action，将action创建函数和props进行关联，在页面中通过this.props取出创建函数发送action进行数据加载请求
 * @param dispatch
 * @returns {{onLoadPopularData: (function(*=, *=): *)}}
 */
const mapDispatchToProps = dispatch => ({
    onLoadFavoriteData: (flag, isShowLoading) => dispatch(actions.onLoadFavoriteData(flag, isShowLoading)),
})
//connect只是一个function，并不一定非要放在export default 后面。
const FavoriteTabPage = connect(mapStateToProps, mapDispatchToProps)(FavoriteTab);
