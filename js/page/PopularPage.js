/**
 * @author HaganWu
 * @description PopularPage
 * @fileName PopularPage.js
 * @data 2021/10/14 14:04
 */
import React from "react";
import {Component} from "react";
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View} from "react-native";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {NavigationContainer} from "@react-navigation/native";
import actions from '../action/index'
import {connect} from "react-redux";
import PopularItem from "../common/PopularItem";
import Toast from 'react-native-easy-toast';
import NavigationBar from "../common/NavigationBar";
import NavigationUtil from "../navigator/NavigationUtil";
import FavoriteDao from "../expand/dao/FavoriteDao";
import {FLAG_STORAGE} from "../expand/dao/DataStore";
import FavoriteUtil from "../util/FavoriteUtil";
import EventBus from "react-native-event-bus";
import EventTypes from "../util/EventTypes";
import {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars'
const Theme_COLOR = '#7dc5eb';
const PAGE_SIZE = 10;
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);

type Props = {}
const Tab = createMaterialTopTabNavigator();

class PopularPage extends Component<Props> {

    constructor(props) {
        super(props);
        const {onLoadLanguage} = this.props;
        onLoadLanguage(FLAG_LANGUAGE.flag_key);
    }


    _genTabs() {
        const tabs = {};
        const {keys} = this.props;
        console.log(`PopularPage keys:${keys}`);
        keys.forEach((item, index) => {
            if (item.checked) {
                tabs[`tab${index}`] = {
                    screen: props => <PopularTabPage key={index} {...props} tabLabel={item.name}/>,
                    navigationOptions: {
                        title: item.name,
                    },
                }
            }

        });
        return tabs;
    }

