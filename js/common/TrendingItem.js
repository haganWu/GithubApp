/**
 * @author HaganWu
 * @description TrendingItem
 * @fileName TrendingItem.js
 * @data 2021/10/27 15:19
 */
import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import IconFont from "../res/iconfont";
import HTMLView from "react-native-htmlview"

class TrendingItem extends React.Component {
    render() {
        const {item} = this.props;
        if (!item) {
            return null;
        }
        let descriptionContent = '<p>' + item["description"] + '</p>'
        return (
            <TouchableOpacity
                onPress={this.props.onItemClick}
            >
                <View style={styles.itemContainer}>
                    <Text style={styles.fullNameText}>{item["full_name"]}</Text>
                    <HTMLView
                        // style={styles.descriptionText}
                        value={descriptionContent}
                        // onLinkPress={(url) => {
                        //     //根据url跳转到指定页面
                        // }}
                    />
                    <Text ellipsizeMode={'tail'} numberOfLines={3}
                          style={styles.descriptionText}>{item["meta"]}  </Text>

                    <View style={styles.bottomContainer}>
                        <Text style={styles.authorText}>Contributors:</Text>
                        {item.contributors.map((result, i, arr) => {
                            return <Image
                                key={i}
                                source={{uri: arr[i]}}
                                style={styles.avatarImage}
                            />
                        })}

                        <TouchableOpacity onPress={this.props.onCollectionClick}>
                            <IconFont name={'collection'} size={30}/>
                        </TouchableOpacity>

                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        marginTop: 10,
        marginHorizontal: 4,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 4,
        backgroundColor: 'white',
        shadowColor: "gray",
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2,
    },
    fullNameText: {
        fontSize: 18,
        fontWeight: "900",
    },
    descriptionText: {
        fontSize: 16,
        color: 'gray',
    },
    bottomContainer: {
        flexDirection: "row",
        marginTop: 12,
        alignItems: 'center',
    },
    authorText: {
        fontSize: 18,
    },
    avatarImage: {
        width: 38,
        height: 38,
        borderRadius: 4,
        margin: 2,
    },
    startText: {
        fontSize: 18,
        flex: 1,
        textAlign: 'center',
    },
})

export default TrendingItem;
