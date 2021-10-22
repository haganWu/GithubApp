/**
 * @author HaganWu
 * @description HomeTab1
 * @fileName HomeTab1.js
 * @data 2021/10/21 10:18
 */
import React from "react";
import {StyleSheet, Text, View} from "react-native";

class HomeTab1 extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>HomeTab1</Text>
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
export default HomeTab1;
