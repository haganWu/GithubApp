/**
 * @author HaganWu
 * @description DetailPage
 * @fileName DetailPage.js
 * @data 2021/10/22 16:09
 */
import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import NavigationBar from "../../common/NavigationBar";
import ViewUtil from "../../util/ViewUtil";
import NavigationUtil from "../../navigator/NavigationUtil";
import IconFont from "../../res/iconfont";

const Theme_COLOR = '#7dc5eb';
type Props = {};
const TRENDING_URL = "https://github.com/";

class DetailPage extends React.Component<Props> {

    constructor(props) {
        super(props);
        //导航接收值
        this.params = this.props.route.params;
        const {projectModel} = this.params;
        const title = projectModel['full_name'];
        this.url = projectModel['html_url'] || TRENDING_URL + projectModel.fullName;
        console.log(`DetailPage -> title:${title}, url:${this.url}`);

        this.state = {
            title: title,
            url: this.url,
            canGoBack: false,
        }
    }

    onBack() {
        NavigationUtil.goBack(this.props.navigation);
    }

    shareClick() {
        console.log("Share Click!")
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
        let navigationBar =
            <NavigationBar
                title={this.state.title}
                style={{backgroundColor: Theme_COLOR}}
                leftButton={ViewUtil.getLeftBackButton(() => {
                    this.onBack()
                })}
                rightButton={this.renderRightButton()}
            />
        return (
            <View style={styles.container}>
                {navigationBar}
                <View style={styles.contentContainer}>
                    <Text style={styles.text}>DetailPage</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
