/**
 * @author HaganWu
 * @description FetchDemo
 * @fileName FetchDemo.js
 * @data 2021/10/14 14:04
 */
import React from "react";
import {Component} from "react";
import {Button, StyleSheet, Text, TextInput, View} from "react-native";

class FetchDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showText: '',
        }
    }

    loadData() {
        console.log(`搜索:${this.searchKey}`);
        //https://api.github.com/search/repositories?q=java
        const url = `https://api.github.com/search/repositories?q=${this.searchKey}`
        fetch(url)
            .then(response => response.text())
            .then(responseText => {
                this.setState({
                    showText: responseText,
                })
            })
    }

    loadData1() {
        console.log(`搜索:${this.searchKey}`);
        //https://api.github.com/search/repositories?q=java
        const url = `https://api.github.com/search/repositories?q=${this.searchKey}`
        fetch(url)
            .then(response => {
                if (response.ok) {
                    console.log(`response.ok:${response.ok}`)
                    return response.text();
                } else {
                    console.log(`response not ok:${response.ok}`)
                    throw new Error('Network response was not ok!');
                }
            })
            .then(responseText => {
                this.setState({
                    showText: responseText,
                })
            })
            .catch(e => {
                this.setState({
                    showText: e.toString,
                })
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <TextInput style={styles.textInputStyle}
                               onChangeText={text => {
                                   this.searchKey = text;
                               }}
                    />
                    <Button style={styles.searchButton}
                            title={"搜索"}
                            onPress={() => {
                                if (this.searchKey) {
                                    this.loadData1();
                                } else {
                                    console.log("请输入搜索内容");
                                }

                            }}/>
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
    searchButton: {
        fontSize: 16,
        color: "#7fb550",
        width: 80,
    },
    showText: {
        fontSize: 16,
        color: 'orange',
        flex: 1,
        marginTop: 12,
        textAlign: "left",
    },
});
export default FetchDemo;
