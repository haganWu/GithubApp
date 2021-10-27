/**
 * @author HaganWu
 * @description DataStoreDemo
 * @fileName DataStoreDemo.js
 * @data 2021/10/27 9:35
 */
import React from "react";
import {Component} from "react";
import { StyleSheet, Text, TextInput, View} from "react-native";
import DataStore from "../../expand/dao/DataStore";


class DataStoreDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showText: '',
        }
        this.dataStore = new DataStore();
    }

    loadData() {
        const url = `https://api.github.com/search/repositories?q=${this.value}`;
        this.dataStore.fetchData(url)
            .then(data => {
                let showData = `初次数据加载时间：${new Date(data.timestamp)}\n${JSON.stringify(data.data)}`;
                this.setState({
                    showText: showData,
                })
            })
            .catch(error => {
                error && console.log(error.toString());
            })
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
                        this.loadData();
                    }}>获取数据</Text>

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
export default DataStoreDemo;

