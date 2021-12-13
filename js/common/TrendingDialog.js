/**
 * @author HaganWu
 * @description TrendingDialog
 * @fileName TrendingDialog.js
 * @data 2021/10/29 10:17
 */
import React from "react";
import {DeviceInfo, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import IconFont from "../res/iconfont";
import TimeSpan from "../model/TimeSpan";

export const TIME_SPANS = [new TimeSpan('今天', 'daily'), new TimeSpan('本周', 'weekly'), new TimeSpan('本月', 'monthly')]

class TrendingDialog extends React.Component {

    state = {
        visible: false,
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

    render() {
        const {onClose, onSelect} = this.props
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => onClose}
            >
                <TouchableOpacity
                    style={styles.touchableContainer}
                    onPress={() => this.dismiss()}
                >
                    <IconFont style={styles.triangle} name={'triangle-up'} size={36} color={'white'}/>

                    <View style={styles.content}>
                        {
                            TIME_SPANS.map((result, i, arr) => {
                                return <TouchableOpacity
                                    key={i}
                                    onPress={() => onSelect(arr[i])}
                                    underlayColor="transparent"
                                >
                                    <View key={i}>
                                        <Text style={styles.showTextStyle}>{arr[i].showText}</Text>
                                        {i !== TIME_SPANS.length - 1 ? <View style={styles.line}/> : null}
                                    </View>
                                </TouchableOpacity>
                            })
                        }
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    touchableContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        paddingTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0,
    },
    triangle: {
        marginTop: 30,
        color: 'white',
        padding: 0,
        marginBottom: -15,
    },
    content: {
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 4,
        paddingVertical: 6,
    },
    showTextStyle: {
        fontSize: 16,
        color: 'black',
        fontWeight: '400',
        paddingVertical: 12,
        paddingHorizontal: 36,
    },
    line: {
        height: 0.3,
        backgroundColor: '#e1e1e1',
    },
})

export default TrendingDialog;
