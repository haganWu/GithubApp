/**
 * @author HaganWu
 * @description MyPage
 * @fileName MyPage.js
 * @data 2021/10/14 14:04
 */
import React from "react";
import {Component} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import NavigationUtil from "../navigator/NavigationUtil";
import NavigationBar from "../common/NavigationBar";
import actions from "../action";
import {connect} from "react-redux";
import MoreMenuView from "../common/MoreMenuView";
import {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";


const CUSTOM_ABOUT_ITEM_ID = 0x0001;
const TUTORIAL_ITEM_ID = 0x0002;
const CUSTOM_LANGUAGE_ID = 0x0003;
const SORT_LANGUAGE_ID = 0x0004;
const CUSTOM_KEY_ID = 0x0005;
const SORT_KEY_ID = 0x0006;
const REMOVE_KEY_ID = 0x0007;
const CUSTOM_THEME_ITEM_ID = 0x0008;
const ABOUT_AUTHOR_ITEM_ID = 0x0009;
const FEEDBACK_ITEM_ID = 0x0010;
const SHARE_ITEM_ID = 0x0011;

const SHOW_TEST_BUTTON = false;

class MyPage extends Component {

    getRightButton() {
        return (
            SHOW_TEST_BUTTON ? <View>
                <Text style={styles.navigationBarButton} onPress={() => {
                    console.log("RightButton click");
                    NavigationUtil.goPage({
                        navigation: this.props.navigation,
                    }, "TestPage");
                }}>测试</Text>
            </View> : null
        )
    }

    onItemClickCallBack(itemId) {
        switch (itemId) {
            case CUSTOM_ABOUT_ITEM_ID:
                NavigationUtil.goPage({
                    theme: this.props.theme,
                    navigation: this.props.navigation,
                }, "AboutPage");
                break
            case TUTORIAL_ITEM_ID://教程
                NavigationUtil.goPage({
                    navigation: this.props.navigation,
                    title: "教程",
                    url: "https://coding.imooc.com/class/304.html",
                }, "WebViewPage");
                break
            case CUSTOM_LANGUAGE_ID:
                console.log(`onItemClickCallBack -> itemId:${itemId} 自定义语言`);
                NavigationUtil.goPage({
                    navigation: this.props.navigation,
                    title: "自定义语言",
                    isRemoveKey: false,
                    flag: FLAG_LANGUAGE.flag_language,
                }, "CustomKeyLanguagePage");
                break
            case SORT_LANGUAGE_ID:
                console.log(`onItemClickCallBack -> itemId:${itemId} 语言排序`);
                break
            case CUSTOM_KEY_ID:
                console.log(`onItemClickCallBack -> itemId:${itemId} 自定义标签`);
                NavigationUtil.goPage({
                    navigation: this.props.navigation,
                    title: "自定义标签",
                    isRemoveKey: false,
                    flag: FLAG_LANGUAGE.flag_key,
                }, "CustomKeyLanguagePage");
                break
            case SORT_KEY_ID:
                console.log(`onItemClickCallBack -> itemId:${itemId} 标签排序`);
                break
            case REMOVE_KEY_ID:
                console.log(`onItemClickCallBack -> itemId:${itemId} 标签移除`);
                NavigationUtil.goPage({
                    navigation: this.props.navigation,
                    title: "标签移除",
                    isRemoveKey: true,
                    flag: FLAG_LANGUAGE.flag_key,
                }, "CustomKeyLanguagePage");
                break
            case CUSTOM_THEME_ITEM_ID:
                console.log(`onItemClickCallBack -> itemId:${itemId} 自定义主题`);
                const {onShowCustomThemeView} = this.props;
                onShowCustomThemeView(true);
                break
            case ABOUT_AUTHOR_ITEM_ID:
                console.log(`onItemClickCallBack -> itemId:${itemId} 关于作者`);
                NavigationUtil.goPage({
                    theme: this.props.theme,
                    navigation: this.props.navigation,
                }, "AboutMePage");
                break
            case FEEDBACK_ITEM_ID:
                console.log(`onItemClickCallBack -> itemId:${itemId} 反馈`);
                break
            case SHARE_ITEM_ID:
                console.log(`onItemClickCallBack -> itemId:${itemId} 分享`);
                break
        }
    }

    render() {
        const {theme} = this.props;
        let statusBar = {
            backgroundColor: theme.themeColor,
            barStyle: "light-content",
        }
        let navigationBar =
            <NavigationBar
                title={'我的'}
                statusBar={statusBar}
                style={theme.styles.navBar}
                rightButton={this.getRightButton()}
            />

        return (
            <View style={styles.container}>
                {navigationBar}
                <ScrollView>
                    <MoreMenuView
                        bigIcon={true}
                        iconName={"github1"}
                        title={"GitHub"}
                        iconColor={theme.themeColor}
                        showBottomDividerLine={true}
                        itemClick={() => this.onItemClickCallBack(CUSTOM_ABOUT_ITEM_ID)}
                    />
                    <MoreMenuView
                        iconName={"jiaocheng"}
                        title={"教程"}
                        iconColor={theme.themeColor}
                        showBottomDividerLine={false}
                        itemClick={() => this.onItemClickCallBack(TUTORIAL_ITEM_ID)}
                    />
                    <MoreMenuView
                        iconName={"gouxuan"}
                        title={"自定义语言"}
                        iconColor={theme.themeColor}
                        showBottomDividerLine={true}
                        topGroupMark={"趋势管理"}
                        itemClick={() => this.onItemClickCallBack(CUSTOM_LANGUAGE_ID)}
                    />
                    <MoreMenuView
                        iconName={"paixu"}
                        title={"语言排序"}
                        iconColor={theme.themeColor}
                        showBottomDividerLine={false}
                        itemClick={() => this.onItemClickCallBack(SORT_LANGUAGE_ID)}
                    />
                    <MoreMenuView
                        iconName={"gouxuan"}
                        title={"自定义标签"}
                        iconColor={theme.themeColor}
                        showBottomDividerLine={true}
                        topGroupMark={"最热管理"}
                        itemClick={() => this.onItemClickCallBack(CUSTOM_KEY_ID)}
                    />
                    <MoreMenuView
                        iconName={"paixu"}
                        title={"标签排序"}
                        iconColor={theme.themeColor}
                        showBottomDividerLine={true}
                        itemClick={() => this.onItemClickCallBack(SORT_KEY_ID)}
                    />
                    <MoreMenuView
                        iconName={"yichu"}
                        title={"标签移除"}
                        iconColor={theme.themeColor}
                        showBottomDividerLine={false}
                        itemClick={() => this.onItemClickCallBack(REMOVE_KEY_ID)}
                    />

                    <MoreMenuView
                        iconName={"zidingyizhuti"}
                        title={"自定义主题"}
                        iconColor={theme.themeColor}
                        showBottomDividerLine={true}
                        topGroupMark={"设置"}
                        itemClick={() => this.onItemClickCallBack(CUSTOM_THEME_ITEM_ID)}
                    />
                    <MoreMenuView
                        iconName={"zuozhe"}
                        title={"关于作者"}
                        iconColor={theme.themeColor}
                        showBottomDividerLine={true}
                        itemClick={() => this.onItemClickCallBack(ABOUT_AUTHOR_ITEM_ID)}
                    />
                    <MoreMenuView
                        iconName={"wentifankui"}
                        title={"反馈"}
                        iconColor={theme.themeColor}
                        showBottomDividerLine={false}
                        itemClick={() => this.onItemClickCallBack(FEEDBACK_ITEM_ID)}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eeeeee",
    },
    navigationBarButton: {
        fontSize: 16,
        color: "#ffffff",
    },
});
const mapStateToProps = state => ({
    theme: state.theme.theme,
});

const mapDispatchToProps = dispatch => ({
    onShowCustomThemeView: (show) => dispatch(actions.onShowCustomThemeView(show)),
})
export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
