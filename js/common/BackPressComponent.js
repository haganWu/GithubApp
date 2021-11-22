/**
 * @author HaganWu
 * @description 物理返回键处理
 * @fileName BackPressComponent.js
 * @data 2021/11/22 10:43
 */
import React from "react";
import {BackHandler} from "react-native";

export default class BackPressComponent {
    constructor(props) {
        this._hardwareBackPress = this.onHardwareBackPress.bind(this);
        this.props = props;
    }

    componentDidMount() {
        if (this.props.backPress) {
            BackHandler.addEventListener('hardwareBackPress', this._hardwareBackPress);
        }
    }

    componentWillUnmount() {
        if (this.props.backPress) {
            BackHandler.removeEventListener('hardwareBackPress', this._hardwareBackPress);
        }
    }

    onHardwareBackPress(e) {
        return this.props.backPress(e);
    }
}
