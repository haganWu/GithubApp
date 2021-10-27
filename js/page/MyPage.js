/**
 * @author HaganWu
 * @description MyPage
 * @fileName MyPage.js
 * @data 2021/10/14 14:04
 */
import React from "react";
import {Component} from "react";
import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import NavigationUtil from "../navigator/NavigationUtil";

class MyPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>我的</Text>
                <Text style={styles.textJump} onPress={() => {
                    console.log('跳转到详情  点击');
                    NavigationUtil.goPage({
                        navigation: this.props.navigation,
                    }, "DetailPage")
                }}>跳转到详情</Text>

                <TouchableOpacity style={styles.buttonContainer}>
                    <Button title={"Fetch使用"} onPress={() => {
                        NavigationUtil.goPage({
                            navigation: this.props.navigation,
                        }, "FetchDemo")
                    }
                    }/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer}>
                    <Button title={"AsyncStorage使用"} onPress={() => {
                        NavigationUtil.goPage({
                            navigation: this.props.navigation,
                        }, "AsyncStorageDemo")
                    }
                    }/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Button title={"离线缓存框架使用"} onPress={() => {
                        NavigationUtil.goPage({
                            navigation: this.props.navigation,
                        }, "DataStoreDemo")
                    }
                    }/>
                </TouchableOpacity>
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
    textJump: {
        fontSize: 16,
        color: "blue",
        marginTop: 12,
    },
    buttonContainer: {
        marginTop: 12,
    },
});
export default MyPage;
