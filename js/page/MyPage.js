/**
 * @author HaganWu
 * @description MyPage
 * @fileName MyPage.js
 * @data 2021/10/14 14:04
 */
import React from "react";
import {Component} from "react";
import {StyleSheet, Text, View} from "react-native";

class MyPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>我的</Text>
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
export default MyPage;
