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
import BackPressComponent from "../common/BackPressComponent";

type Props = {};

class HomePage extends Component<Props> {

    constructor(props) {
        super(props);
        this.backPress = new BackPressComponent({backPress: () => this.onBackPress()})
    }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    onBackPress() {
        // const {dispatch, nav} = this.props;
        //
        // if (nav.route[1].index === 0) {
        //     return false;
        // }
        // dispatch(NavigationActions.back());
        // return true
        console.log('HomePage -> onBackPress')
    }

    render() {
        NavigationUtil.navigation = this.props.navigation;
        return <DynamicTabNavigator/>;
    }
}

export default HomePage;
