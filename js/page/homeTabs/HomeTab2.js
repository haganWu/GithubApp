/**
 * @author HaganWu
 * @description HomeTab2
 * @fileName HomeTab2.js
 * @data 2021/10/21 10:18
 */
import React from "react";
import {StyleSheet, Text, View} from "react-native";

class HomeTab2 extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>HomeTab2</Text>
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
export default HomeTab2;
