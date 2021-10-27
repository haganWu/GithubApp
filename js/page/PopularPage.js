/**
 * @author HaganWu
 * @description PopularPage
 * @fileName PopularPage.js
 * @data 2021/10/14 14:04
 */
import React from "react";
import {Component} from "react";
import {FlatList, RefreshControl, StyleSheet, Text, View} from "react-native";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {NavigationContainer} from "@react-navigation/native";
import actions from '../action/index'
import {connect} from "react-redux";

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars'
const Theme_COLOR = 'red';


type Props = {}
const Tab = createMaterialTopTabNavigator();

class PopularPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.tabNames = ["Java", "Android", "Kotlin", "Object-C", "IOS", "Swift"];
    }

    _genTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <PopularTabPage {...props} tabLabel={item}/>,
                navigationOptions: {
                    title: item,
                },
            }
        });
        return tabs;
    }

    render() {

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
        fontSize: 13,
        margin: 0,
    },
    popularTabContainer: {
        flex: 1,
        backgroundColor: 'white',
    },

    renderItemContainer: {
        marginVertical: 12,
        backgroundColor: 'yellow',
    },
    renderText: {
        backgroundColor: '#ffa',
        fontSize: 16,
        color: "#7fb550",
    },
});

export default PopularPage;

class PopularTab extends Component<Props> {
    constructor(props) {
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        const {onLoadPopularData} = this.props;
        const url = this.genFetchUrl(this.storeName);
        onLoadPopularData(this.storeName, url);
    }

    genFetchUrl(key) {
        return URL + key + QUERY_STR;
    }

    renderItem(data) {
        const item = data.item;
        console.log(JSON.stringify(item));
        return (
            <View style={styles.renderItemContainer}>
                <Text style={styles.renderText}>{JSON.stringify(item)}</Text>
            </View>
        );
    }

    render() {
        const {popular} = this.props;
        let store = popular[this.storeName];//动态获取state
        if (!store) {
            store = {
                items: [],
                isLoading: false,
            }
        }
        return (
            <View style={styles.popularTabContainer}>
                <FlatList
                    data={store.items}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => "" + item.id}
                    refreshControl={
                        <RefreshControl
                            title={'loading'}
                            titleColor={Theme_COLOR}
                            colors={[Theme_COLOR]}
                            onRefresh={() => this.loadData()}
                            tintColor={Theme_COLOR}
                            refreshing={store.isLoading}/>
                    }
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    popular: state.popular,
})
const mapDispatchToProps = dispatch => ({
    onLoadPopularData: (storeName, url) => dispatch(actions.onLoadPopularData(storeName, url)),
})

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);
