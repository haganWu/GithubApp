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
import ViewUtil from "../util/ViewUtil";

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars'
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
        const {keys, theme} = this.props;
        keys.forEach((item, index) => {
            if (item.checked) {
                tabs[`tab${index}`] = {
                    screen: props => <PopularTabPage key={index} {...props} tabLabel={item.name} theme={theme}/>,
                    navigationOptions: {
                        title: item.name,
                    },
                }
            }

        });
        return tabs;
    }

    onSearchClick() {
        NavigationUtil.goPage({
            navigation: this.props.navigation,
            title: "??????",
        }, "SearchPage")
    }

    render() {
        const {keys, theme} = this.props;

        let statusBar = {
            backgroundColor: theme.themeColor,
            barStyle: "light-content",
        }
        let navigationBar =
            <NavigationBar
                title={'??????'}
                statusBar={statusBar}
                rightButton={ViewUtil.getRightImageButton("Search", () => this.onSearchClick())}
                style={theme.styles.navBar}
            />
        let TabNavigator = keys.length ?
            <NavigationContainer independent={true}>
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
    tabStyle: {
        // minWidth: 50 //fix minWidth?????????tabStyle?????????????????????
        width: 80,
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
        // textTransform: "lowercase",//??????Tab??????????????????
        textTransform: "none",
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
    theme: state.theme.theme,
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
                this.refs.toast.show('???????????????');
            });
        } else if (refreshFavoriteState) {
            console.log("refreshFavoriteState");
            onFlushPopularFavoriteState(this.storeName, url, PAGE_SIZE, store.items, favoriteDao);
        } else {
            onLoadPopularData(this.storeName, url, PAGE_SIZE, favoriteDao);
        }

    }

    /**
     * @description ????????????????????????????????????
     * @author HaganWu
     * @data 2021/10/28  10:28
     */
    _store() {
        const {popular} = this.props;
        let store = popular[this.storeName];//????????????state
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

    genFetchUrl(key) {
        return URL + key + QUERY_STR;
    }


    renderItem(data) {
        const {theme} = this.props;
        const item = data.item;
        return (
            <PopularItem
                projectModel={item}
                theme={theme}
                onSelect={(callback) => {
                    //????????????
                    NavigationUtil.goPage({
                        projectModel: item,
                        flag: FLAG_STORAGE.flag_popular,
                        callback: callback,
                    }, "DetailPage");
                }}
                onFavorite={(item, isFavorite) => {
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
                <Text>??????????????????...</Text>
            </View>
    }


    render() {
        let store = this._store();
        const {theme} = this.props;
        return (
            <View style={styles.popularTabContainer}>
                <FlatList
                    data={store.projectModels}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => "" + item.item.id + item.item["full_name"]}
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
                        // setTimeout(() => {//?????? onEndReached ??? onMomentumScrollBegin ????????????
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
 * ???state????????????????????????props????????????????????????this.props????????????????????????
 */
const mapStateToProps = state => ({
    popular: state.popular,
})

/**
 * ??????action??????action???????????????props?????????????????????????????????this.props????????????????????????action????????????????????????
 * @param dispatch
 * @returns {{onLoadPopularData: (function(*=, *=): *)}}
 */
const mapDispatchToProps = dispatch => ({
    onLoadPopularData: (storeName, url, pageSize, favoriteDao) => dispatch(actions.onLoadPopularData(storeName, url, pageSize, favoriteDao)),
    onLoadMorePopular: (storeName, pageIndex, pageSize, items, favoriteDao, callBack) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, items, favoriteDao, callBack)),
    onFlushPopularFavoriteState: (storeName, pageIndex, pageSize, items, favoriteDao) => dispatch(actions.onFlushPopularFavoriteState(storeName, pageIndex, pageSize, items, favoriteDao)),
})
//connect????????????function???????????????????????????export default ?????????
const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);
