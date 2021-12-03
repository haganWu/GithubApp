/**
 * @author HaganWu
 * @description TestPage
 * @fileName TestPage.js
 * @data 2021/12/3 14:28
 */
import React from "react";
import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import NavigationUtil from "../navigator/NavigationUtil";
import actions from "../action";
import {connect} from "react-redux";

class TestPage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <Text style={styles.text}>测试</Text>
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


                    <View style={{marginTop: 30}}>
                        <Button title={'修改主题颜色'} onPress={() => {
                            this.props.onThemeChange('#faa');
                        }}/>
                    </View>
                </View>

            </View>)
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
});
const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
})
export default connect(null, mapDispatchToProps)(TestPage);
