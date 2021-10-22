/**
 * @author HaganWu
 * @description PopularPage
 * @fileName PopularPage.js
 * @data 2021/10/14 14:04
 */
import React from "react";
import {Component} from "react";
import {StyleSheet, View} from "react-native";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {NavigationContainer} from "@react-navigation/native";
import HomeTab1 from "./homeTabs/HomeTab1";
import HomeTab2 from "./homeTabs/HomeTab2";

type Props = {}
const Tab = createMaterialTopTabNavigator();

class PopularPage extends Component<Props> {

    constructor(props) {
        super(props);
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
                        tabBarInactiveTintColor: "white",
                        tabBarStyle: {
                            backgroundColor: "#7dc5eb",//TabBar 的背景颜色
                        },
                        tabBarIndicatorStyle: styles.indicatorStyle,//标签指示器的样式
                        tabBarLabelStyle: styles.labelStyle,
                    }
                }
            >
                <Tab.Screen
                    name={"HomeTab1"}
                    component={HomeTab1}
                    options={{tabBarLabel: "HomeTab1"}}/>
                <Tab.Screen
                    name={"HomeTab2"}
                    component={HomeTab2}
                    options={{tabBarLabel: "HomeTab2"}}/>
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
});


export default PopularPage;
