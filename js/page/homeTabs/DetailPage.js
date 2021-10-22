/**
 * @author HaganWu
 * @description DetailPage
 * @fileName DetailPage.js
 * @data 2021/10/22 16:09
 */
import React from "react";
import {StyleSheet, Text, View} from "react-native";

type Props = {};

class DetailPage extends React.Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>DetailPage</Text>
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
export default DetailPage;
