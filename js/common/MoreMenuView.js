/**
 * @author HaganWu
 * @description MoreMenuView
 * @fileName MoreMenuView.js
 * @data 2021/12/3 15:22
 */
import React from "react";
import {StyleSheet, Text, TouchableOpacity, View, ViewPropTypes} from "react-native";
import PropTypes from "prop-types";
import IconFont from "../res/iconfont";

type Props = {}

class MoreMenuView extends React.Component<Props> {

    //可接受的属性
    static propTypes = {
        style: ViewPropTypes.style,
        bigIcon: PropTypes.bool,//是否显式大图标
        iconName: PropTypes.string,//图标名称
        iconColor: PropTypes.string,//图标颜色
        title: PropTypes.string,//标题
        titleColor: PropTypes.string,//标题颜色
        showBottomDividerLine: PropTypes.bool,//是否显式分割线
        topGroupMark: PropTypes.string,//分组标签
        itemClick: PropTypes.func,//点击回调函数
        haveSubItems: PropTypes.bool,//是否有子菜单
        showSubItems: PropTypes.bool,//是否展开子菜单
        subItems: PropTypes.array,//子菜单集合
        subItemClick: PropTypes.func,//子菜单点击回调函数
    }

    //设置默认属性
    static defaultProps = {
        bigIcon: false,
        iconColor: '#7dc5eb',
        titleColor: 'black',
        showDivider: false,
        haveSubItems: false,
        showSubItems: false,
        subItems: [],
    }

    /**
     * @description 父组件item点击
     * @author HaganWu
     * @data 2021/12/7  17:08
     */
    onItemClick() {
        if (this.props.itemClick) {
            this.props.itemClick();
        }
    }

    /**
     * @description 子菜单点击回调
     * @author HaganWu
     * @data 2021/12/8  9:26
     */
    onSubItemClick(item) {
        if (this.props.subItemClick) {
            this.props.subItemClick(item);
        }
    }

    render() {
        const {
            iconName,
            iconColor,
            bigIcon,
            titleColor,
            title,
            showBottomDividerLine,
            topGroupMark,
            haveSubItems,
            showSubItems,
            subItems,
        } = this.props;

        let groupMakeView = topGroupMark ?
            <View style={{
                backgroundColor: "#eeeeee",
                justifyContent: "center",
                paddingVertical: 4,
                paddingHorizontal: 8
            }}>
                <Text style={{color: "#666666", fontSize: 12}}>{topGroupMark}</Text>
            </View>
            : null

        let subItemComponents = [];
        if (haveSubItems) {
            for (let i = 0; i < subItems.length; i++) {
                subItemComponents.push(
                    <View key={i}>
                        <TouchableOpacity
                            onPress={() => {
                                this.onSubItemClick(subItems[i]);
                            }}>
                            <View style={styles.subInnerContainer}>
                                <Text style={[styles.text, {color: titleColor}]}>{subItems[i].title}</Text>
                                <IconFont
                                    name={"youjiantou"}
                                    color={"darkgray"} size={22}/>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.divider}/>
                    </View>
                )
            }
        }
        return (
            <View>
                {groupMakeView}
                <TouchableOpacity
                    onPress={() => {
                        this.onItemClick();
                    }}>
                    <View style={styles.innerContainer}>
                        <IconFont name={iconName} color={iconColor}
                                  size={bigIcon ? 66 : 22}/>
                        <Text style={[styles.text, {color: titleColor}]}>{title}</Text>
                        <IconFont
                            name={haveSubItems ? (showSubItems ? "shangjiantou" : "xiajiantou") : "youjiantou"}
                            color={iconColor} size={22}/>
                    </View>
                    {showBottomDividerLine ? <View style={styles.divider}/> : null}
                </TouchableOpacity>
                {(haveSubItems && showSubItems) ? subItemComponents : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#ffffff',
    },

    subInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 38,
        paddingRight: 16,
        paddingVertical: 16,
        backgroundColor: '#ffffff',
    },
    text: {
        flex: 1,
        fontSize: 14,
        marginLeft: 12,
    },
    divider: {
        height: 0.5,
        opacity: 0.5,
        backgroundColor: 'darkgray'
    }
})

export default MoreMenuView;
