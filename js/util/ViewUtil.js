/**
 * @author HaganWu
 * @description ViewUtil
 * @fileName ViewUtil.js
 * @data 2021/10/29 15:51
 */
import React from "react";
import {TouchableOpacity, StyleSheet, Text} from "react-native";
import IconFont from "../res/iconfont";

export default class ViewUtil {
    static getLeftBackButton(callBack) {
        return <TouchableOpacity
            style={{paddingVertical: 8}}
            onPress={callBack}
        >
            <IconFont name={'back'} color={'white'} size={26}/>
        </TouchableOpacity>
    }

    static getRightTextButton(title, callBack) {
        return <TouchableOpacity
            style={{paddingVertical: 8}}
            onPress={callBack}
        >
            <Text style={styles.rightTextButton}>{title}</Text>
        </TouchableOpacity>
    }

    static getRightImageButton(imageName, callBack) {
        return (<TouchableOpacity
            style={styles.buttonStyle}
            onPress={callBack}
        >
            <IconFont name={imageName} color={'white'} size={26}/>
        </TouchableOpacity>);
    }

    static getShareButton(callBack) {
        return (<TouchableOpacity
            style={styles.buttonStyle}
            onPress={callBack}
        >
            <IconFont name={'share'} color={'white'} size={26}/>
        </TouchableOpacity>);
    }

}
const styles = StyleSheet.create({
    buttonStyle: {
        paddingVertical: 4,
        paddingLeft: 4,
        paddingRight: 4,
        alignItems: 'center',
    },
    rightTextButton: {
        fontSize: 16,
        color: "white",
    }
})