    render() {
        const {keys} = this.props;

        let statusBar = {
            backgroundColor: Theme_COLOR,
            barStyle: "light-content",
        }
        let navigationBar =
            <NavigationBar
                title={'最热'}
                statusBar={statusBar}
                style={{backgroundColor: Theme_COLOR}}
            />
        let TabNavigator = keys.length ?
            <NavigationContainer independent={true}>
                <Tab.Navigator
                    // lazy={true}
                    screenOptions={
                        {
                            tabBarItemStyle: styles.tabStyle,
                            tabBarScrollEnabled: true,
                            tabBarActiveTintColor: "#DC971D",
                            // upperCaseLabel: false,
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
            </NavigationContainer> : null

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
    text: {
        fontSize: 22,
        color: "#7fb550",
    },
    tabStyle: {
        // minWidth: 50 //fix minWidth会导致tabStyle初次加载时闪烁
        width: 80,
        padding: 0,
    },
    indicatorStyle: {//指示器样式
        height: 4,
        width: 20,
        marginLeft: 30,
        borderRadius: 2,
        backgroundColor: "#DC971D",
    },
    labelStyle: {
        fontSize: 16,
        margin: 0,
        // textTransform: "lowercase",//设置Tab标题字母小写
        textTransform: "none"
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

const mapPopularStateToProps = state => ({
    keys: state.language.keys,
    // theme: state.theme.theme,
});
const mapPopularDispatchToProps = dispatch => ({
    onLoadLanguage: (flagKey) => dispatch(actions.onLoadLanguage(flagKey)),
})
export default connect(mapPopularStateToProps, mapPopularDispatchToProps)(PopularPage);

class PopularTab extends Component<Props> {
    constructor(props) {
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
        this.isFavoriteChange = false;
    }

    componentDidMount() {
        this.loadData(false);
        EventBus.getInstance().addListener(EventTypes.favorite_changed_popular, this.favoriteChangedListener = data => {
            console.log(`data:${data}`);
            this.isFavoriteChange = true;
        });
        EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.bottomTabSelectedListener = data => {
            if (data.to === 0 && this.isFavoriteChange) {
                this.loadData(false);
            }
        });
    }

    componentWillUnmount() {
        EventBus.getInstance().removeListener(this.favoriteChangedListener);
        EventBus.getInstance().removeListener(this.bottomTabSelectedListener);
    }

    loadData(loadMore, refreshFavoriteState) {
        const {onLoadPopularData, onLoadMorePopular, onFlushPopularFavoriteState} = this.props;
        const store = this._store();
        const url = this.genFetchUrl(this.storeName);
        if (loadMore) {
            onLoadMorePopular(this.storeName, ++store.pageIndex, PAGE_SIZE, store.items, favoriteDao, () => {
                this.refs.toast.show('没有更多了');
            });
        } else if (refreshFavoriteState) {
            console.log("refreshFavoriteState");
            onFlushPopularFavoriteState(this.storeName, url, PAGE_SIZE, store.items, favoriteDao);
        } else {
            onLoadPopularData(this.storeName, url, PAGE_SIZE, favoriteDao);
        }

    }

    /**
     * @description 获取与当前页面有关的数据
     * @author HaganWu
     * @data 2021/10/28  10:28
     */
    _store() {
        const {popular} = this.props;
        let store = popular[this.storeName];//动态获取state
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModes: [],//要显式的数据
                hideLoadingMore: true,//默认隐藏加载更多
            }
        }
        return store;
    }

    genFetchUrl(key) {
        return URL + key + QUERY_STR;
    }


    renderItem(data) {
        const item = data.item;
        return (
            <PopularItem
                projectModel={item}
                onSelect={(callback) => {
                    //导航传值
                    NavigationUtil.goPage({
                        projectModel: item,
                        flag: FLAG_STORAGE.flag_popular,
                        callback: callback,
                    }, "DetailPage");
                }}
                onFavorite={(item, isFavorite) => {
                    console.log(`popularPage collect click-> name:${item["full_name"].toString()}, key:${item.id.toString()}`);
                    FavoriteUtil.onFavorite(FLAG_STORAGE.flag_popular, favoriteDao, item, isFavorite)
                }}
            />
        );
    }

    genIndicator() {
        return this._store().hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                    size={"small"}
                    color={"#faa"}
                />
                <Text>正在加载更多...</Text>
            </View>
    }


    render() {
        let store = this._store();
        return (
            <View style={styles.popularTabContainer}>
                <FlatList
                    data={store.projectModes}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => "" + item.item.id + item.item["full_name"]}
                    refreshControl={
                        <RefreshControl
                            title={'loading'}
                            titleColor={Theme_COLOR}
                            colors={[Theme_COLOR]}
                            onRefresh={() => this.loadData(false)}
                            tintColor={Theme_COLOR}
                            refreshing={store.isLoading}/>
                    }
                    ListFooterComponent={() => this.genIndicator()}
                    onEndReached={() => {
                        //列表滚动到底部时回调
                        this.loadData(true);
                        // setTimeout(() => {//确保 onEndReached 在 onMomentumScrollBegin 之后执行
                        //     if (this.canLoadMore) {
                        //         this.loadData(true);
                        //         this.canLoadMore = false;
                        //     }
                        // }, 100);

                    }}
                    onEndReachedThreshold={0.5}
                    // onMomentumScrollBegin={() => {
                    //     this.canLoadMore = true;
                    // }}
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
    popular: state.popular,
})

/**
 * 发送action，将action创建函数和props进行关联，在页面中通过this.props取出创建函数发送action进行数据加载请求
 * @param dispatch
 * @returns {{onLoadPopularData: (function(*=, *=): *)}}
 */
const mapDispatchToProps = dispatch => ({
    onLoadPopularData: (storeName, url, pageSize, favoriteDao) => dispatch(actions.onLoadPopularData(storeName, url, pageSize, favoriteDao)),
    onLoadMorePopular: (storeName, pageIndex, pageSize, items, favoriteDao, callBack) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, items, favoriteDao, callBack)),
    onFlushPopularFavoriteState: (storeName, pageIndex, pageSize, items, favoriteDao) => dispatch(actions.onFlushPopularFavoriteState(storeName, pageIndex, pageSize, items, favoriteDao)),
})
//connect只是一个function，并不一定非要放在export default 后面。
const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);
