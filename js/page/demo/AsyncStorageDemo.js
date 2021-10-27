/**
 * @author HaganWu
 * @description AsyncStorageDemo
 * @fileName AsyncStorageDemo.js
 * @data 2021/10/14 14:04
 */
import React from "react";
import {Component} from "react";
import {AsyncStorage, StyleSheet, Text, TextInput, View} from "react-native";

// const Props = {};
const KEY = "save_key";

class AsyncStorageDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showText: '',
        }
    }

    doSave() {
        AsyncStorage.setItem(KEY, this.value, error => {
            error && console.log(error.toString());
        })
    }

    doRemove() {
        AsyncStorage.removeItem(KEY, error => {
            error && console.log(error.toString());
        });
    }

    doGet() {
        AsyncStorage.getItem(KEY, (error, value) => {
            this.setState({
                showText: value,
            });
            console.log(value);
            error && console.log(error.toString());
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <TextInput style={styles.textInputStyle}
                               onChangeText={text => {
                                   this.value = text;
                               }}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText} onPress={() => {
                        this.doSave();
                    }}>存储</Text>

                    <Text style={styles.buttonText} onPress={() => {
                        this.doRemove();
                    }}>删除</Text>


                    <Text style={styles.buttonText} onPress={() => {
                        this.doGet();
                    }}>获取</Text>
                </View>
                <Text style={styles.showText}>
                    {this.state.showText}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 12,
        backgroundColor: "#ffffff",
    },
    searchContainer: {
        alignItems: "center",
        flexDirection: "row",
        padding: 2,
    },
    textInputStyle: {
        flex: 1,
        marginRight: 12,
        borderWidth: 1,
        borderColor: "#e3e3e3",
        height: 44,
        borderRadius: 4,

    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 16,
    },
    text: {
        fontSize: 22,
        color: "#7fb550",
    },
    buttonText: {
        fontSize: 22,
        color: "white",
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 2,
        backgroundColor: "#7fb550",
    },
    showText: {
        fontSize: 16,
        color: 'orange',
        flex: 1,
        marginTop: 12,
        textAlign: "left",
    },
});
export default AsyncStorageDemo;
