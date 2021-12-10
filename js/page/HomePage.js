/**
 * @author HaganWu
 * @description HomePage
 * @fileName HomePage.js
 * @data 2021/10/14 13:17
 */
import React from "react";
import {Component} from "react";
import DynamicTabNavigator from "../navigator/DynamicTabNavigator";
import NavigationUtil from "../navigator/NavigationUtil";

type Props = {};

class HomePage extends Component<Props> {

    constructor(props) {
        super(props);
    }


    render() {
        NavigationUtil.navigation = this.props.navigation;
        return <DynamicTabNavigator/>;
    }
}

export default HomePage;
