/**
 * @author HaganWu
 * @description CustomKeyLanguagePage
 * @fileName CustomKeyLanguagePage.js
 * @data 2021/12/9 14:06
 */
import React from "react";
import {Alert, DeviceInfo, ScrollView, StyleSheet, View} from "react-native";
import BackPressComponent from "../common/BackPressComponent";
import NavigationUtil from "../navigator/NavigationUtil";
import NavigationBar from "../common/NavigationBar";
import ViewUtil from "../util/ViewUtil";
import actions from '../action/index';
import LanguageDao, {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";
import {connect} from 'react-redux';
import IconFont from "../res/iconfont";
import CheckBox from "react-native-check-box";
import ArrayUtil from "../util/ArrayUtil";
import SafeAreaViewPlus from "../common/SafeAreaViewPlus";

const Theme_COLOR = '#7dc5eb';

class CustomKeyLanguagePage extends React.Component {

    constructor(props) {
        super(props);
        this.params = this.props.route.params;
        this.backPress = new BackPressComponent({backPress: () => this.onBackPress()});
        this.changeValues = [];//状态发生变化的key
        this.isRemoveKey = !!this.params.isRemoveKey;
        this.languageDao = new LanguageDao(this.params.flag);
        this.state = {
            keys: [],
            rightButtonTitle: "",
        }
    }

    /**
     * @description 通过onLoadLanguage()加载获取到数据后监听state变化刷新视图
     * @author HaganWu
     * @data 2021/12/10  12:03
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.keys !== CustomKeyLanguagePage._keys(nextProps, null, prevState)) {
            return {
                keys: CustomKeyLanguagePage._keys(nextProps, null, prevState),
            }
        }
        return null;//必须要有返回值，state没有变化的话就返回null
    }

    componentDidMount() {
        this.backPress.componentDidMount();
        //如果props中标签数据为空则从本地存储中获取标签
        if (CustomKeyLanguagePage._keys(this.props).length === 0) {
            let {onLoadLanguage} = this.props;
            onLoadLanguage(this.params.flag);
        }
        this.setState({
            ...this.state,
            keys: CustomKeyLanguagePage._keys(this.props),
        });
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    static _keys(props, original, state) {
        const {flag, isRemoveKey} = props.route.params;
        let key = flag === FLAG_LANGUAGE.flag_key ? "keys" : "languages";
        if (isRemoveKey && !original) {
            //移除标签 并且不需要原始数据  如果state中的keys为空则从props中获取
            return state && state.keys && state.keys.length !== 0 && state.keys || props.language[key].map(val => {
                return {
                    ...val,
                    checked: false,
                };
            });
        } else {
            //自定义语言 / 自定义标签
            return props.language[key];
        }
    }


    onBackPress() {
        console.log('CustomKeyLanguagePage -> onBackPress')
        this.onBack();
        return true;
    }

    /**
     * @description 处理返回点击
     * @author HaganWu
     * @data 2021/12/10  13:08
     */
    onBack() {
        if (this.changeValues && this.changeValues.length > 0) {
            Alert.alert("提示", "是否要保存修改？",
                [
                    {
                        text: "否", onPress: () => {
                            NavigationUtil.goBack(this.props.navigation);
                        }
                    },
                    {
                        text: "是", onPress: () => {
                            this.save();
                        }
                    }
                ]);
        } else {
            NavigationUtil.goBack(this.props.navigation);
        }
    }

    /**
     * @description 保存修改
     * @author HaganWu
     * @data 2021/12/10  13:13
     */
    save() {
        console.log('CustomKeyLanguagePage -> save()');
        if (this.changeValues.length === 0) {
            NavigationUtil.goBack(this.props.navigation);
            return
        }
        let keys;
        if (this.isRemoveKey) {
            //移除标签
            for (let i = 0, l = this.changeValues.length; i < l; i++) {
                ArrayUtil.remove(keys = CustomKeyLanguagePage._keys(this.props, true), this.changeValues[i], "name");
            }
        }
        //保存本地数据
        this.languageDao.save(keys || this.state.keys);
        //更新store数据 刷新”最热“和”趋势“页面数据
        const {onLoadLanguage} = this.props;
        onLoadLanguage(this.params.flag);
        this.changeValues.splice(0, this.changeValues.length);
        NavigationUtil.goBack(this.props.navigation);
    }


    /**
     * @description 复选框点击
     * @author HaganWu
     * @data 2021/12/10  10:30
     */
    onCheckBoxClick(data, index) {
        data.checked = !data.checked;
        ArrayUtil.updateArray(this.changeValues, data);
        console.log(`renderCheckBox -> this.changeValues:${this.changeValues.length}`);
        this.state.keys[index] = data;//更新state刷新视图
        this.setState({
            ...this.state,
            keys: this.state.keys,
        });
        this.setState({
            ...this.state,
            rightButtonTitle: this.changeValues.length > 0 ? (this.isRemoveKey ? "移除" : "保存") : "",
        });
    }

    checkedImage(checked) {
        return <IconFont name={checked ? "yigouxuan" : "weigouxuan"} size={16} color={Theme_COLOR}/>
    }

    renderCheckBox(data, index) {
        return <CheckBox
            style={styles.checkBox}
            onClick={() => this.onCheckBoxClick(data, index)}
            leftText={data.name}
            isChecked={data.checked}
            checkedImage={this.checkedImage(true)}
            unCheckedImage={this.checkedImage(false)}
        />
    }

    renderContentView() {
        let dataArray = this.state.keys;
        if (!dataArray || dataArray.length === 0) return;
        let len = dataArray.length;
        let views = [];
        for (let i = 0, l = len; i < l; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.contentViewContainer}>
                        {this.renderCheckBox(dataArray[i], i)}
                        {i + 1 < len && this.renderCheckBox(dataArray[i + 1], i + 1)}
                    </View>
                    <View style={styles.divider}/>
                </View>
            );
        }
        return views;
    }

    render() {
        const {title} = this.params;
        // let rightButtonTitle = this.isRemoveKey ? '移除' : '保存';
        let navigationBar =
            <NavigationBar
                title={title}
                style={{backgroundColor: Theme_COLOR}}
                leftButton={ViewUtil.getLeftBackButton(() => {
                    this.onBackPress()
                })}
                rightButton={ViewUtil.getRightTextButton(this.state.rightButtonTitle, () => {
                    this.save()
                })}
            />
        return (
            <SafeAreaViewPlus topColor={Theme_COLOR} style={styles.container}>
                {navigationBar}
                <ScrollView>
                    {this.renderContentView()}
                </ScrollView>
            </SafeAreaViewPlus>
        );
    }
}

const
    styles = StyleSheet.create({
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
        contentViewContainer: {
            flexDirection: 'row',
        },
        divider: {
            height: 0.5,
            opacity: 0.5,
            backgroundColor: 'darkgray'
        },
        checkBox: {
            flex: 1,
            paddingHorizontal: 16,
            paddingVertical: 10,
        },
    });
const
    mapStateToProps = state => ({
        language: state.language,
    })
const
    mapDispatchToProps = dispatch => ({
        onLoadLanguage: (flag) => dispatch(actions.onLoadLanguage(flag)),
    })
export default connect(mapStateToProps, mapDispatchToProps)

(
    CustomKeyLanguagePage
)
;
