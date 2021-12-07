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

class MoreMenuView extends React.Component {
    //可接受的属性
    static propTypes = {
        style: ViewPropTypes.style,
        bigIcon: PropTypes.bool,//是否显式大图标
        iconName: PropTypes.string,//图标名称
        iconColor: PropTypes.string,//图标颜色
        title: PropTypes.string,//标题
        titleColor: PropTypes.string,//标题颜色
        nextIcon: PropTypes.string,//右侧icon，默认为右箭头
        showBottomDividerLine: PropTypes.bool,//是否显式分割线
        topGroupMark: PropTypes.string,//分组标签
        itemClick: PropTypes.func,//点击回调函数
    }

    //设置默认属性
    static defaultProps = {
        bigIcon: false,
        nextIcon: 'youjiantou',
        iconColor: '#7dc5eb',
        titleColor: 'black',
        showDivider: false,
    }

    onItemClick() {
        if (this.props.itemClick) {
            this.props.itemClick();
        }
    }

    render() {
        const {
            iconName,
            iconColor,
            bigIcon,
            titleColor,
            title,
            nextIcon,
            showBottomDividerLine,
            topGroupMark
        } = this.props;


        return (
            <View>
                {
                    topGroupMark ?
                        <View style={{
                            backgroundColor: "#eeeeee",
                            justifyContent: "center",
                            paddingVertical: 4,
                            paddingHorizontal: 8
                        }}>
                            <Text style={{color: "#666666", fontSize: 12}}>{topGroupMark}</Text>
                        </View>
                        : null
                }
                <TouchableOpacity
                    onPress={() => {
                        this.onItemClick();
                    }}>


                    <View style={styles.innerContainer}>
                        <IconFont name={iconName} color={iconColor}
                                  size={bigIcon ? 66 : 22}/>
                        <Text style={[styles.text, {color: titleColor}]}>{title}</Text>
                        <IconFont name={nextIcon} color={iconColor} size={22}/>
                    </View>
                    {showBottomDividerLine ? <View style={styles.divider}/> : null}

                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    innerContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 16,
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
