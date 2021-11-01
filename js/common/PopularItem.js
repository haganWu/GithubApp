/**
 * @author HaganWu
 * @description PopularItem
 * @fileName PopularItem.js
 * @data 2021/10/27 15:19
 */
import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import IconFont from "../res/iconfont";
import NavigationUtil from "../navigator/NavigationUtil";

class PopularItem extends React.Component {


    goToDetail(item) {
        //导航传值
        NavigationUtil.goPage({
            projectModel: item,
        }, "DetailPage");
    }

    render() {
        const {item} = this.props;
        if (!item || !item["owner"]) {
            return null;
        }
        return (
            <TouchableOpacity
                onPress={() => {
                    console.log(`trans --> detailUrl:${item["html_url"]}`);
                    this.goToDetail(item);
                }}
            >
                <View style={styles.itemContainer}>
                    <Text style={styles.fullNameText}>{item["full_name"]}</Text>
                    <Text ellipsizeMode={'tail'} numberOfLines={3}
                          style={styles.descriptionText}>{item["description"]}</Text>

                    <View style={styles.bottomContainer}>
                        <Text style={styles.authorText}>Author:</Text>
                        <Image source={{uri: item["owner"]["avatar_url"]}} style={styles.avatarImage}/>
                        <Text style={styles.startText}>Start:{item["stargazers_count"]}</Text>
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
    },
    startText: {
        fontSize: 18,
        flex: 1,
        textAlign: 'center',
    },
})

export default PopularItem;
