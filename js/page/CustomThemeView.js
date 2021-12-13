/**
 * @author HaganWu
 * @description 自定义主题弹窗
 * @fileName CustomThemeView.js
 * @data 2021/12/10  14:44
 */
import React from "react";
import {
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";
import ThemeDao from "../expand/dao/ThemeDao";
import GlobalStyles from "../res/styles/GlobalStyles";
import ThemeFactory, {ThemeFlags} from "../res/styles/ThemeFactory";
import actions from "../action"
import {connect} from "react-redux";


class CustomThemeView extends React.Component {

    constructor(props) {
        super(props);
        this.themeDao = new ThemeDao();
    }

    show() {
        this.setState({
            visible: true,
        })
    }

    dismiss() {
        this.setState({
            visible: false,
        })
    }

    /**
     * @description 颜色选择点击
     * @author HaganWu
     * @data 2021/12/10  15:35
     */
    onSelectTheme(themeKey) {
        console.log(`themeKey:${themeKey}`);
        this.props.onClose();
        this.themeDao.save(ThemeFlags[themeKey]);
        //发送action state树中theme发生变化，其他页面主题发生变化
        const {onThemeChange} = this.props;
        onThemeChange(ThemeFactory.createTheme(ThemeFlags[themeKey]));
    }

    getThemeItem(themeKey) {
        return <TouchableHighlight
            style={{flex: 1}}
            underlayColor={"white"}
            onPress={() => this.onSelectTheme(themeKey)}
        >
            <View style={[{backgroundColor: ThemeFlags[themeKey]}, styles.themeItem]}>
                <Text style={styles.themeText}>{themeKey} < /Text>
            </View>
        </TouchableHighlight>

    }

    renderThemeItems() {
        const views = [];
        for (let i = 0, keys = Object.keys(ThemeFlags), l = keys.length; i < l; i += 3) {
            const key1 = keys[i], key2 = keys[i + 1], key3 = keys[i + 2];
            views
                .push(
                    <View key={i} style={styles.itemLineContainer}>
                        {this.getThemeItem(key1)}
                        {i + 1 < l && this.getThemeItem(key2)}
                        {i + 2 < l && this.getThemeItem(key3)}
                    </View>
                )
        }
        return views;
    }


    renderContentView() {
        return (
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {
                    this.props.onClose();
                }}
            >
                <View style={styles.modalContainer}>
                    <ScrollView>
                        {this.renderThemeItems()}
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    render() {
        return this.props.visible ?
            <View style={GlobalStyles.root_container}>
                {this.renderContentView()}
            </View> : null
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        margin: 10,
        marginTop: Platform.OS === "ios" ? 20 : 10,
        backgroundColor: "white",
        borderRadius: 3,
        shadowColor: "gray",
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        marginVertical: 3,
    },
    itemLineContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    themeItem: {
        flex: 1,
        height: 120,
        margin: 3,
        padding: 3,
        borderRadius: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    themeText: {
        color: "white",
        fontWeight: "800",
        fontSize: 16,
    }
})
const mapStateToProps = state => ({
    theme: state.theme,
});
const mapDispatchToProps = dispatch => ({
    onThemeChange: (theme) => dispatch(actions.onThemeChange(theme)),
})
export default connect(mapStateToProps, mapDispatchToProps)(CustomThemeView);
