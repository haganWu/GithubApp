/**
 * @author HaganWu
 * @description MyPage
 * @fileName MyPage.js
 * @data 2021/10/14 14:04
 */
import React from "react";
import {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import NavigationUtil from "../navigator/NavigationUtil";
import NavigationBar from "../common/NavigationBar";
import actions from "../action";
import {connect} from "react-redux";

const Theme_COLOR = '#7dc5eb';

class MyPage extends Component {

    getRightButton() {
        return (
            <View>
                <Text style={styles.navigationBarButton} onPress={() => {
                    console.log("RightButton click");
                    NavigationUtil.goPage({
                        navigation: this.props.navigation,
                    }, "TestPage");
                }}>测试</Text>
            </View>
        )
    }

    render() {
        let statusBar = {
            backgroundColor: Theme_COLOR,
            barStyle: "light-content",
        }
        let navigationBar =
            <NavigationBar
                title={'我的'}
                statusBar={statusBar}
                style={{backgroundColor: Theme_COLOR}}
                rightButton={this.getRightButton()}
            />

        return (
            <View style={styles.container}>
                {navigationBar}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    navigationBarButton: {
        fontSize: 16,
        color: "#ffffff",
    },
});
const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
})
export default connect(null, mapDispatchToProps)(MyPage);
