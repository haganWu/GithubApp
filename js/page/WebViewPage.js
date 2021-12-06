/**
 * @author HaganWu
 * @description DetailPage
 * @fileName DetailPage.js
 * @data 2021/10/22 16:09
 */
import React from "react";
import {DeviceInfo, StyleSheet, View} from "react-native";
import WebView from "react-native-webview";
import NavigationBar from "../common/NavigationBar";
import ViewUtil from "../util/ViewUtil";
import NavigationUtil from "../navigator/NavigationUtil";
import BackPressComponent from "../common/BackPressComponent";

const Theme_COLOR = '#7dc5eb';
type Props = {};

class WebViewPage extends React.Component<Props> {

    constructor(props) {
        super(props);
        //导航接收值
        this.params = this.props.route.params;
        const {title, url} = this.params;

        this.state = {
            title: title,
            url: url,
            canGoBack: false,
        }
        this.backPress = new BackPressComponent({backPress: () => this.onBackPress()})
    }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }


    onBackPress() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            NavigationUtil.goBack(this.props.navigation);
        }
    }


    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        })
    }


    render() {
        const titleLayoutStyle = this.state.title.length > 20 ? {paddingRequired: 30} : null;
        let navigationBar =
            <NavigationBar
                title={this.state.title}
                style={{backgroundColor: Theme_COLOR}}
                leftButton={ViewUtil.getLeftBackButton(() => {
                    this.onBackPress()
                })}
            />
        return (
            <View style={styles.container}>
                {navigationBar}
                <View style={styles.contentContainer}>
                    <WebView
                        ref={webView => this.webView = webView}
                        source={{uri: this.state.url}}
                        titleLayoutStyle={titleLayoutStyle}
                        startInLoadingState={true}
                        onNavigationStateChange={e => this.onNavigationStateChange(e)}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0,
    },
    contentContainer: {
        flex: 1,
    },
    text: {
        fontSize: 22,
        color: "#7fb550",
    },
    rightButtonContainer: {
        flexDirection: "row",
    },
    rightButton: {
        paddingVertical: 4,
        paddingLeft: 4,
        alignItems: 'center',
    },
});
export default WebViewPage;
