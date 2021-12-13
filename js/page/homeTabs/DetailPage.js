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
import FavoriteDao from "../../expand/dao/FavoriteDao";
import {FLAG_STORAGE} from "../../expand/dao/DataStore";
import {connect} from "react-redux";

type Props = {};
const TRENDING_URL = "https://github.com/";

class DetailPage extends React.Component<Props> {

    constructor(props) {
        super(props);
        //导航接收值
        this.params = this.props.route.params;
        const {projectModel, flag} = this.params;
        this.favoriteDao = new FavoriteDao(flag);
        const item = projectModel.item;
        const title = item['full_name'] || item['fullName'];
        this.url = item['html_url'] || TRENDING_URL + item.fullName;

        this.state = {
            title: title,
            url: this.url,
            canGoBack: false,
            isFavorite: projectModel.isFavorite
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

    /**
     * 更新组件当前的收藏状态
     */
    onFavoriteClick() {
        const {projectModel, callback, flag} = this.params;
        const isFavorite = projectModel.isFavorite = !projectModel.isFavorite;
        if (callback && typeof callback == 'function') {
            callback(isFavorite);
        }
        this.setState({
            isFavorite: isFavorite,
        })
        let key = flag === FLAG_STORAGE.flag_popular ? projectModel.item.id.toString() + projectModel.item["full_name"] :
            projectModel.item.id.toString() + projectModel.item["fullName"];
        if (projectModel.isFavorite) {
            this.favoriteDao.saveFavoriteItem(key, JSON.stringify(projectModel.item));
        } else {
            this.favoriteDao.removeFavoriteItem(key);
        }

    }

    renderRightButton() {
        return (
            <View style={styles.rightButtonContainer}>
                <TouchableOpacity
                    style={styles.rightButton}
                    onPress={() => {
                        this.onFavoriteClick();
                    }}
                >
                    <IconFont
                        name={'collection'}
                        color={this.state.isFavorite ? '#1296db' : '#333333'}
                        size={26}
                    />
                </TouchableOpacity>
                {ViewUtil.getShareButton(() => {
                    this.shareClick()
                })}
            </View>
        )
    }

    render() {
        const titleLayoutStyle = this.state.title.length > 20 ? {paddingRequired: 30} : null;
        const {theme} = this.props;
        let navigationBar =
            <NavigationBar
                title={this.state.title}
                style={theme.styles.navBar}
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

const mapStateToProps = state => ({
    theme: state.theme.theme,
})
export default connect(mapStateToProps, null)(DetailPage);
