/**
 * @author HaganWu
 * @description FavoritePage
 * @fileName FavoritePage.js
 * @data 2021/10/14 14:04
 */
import React from "react";
import {Component} from "react";
import {StyleSheet, View} from "react-native";
import {connect} from "react-redux";
import actions from "../action"


class FavoritePage extends Component {
    render() {
        return (
            <View style={styles.container}>
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
        color: "#faa",
    },
});
const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
})
export default connect(null, mapDispatchToProps)(FavoritePage);
