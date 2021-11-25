/**
 * @author HaganWu
 * @description TrendingPage
 * @fileName TrendingPage.js
 * @data 2021/10/14 14:04
 */
import React from "react";
import {Component} from "react";
import {
    ActivityIndicator,
    DeviceEventEmitter,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {NavigationContainer} from "@react-navigation/native";
import actions from '../action/index'
import {connect} from "react-redux";
import TrendingItem from "../common/TrendingItem";
import Toast from 'react-native-easy-toast';
import NavigationBar from "../common/NavigationBar";
import TrendingDialog, {TIME_SPANS} from "../common/TrendingDialog";
import IconFont from "../res/iconfont";
import NavigationUtil from "../navigator/NavigationUtil";
import FavoriteUtil from "../util/FavoriteUtil";
import {FLAG_STORAGE} from "../expand/dao/DataStore";
import FavoriteDao from "../expand/dao/FavoriteDao";

const URL = 'https://github.com/trending/';
const QUERY_STR = '?since='
const Theme_COLOR = '#7dc5eb';
const PAGE_SIZE = 10;
const EVENT_TYPE_TIME_SPAN_CHANGE = 'EVENT_TYPE_TIME_SPAN_CHANGE';
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_trending);

type Props = {}
const Tab = createMaterialTopTabNavigator();

class TrendingPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.tabNames = ["Java", "Kotlin", "objective-c", "Swift", "C#", "JavaScript"];
        this.state = {
            timeSpan: TIME_SPANS[0],
        }
    }


    _genTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <TrendingTabPage {...props} timeSpan={this.state.timeSpan} tabLabel={item}/>,
                navigationOptions: {
                    title: item,
                },
            }
        });
        return tabs;
    }

    renderTitleView() {
        return (
            <View>
                <TouchableOpacity
                    ref={'titleViewButton'}
                    underlayColor={'transparent'}
                    onPress={() => this.dialog.show()}
                >
                    <View style={styles.titleViewContainer}>
                        <Text style={styles.titleViewText}>趋势 {this.state.timeSpan.showText} </Text>
                        <IconFont name={'triangle-down'} size={12} color={'white'}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    onSelectTimeSpan(tab) {
        this.dialog.dismiss();
        this.setState({
            timeSpan: tab,
        });
        DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE, tab)
    }

    renderTrendingDialog() {
        return <TrendingDialog
            ref={dialog => this.dialog = dialog}
            onSelect={tab => this.onSelectTimeSpan(tab)}
        />
    }

    render() {
        let statusBar = {
            backgroundColor: Theme_COLOR,
            barStyle: "light-content",
        }
        let navigationBar =
            <NavigationBar
                statusBar={statusBar}
                titleView={this.renderTitleView()}
                style={{backgroundColor: Theme_COLOR}}
            />
        let TabNavigator = <NavigationContainer independent={true}>
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
        </NavigationContainer>

        return (
            <View style={styles.container}>
                {navigationBar}
                {TabNavigator}
                {this.renderTrendingDialog()}
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
        width: 90,
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
        fontSize: 18,
        margin: 0,
        textTransform: "lowercase",//设置Tab标题字母小写
    },
    TrendingTabContainer: {
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
    titleViewContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    titleViewText: {
        fontSize: 18,
        color: "white",
        fontWeight: "400",
    },
});

export default TrendingPage;

class TrendingTab extends Component<Props> {
    constructor(props) {
        super(props);
        const {tabLabel, timeSpan} = this.props;
        this.storeName = tabLabel;
        this.timeSpan = timeSpan;
    }

    componentDidMount() {
        this.loadData(false);
        this.timeSpanChangeListener = DeviceEventEmitter.addListener(EVENT_TYPE_TIME_SPAN_CHANGE, (timeSpan) => {
            this.timeSpan = timeSpan;
            console.log(`timeSpan had changed:${timeSpan.searchText}`)
        });
    }

    componentWillUnmount() {
        if (this.timeSpanChangeListener !== null) {
            this.timeSpanChangeListener.remove();
        }
    }

    loadData(loadMore) {

        const {onRefreshTrending, onLoadMoreTrending} = this.props;
        const store = this._store();
        const url = this.genFetchUrl(this.storeName, this.timeSpan);
        if (loadMore) {
            onLoadMoreTrending(this.storeName, ++store.pageIndex, PAGE_SIZE, store.items, favoriteDao, () => {
                this.refs.toast.show('没有更多了');
            });
        } else {
            onRefreshTrending(this.storeName, url, PAGE_SIZE, favoriteDao);
            console.log(`onRefreshTrending --${this.timeSpan.searchText}--${this.storeName}`)
        }

    }

    /**
     * @description 获取与当前页面有关的数据
     * @author HaganWu
     * @data 2021/10/28  10:28
     */
    _store() {
        const {trending} = this.props;
        let store = trending[this.storeName];//动态获取state
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

    genFetchUrl(key, timeSpan) {
        return URL + key + QUERY_STR + timeSpan.searchText;
    }


    renderItem(data) {
        const item = data.item;
        return (
            <TrendingItem
                projectModel={item}
                onSelect={(callback) => {
                    //导航传值
                    NavigationUtil.goPage({
                        projectModel: item,
                        flag: FLAG_STORAGE.flag_trending,
                        callback: callback,
                    }, "DetailPage");
                }}
                onFavorite={(item, isFavorite) => {
                    console.log(`TP点击收藏：isFavorite:${isFavorite},item:${item.fullName}`);
                    FavoriteUtil.onFavorite(favoriteDao, item, isFavorite)
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
            <View style={styles.TrendingTabContainer}>
                <FlatList
                    data={store.projectModes}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => "" + (item.item.id || item.item.fullName)}
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
                    }}
                    onEndReachedThreshold={0.5}
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
    trending: state.trending,
})

/**
 * 发送action，将action创建函数和props进行关联，在页面中通过this.props取出创建函数发送action进行数据加载请求
 * @param dispatch
 * @returns {{onLoadTrendingData: (function(*=, *=): *)}}
 */
const mapDispatchToProps = dispatch => ({
    onRefreshTrending: (storeName, url, pageSize, favoriteDao) => dispatch(actions.onRefreshTrending(storeName, url, pageSize, favoriteDao)),
    onLoadMoreTrending: (storeName, pageIndex, pageSize, items, favoriteDao, callBack) => dispatch(actions.onLoadMoreTrending(storeName, pageIndex, pageSize, items, favoriteDao, callBack)),
})
//connect只是一个function，并不一定非要放在export default 后面。
const TrendingTabPage = connect(mapStateToProps, mapDispatchToProps)(TrendingTab);
