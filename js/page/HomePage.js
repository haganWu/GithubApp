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
import CustomThemeView from "./CustomThemeView";
import actions from "../action";
import {connect} from "react-redux";
import SafeAreaViewPlus from "../common/SafeAreaViewPlus";

type Props = {};

class HomePage extends Component<Props> {

    constructor(props) {
        super(props);
    }

    renderCustomThemeView() {
        const {customThemeViewVisible, onShowCustomThemeView} = this.props;
        return (
            <CustomThemeView
                visible={customThemeViewVisible}
                {...this.props}
                onClose={() => onShowCustomThemeView(false)}
            />
        );
    }

    render() {
        const {theme} = this.props;
        NavigationUtil.navigation = this.props.navigation;
        return <SafeAreaViewPlus
            topColor={theme.themeColor}
        >
            <DynamicTabNavigator/>
            {this.renderCustomThemeView()}
        </SafeAreaViewPlus>;
    }
}

const mapStateToProps = state => ({
    nav: state.nav,
    customThemeViewVisible: state.theme.customThemeViewVisible,
    theme: state.theme.theme,
})

const mapDispatchToProps = dispatch => ({
    onShowCustomThemeView: (show) => dispatch(actions.onShowCustomThemeView(show)),
})
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
