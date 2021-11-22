/**
 * @author HaganWu
 * @description DetailPage
 * @fileName DetailPage.js
 * @data 2021/10/22 16:09
 */
import React from "react";
import {DeviceInfo, StyleSheet, TouchableOpacity, View} from "react-native";
import NavigationBar from "../../common/NavigationBar";
import ViewUtil from "../../util/ViewUtil";
import NavigationUtil from "../../navigator/NavigationUtil";
import IconFont from "../../res/iconfont";
import WebView from "react-native-webview";
import BackPressComponent from "../../common/BackPressComponent";

const Theme_COLOR = '#7dc5eb';
type Props = {};
const TRENDING_URL = "https://github.com/";

class DetailPage extends React.Component<Props> {

    constructor(props) {
        super(props);
        //导航接收值
        this.params = this.props.route.params;
        const {projectModel} = this.params;
        const title = projectModel['full_name'] || projectModel.item['full_name'];
        this.url = projectModel['html_url'] || TRENDING_URL + projectModel.fullName;
        console.log(`DetailPage -> title:${title}, url:${this.url}`);

        this.state = {
            title: title,
            url: this.url,
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

    shareClick() {
        console.log("Share Click!")
    }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        })
    }

    renderRightButton() {
        return (
            <View style={styles.rightButtonContainer}>
                <TouchableOpacity
                    style={styles.rightButton}
                    onPress={() => {
                        console.log("Collection Click!")
                    }}
                >
                    <IconFont name={'collection'} color={'white'} size={26}/>
                </TouchableOpacity>
                {ViewUtil.getShareButton(() => {
                    this.shareClick()
                })}
            </View>
        )
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
                rightButton={this.renderRightButton()}
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
export default DetailPage;
