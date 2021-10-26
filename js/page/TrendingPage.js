/**
 * @author HaganWu
 * @description TrendingPage
 * @fileName TrendingPage.js
 * @data 2021/10/14 14:04
 */
import React from "react";
import {Component} from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import actions from "../action"


class TrendingPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>趋势</Text>
                <Button title={'修改主题颜色'} onPress={() => {
                    //在当前页面中获取props中的onThemeChange触发一个action，action交由reducer处理，reducer返回一个新的state，由于state发生变化初始页面刷新，改变页面显式效果。
                    this.props.onThemeChange('#7fb550');
                }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
    },

    text: {
        fontSize: 22,
        color: "#7fb550",
    },
});

/**
 * 将action创建函数onThemeChange 关联到props中
 * @param dispatch
 * @returns {{onThemeChange: (function(*=): *)}}
 */
const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
})

export default connect(null, mapDispatchToProps)(TrendingPage);
