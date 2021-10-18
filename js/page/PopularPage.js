/**
 * @author HaganWu
 * @description PopularPage
 * @fileName PopularPage.js
 * @data 2021/10/14 14:04
 */
import React from "react";
import {Component} from "react";
import {StyleSheet, Text, View} from "react-native";

class PopularPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>最热</Text>
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
export default PopularPage;
