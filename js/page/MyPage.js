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
import NavigationBar from "../common/NavigationBar";

const Theme_COLOR = '#7dc5eb';

class MyPage extends Component {

    getLeftButton() {
        return (
            <View>
                <Text style={styles.navigationBarButton} onPress={() => {
                    console.log("LeftButton click");
                }}>LeftButton</Text>
            </View>
        )
    }

    getRightButton() {
        return (
            <View>
                <Text style={styles.navigationBarButton} onPress={() => {
                    console.log("RightButton click");
                }}>RightButton</Text>
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
                leftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />

        return (
            <View style={styles.container}>
                {navigationBar}
                <View style={styles.contentContainer}>
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

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
    navigationBarButton: {
        fontSize: 16,
        color: "#FFF",
    },
});
export default MyPage;
