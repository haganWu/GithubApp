/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import AppNavigators from "./navigator/AppNavigators";

export default class App extends Component {
    render() {
        return <AppNavigators/>;
    }
}
