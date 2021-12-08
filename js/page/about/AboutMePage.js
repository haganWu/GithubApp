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

//父菜单点击标识
//教程
const ABOUT_ME_TUTORIAL_ITEM_ID = 0x0015;
//技术博客
const ABOUT_ME_BLOG_ITEM_ID = 0x0016;
//技术交流群
const ABOUT_ME_QQ_ITEM_ID = 0x0017;
//联系方式
const ABOUT_ME_CONTACT_ITEM_ID = 0x0018;

type Props = {}

//网络配置文件格式错误，使用本地数据
const CONTACT_DATA = [
    {
        title: "QQ",
        account: "1586866509"
    },
    {
        title: "Email",
        account: "crazycodeboy@gmail.com"
    }

]

class AboutMePage extends React.Component<Props> {
    constructor(props) {
        super(props);
        this.params = this.props.route.params;
        this.aboutCommon = new AboutCommon(
            {
                ...this.params,
                navigation: this.props.navigation,
                flagAbout: FLAG_ABOUT.flag_about_me,
            },
            data => this.setState({...data})
        );
        this.state = {
            data: config,
            showTutorial: true,
            showBlog: false,
            showQQ: false,
            showContact: false,
        }
    }

    /**
     * 父控件点击回调
     * @param itemId
     * @param isShow
     */
    onItemClickCallBack(itemId, isShow) {

        switch (itemId) {
            case ABOUT_ME_TUTORIAL_ITEM_ID:
                if (isShow) {
                    this.setState({
                        ...this.state,
                        showTutorial: false,
                    });
                } else {
                    this.setState({
                        ...this.state,
                        showTutorial: true,
                        showBlog: false,
                        showQQ: false,
                        showContact: false,
                    });
                }
                break
            case ABOUT_ME_BLOG_ITEM_ID:
                if (isShow) {
                    this.setState({
                        ...this.state,
                        showBlog: false,
                    });
                } else {
                    this.setState({
                        ...this.state,
                        showBlog: true,
                        showTutorial: false,
                        showQQ: false,
                        showContact: false,
                    });
                }
                break
            case ABOUT_ME_QQ_ITEM_ID:
                if (isShow) {
                    this.setState({
                        ...this.state,
                        showQQ: false,
                    });
                } else {
                    this.setState({
                        ...this.state,
                        showQQ: true,
                        showBlog: false,
                        showTutorial: false,
                        showContact: false,
                    });
                }
                break
            case ABOUT_ME_CONTACT_ITEM_ID:
                if (isShow) {
                    this.setState({
                        ...this.state,
                        showContact: false,
                    });
                } else {
                    this.setState({
                        ...this.state,
                        showContact: true,
                        showQQ: false,
                        showBlog: false,
                        showTutorial: false,
                    });
                }
                break
        }
    }

    /**
     * 子控件点击回调
     * @param subClickItemTitle
     */
    onSubItemClickCallBack(subClickItemTitle) {
        switch (subClickItemTitle) {
            case "React Native基础教程":
                console.log(`onItemClickCallBack -> subClickItemTitle:${subClickItemTitle}`);
                break
            case "React Native高级实战教程":
                console.log(`onItemClickCallBack -> subClickItemTitle:${subClickItemTitle}`);
                break
            case "个人博客":
                console.log(`onItemClickCallBack -> subClickItemTitle:${subClickItemTitle}`);
                break
            case "CSDN":
                console.log(`onItemClickCallBack -> subClickItemTitle:${subClickItemTitle}`);
                break
            case "简书":
                console.log(`onItemClickCallBack -> subClickItemTitle:${subClickItemTitle}`);
                break
            case "GitHub":
                console.log(`onItemClickCallBack -> subClickItemTitle:${subClickItemTitle}`);
                break
            case "慕课网":
                console.log(`onItemClickCallBack -> subClickItemTitle:${subClickItemTitle}`);
                break
            case "移动开发者技术分享群":
                console.log(`onItemClickCallBack -> subClickItemTitle:${subClickItemTitle}`);
                break
            case "React Native学习交流群":
                console.log(`onItemClickCallBack -> subClickItemTitle:${subClickItemTitle}`);
                break
            case "QQ":
                console.log(`onItemClickCallBack -> subClickItemTitle:${subClickItemTitle}`);
                break
            case "Email":
                console.log(`onItemClickCallBack -> subClickItemTitle:${subClickItemTitle}`);
                break
        }
    }


    render() {

        const contentView = <View style={styles.container}>
            <MoreMenuView
                iconName={"jiaocheng"}
                title={"教程"}
                haveSubItems={true}
                showBottomDividerLine={true}
                subItems={this.state.data.aboutMe.Tutorial.items}
                itemClick={() => this.onItemClickCallBack(ABOUT_ME_TUTORIAL_ITEM_ID, this.state.showTutorial)}
                subItemClick={(subClickItemTitle) => this.onSubItemClickCallBack(subClickItemTitle)}
                showSubItems={this.state.showTutorial}
            />
            <MoreMenuView
                iconName={"Computer"}
                title={"技术博客"}
                haveSubItems={true}
                showBottomDividerLine={true}
                subItems={this.state.data.aboutMe.Blog.items}
                itemClick={() => this.onItemClickCallBack(ABOUT_ME_BLOG_ITEM_ID, this.state.showBlog)}
                subItemClick={(subClickItemTitle) => this.onSubItemClickCallBack(subClickItemTitle)}
                showSubItems={this.state.showBlog}
            />
            <MoreMenuView
                iconName={"qqqun"}
                title={"技术交流群"}
                haveSubItems={true}
                showBottomDividerLine={true}
                subItems={this.state.data.aboutMe.QQ.items}
                itemClick={() => this.onItemClickCallBack(ABOUT_ME_QQ_ITEM_ID, this.state.showQQ)}
                subItemClick={(subClickItemTitle) => this.onSubItemClickCallBack(subClickItemTitle)}
                showSubItems={this.state.showQQ}
            />
            <MoreMenuView
                iconName={"lianxifangshi"}
                title={"联系方式"}
                haveSubItems={true}
                showBottomDividerLine={true}
                subItems={CONTACT_DATA}
                itemClick={() => this.onItemClickCallBack(ABOUT_ME_CONTACT_ITEM_ID, this.state.showContact)}
                subItemClick={(subClickItemTitle) => this.onSubItemClickCallBack(subClickItemTitle)}
                showSubItems={this.state.showContact}
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
export default connect(null, mapDispatchToProps)(AboutMePage);
