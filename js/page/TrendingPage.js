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
import EventBus from "react-native-event-bus";
import EventTypes from "../util/EventTypes";
import {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";
import ArrayUtil from "../util/ArrayUtil";

const URL = 'https://github.com/trending/';
const QUERY_STR = '?since='
const PAGE_SIZE = 10;
const EVENT_TYPE_TIME_SPAN_CHANGE = 'EVENT_TYPE_TIME_SPAN_CHANGE';
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_trending);

type Props = {}
const Tab = createMaterialTopTabNavigator();

class TrendingPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            timeSpan: TIME_SPANS[0],
        }
        const {onLoadLanguage} = this.props;
        onLoadLanguage(FLAG_LANGUAGE.flag_language);
        this.preLanguage = [];
    }


    _genTabs() {
        const tabs = {};
        const {languages, theme} = this.props;
        this.preLanguage = languages;
        languages.forEach((item, index) => {
            if (item.checked) {
                tabs[`tab${index}`] = {
                    screen: props => <TrendingTabPage
                        key={index}
                        {...props} timeSpan={this.state.timeSpan}
                        tabLabel={item.name}
                        theme={theme}/>,
                    navigationOptions: {
                        title: item.name,
                    },
                }
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
                        <Text style={styles.titleViewText}>?????? {this.state.timeSpan.showText} </Text>
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

    _tabNav() {
        const {languages, theme} = this.props;
        if (theme !== this.theme || !this.tabNav || !ArrayUtil.isEqual(this.preLanguage, languages)) {
            this.theme = theme;
            this.tabNav =
                <NavigationContainer
                    independent={true}>
                    <Tab.Navigator
                        screenOptions={
                            {
                                lazy: true,
                                tabBarItemStyle: styles.tabStyle,
                                tabBarScrollEnabled: true,
                                tabBarActiveTintColor: "white",
                                // upperCaseLabel: false,
                                tabBarInactiveTintColor: "white",
                                tabBarStyle: {
                                    backgroundColor: theme.themeColor,//TabBar ???????????????
                                },
                                tabBarIndicatorStyle: styles.indicatorStyle,//????????????????????????
                                tabBarLabelStyle: styles.labelStyle,
                            }
                        }
                    >
                        {
                            Object.entries(this._genTabs()).map((item, index) => {
                                return <Tab.Screen
                                    key={index}
                                    name={item[0]}
                                    component={item[1].screen}
                                    options={item[1].navigationOptions}
                                />
                            })
                        }
                    </Tab.Navigator>
                </NavigationContainer>
        }
        return this.tabNav;
    }

    render() {
        const {languages, theme} = this.props;
        let statusBar = {
            backgroundColor: theme.themeColor,
            barStyle: "light-content",
        }
        let navigationBar =
            <NavigationBar
                statusBar={statusBar}
                titleView={this.renderTitleView()}
                style={theme.styles.navBar}
            />
        let TabNavigator = languages.length ? this._tabNav() : null
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
        // minWidth: 50 //fix minWidth?????????tabStyle?????????????????????
        width: 90,
        padding: 0,
    },
    indicatorStyle: {//???????????????
        height: 4,
        width: 20,
        marginLeft: 30,
        borderRadius: 2,
        backgroundColor: "white",
    },
    labelStyle: {
        fontSize: 16,
        margin: 0,
        textTransform: "none",
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
        justifyContent: "center"
    },
    titleViewText: {
        fontSize: 18,
        color: "white",
        fontWeight: "400",
    },
});

const mapTrendingStateToProps = state => ({
    languages: state.language.languages,
    theme: state.theme.theme,
});
const mapTrendingDispatchToProps = dispatch => ({
    onLoadLanguage: (flagKey) => dispatch(actions.onLoadLanguage(flagKey)),
})
export default connect(mapTrendingStateToProps, mapTrendingDispatchToProps)(TrendingPage);

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
        });
        EventBus.getInstance().addListener(EventTypes.favorite_changed_trending, this.listener = data => {
            console.log(`data:${data}`);
            this.loadData(false);
        });
    }

    componentWillUnmount() {
        if (this.timeSpanChangeListener !== null) {
            this.timeSpanChangeListener.remove();
        }
        EventBus.getInstance().removeListener(this.listener);
    }

    loadData(loadMore) {

        const {onRefreshTrending, onLoadMoreTrending} = this.props;
        const store = this._store();
        const url = this.genFetchUrl(this.storeName, this.timeSpan);
        if (loadMore) {
            onLoadMoreTrending(this.storeName, ++store.pageIndex, PAGE_SIZE, store.items, favoriteDao, () => {
                this.refs.toast.show('???????????????');
            });
        } else {
            onRefreshTrending(this.storeName, url, PAGE_SIZE, favoriteDao);
        }

    }

    /**
     * @description ????????????????????????????????????
     * @author HaganWu
     * @data 2021/10/28  10:28
     */
    _store() {
        const {trending} = this.props;
        let store = trending[this.storeName];//????????????state
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModels: [],//??????????????????
                hideLoadingMore: true,//????????????????????????
            }
        }
        return store;
    }

    genFetchUrl(key, timeSpan) {
        return URL + key + QUERY_STR + timeSpan.searchText;
    }


    renderItem(data) {
        const item = data.item;
        const {theme} = this.props;
        return (
            <TrendingItem
                projectModel={item}
                theme={theme}
                onSelect={(callback) => {
                    //????????????
                    NavigationUtil.goPage({
                        projectModel: item,
                        flag: FLAG_STORAGE.flag_trending,
                        callback: callback,
                    }, "DetailPage");
                }}
                onFavorite={(item, isFavorite) => {
                    console.log(`TP???????????????isFavorite:${isFavorite},item:${item.fullName}`);
                    FavoriteUtil.onFavorite(FLAG_STORAGE.flag_trending, favoriteDao, item, isFavorite)
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
                <Text>??????????????????...</Text>
            </View>
    }


    render() {
        let store = this._store();
        const {theme} = this.props;
        return (
            <View style={styles.TrendingTabContainer}>
                <FlatList
                    data={store.projectModels}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => "" + item.item.id + item.item["fullName"]}
                    refreshControl={
                        <RefreshControl
                            title={'loading'}
                            titleColor={theme.themeColor}
                            colors={[theme.themeColor]}
                            onRefresh={() => this.loadData(false)}
                            tintColor={theme.themeColor}
                            refreshing={store.isLoading}/>
                    }
                    ListFooterComponent={() => this.genIndicator()}
                    onEndReached={() => {
                        //??????????????????????????????
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
 * ???state????????????????????????props????????????????????????this.props????????????????????????
 */
const mapStateToProps = state => ({
    trending: state.trending,
})

/**
 * ??????action??????action???????????????props?????????????????????????????????this.props????????????????????????action????????????????????????
 * @param dispatch
 * @returns {{onLoadTrendingData: (function(*=, *=): *)}}
 */
const mapDispatchToProps = dispatch => ({
    onRefreshTrending: (storeName, url, pageSize, favoriteDao) => dispatch(actions.onRefreshTrending(storeName, url, pageSize, favoriteDao)),
    onLoadMoreTrending: (storeName, pageIndex, pageSize, items, favoriteDao, callBack) => dispatch(actions.onLoadMoreTrending(storeName, pageIndex, pageSize, items, favoriteDao, callBack)),
})
//connect????????????function???????????????????????????export default ?????????
const TrendingTabPage = connect(mapStateToProps, mapDispatchToProps)(TrendingTab);
