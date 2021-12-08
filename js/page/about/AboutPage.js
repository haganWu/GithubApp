/**
 * @author HaganWu
 * @description MyPage
 * @fileName MyPage.js
 * @data 2021/10/14 14:04
 */
import React from "react";
import {StyleSheet, View} from "react-native";
import actions from "../../action";
import {connect} from "react-redux";
import AboutCommon, {FLAG_ABOUT} from "./AboutCommon";
import config from "../../res/data/config.json"
import MoreMenuView from "../../common/MoreMenuView";
import Utils from "../../util/Utils";
import NavigationUtil from "../../navigator/NavigationUtil";

const ABOUT_TUTORIAL_ITEM_ID = 0x0012;
const ABOUT_ABOUT_AUTHOR_ITEM_ID = 0x0013;
const ABOUT_FEEDBACK_ITEM_ID = 0x0014;
type Props = {}

class AboutPage extends React.Component<Props> {
    constructor(props) {
        super(props);
        this.params = this.props.route.params;
        this.aboutCommon = new AboutCommon(
            {
                ...this.params,
                navigation: this.props.navigation,
                flagAbout: FLAG_ABOUT.flag_about,
            },
            data => this.setState({...data})
        );
        this.state = {
            data: config,
        }
    }

    onItemClickCallBack(itemId) {
        switch (itemId) {
            case ABOUT_TUTORIAL_ITEM_ID:
                console.log(`onItemClickCallBack -> itemId:${itemId} 关于 -> 教程`);
                break
            case ABOUT_ABOUT_AUTHOR_ITEM_ID:
                console.log(`onItemClickCallBack -> itemId:${itemId} 关于 -> 关于作者`);
                NavigationUtil.goPage({
                    navigation: this.props.navigation,
                }, "AboutMePage");
                break
            case ABOUT_FEEDBACK_ITEM_ID://反馈
                //发送邮件
                const url = 'wuhh@csco.com.cn';
                Utils.sendEmail(url);
                break
        }
    }

    render() {
        const contentView = <View style={styles.container}>
            <MoreMenuView
                iconName={"jiaocheng"}
                title={"教程"}
                showBottomDividerLine={true}
                itemClick={() => this.onItemClickCallBack(ABOUT_TUTORIAL_ITEM_ID)}
            />
            <MoreMenuView
                iconName={"zuozhe"}
                title={"关于作者"}
                showBottomDividerLine={true}
                itemClick={() => this.onItemClickCallBack(ABOUT_ABOUT_AUTHOR_ITEM_ID)}
            />
            <MoreMenuView
                iconName={"wentifankui"}
                title={"反馈"}
                showBottomDividerLine={false}
                itemClick={() => this.onItemClickCallBack(ABOUT_FEEDBACK_ITEM_ID)}
            />
        </View>
        return this.aboutCommon.render(contentView, this.state.data.app);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eeeeee",
    },
});
const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
})
export default connect(null, mapDispatchToProps)(AboutPage);
