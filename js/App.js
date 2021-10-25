/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import AppNavigators from "./navigator/AppNavigators";
import {Provider} from "react-redux";
import store from "./store"

export default class App extends Component {
    render() {
        //将store传递给APP框架
        return <Provider store={store}><AppNavigators/></Provider>;
    }
}
