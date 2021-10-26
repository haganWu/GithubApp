/**
 * @author HaganWu
 * @description PopularPage
 * @fileName PopularPage.js
 * @data 2021/10/14 14:04
 */
import React from "react";
import {Component} from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {NavigationContainer} from "@react-navigation/native";
import NavigationUtil from "../navigator/NavigationUtil";

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
                screen: props => <PopularTab {...props} tabLabel={item}/>,
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
    indicatorContainer: {
        alignItems: 'center',
    },
    indicator: {
        color: 'red',
        margin: 10,
    },
    popularTabContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textJump: {
        fontSize: 16,
        color: "blue",
        marginTop: 12,
    },
    buttonJump: {
        marginTop: 12,
    },
});

export default PopularPage;

class PopularTab extends Component<Props> {

    render() {
        const {tabLabel} = this.props;
        return (
            <View style={styles.popularTabContainer}>
                <Text style={styles.text}>{tabLabel}</Text>
                <Text style={styles.textJump} onPress={() => {
                    console.log('跳转到详情  点击');
                    NavigationUtil.goPage({
                        navigation: this.props.navigation,
                    }, "DetailPage")
                }}>跳转到详情</Text>

                <Button style={styles.buttonJump} title={"Fetch使用"} onPress={() => {
                    NavigationUtil.goPage({
                        navigation: this.props.navigation,
                    }, "FetchDemo")
                }
                }/>
            </View>
        );
    }
}
