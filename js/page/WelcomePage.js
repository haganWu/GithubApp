/**
 * @author HaganWu
 * @description WelcomePage
 * @fileName WelcomePage.js
 * @data 2021/10/19 13:19
 */
import React from "react";
import {StyleSheet, Text, View} from "react-native";
import IconFont from "../res/iconfont";
import NavigationUtil from "../navigator/NavigationUtil";


type Props = {}

class WelcomePage extends React.Component<Props> {

    componentDidMount() {
        this.timer = setTimeout(() => {
            //跳转到首页
            NavigationUtil.resetToHomePage({
                navigation: this.props.navigation,
            });
        }, 1500);
    }

    componentWillUnmount() {
        //销毁欢迎页，清空计时器
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.iconTestContainer}>
                    <IconFont name={'welcome'} size={120}/>
                    <Text style={styles.text}>Welcome Goblin!</Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#7dc5eb",
        justifyContent: "center",
        alignItems: "center",
    },

    iconTestContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    text: {
        color: "#ff562a",
        fontSize: 22,
        marginTop: 18,
    },

});
export default WelcomePage;
