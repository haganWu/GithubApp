/**
 * @author HaganWu
 * @description PopularItem
 * @fileName PopularItem.js
 * @data 2021/10/27 15:19
 */
import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import BaseItem from "./BaseItem";
import PropTypes from "prop-types";
import {FLAG_STORAGE} from "../expand/dao/DataStore";
import HTMLView from "react-native-htmlview";

class FavoriteItem extends BaseItem {

    static propTypes = {
        flag: PropTypes.string,
    }

    render() {
        const {projectModel, flag} = this.props;
        const item = projectModel.item;
        let itemView;
        if (flag === FLAG_STORAGE.flag_popular) {
            if (!item || !item["owner"]) {
                return null;
            }
            itemView = <TouchableOpacity
                onPress={() => {
                    this.onItemClick();
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
                        {this._favoriteIcon()}
                    </View>
                </View>
            </TouchableOpacity>
        } else if (flag === FLAG_STORAGE.flag_trending) {
            if (!item) {
                return null;
            }
            let descriptionContent = '<p>' + item["description"] + '</p>'
            itemView = <TouchableOpacity
                onPress={() => {
                    this.onItemClick()
                }}
            >
                <View style={styles.itemContainer}>
                    <Text style={styles.fullNameText}>{item["fullName"]}</Text>
                    <HTMLView
                        value={descriptionContent}
                    />
                    <Text ellipsizeMode={'tail'} numberOfLines={3}
                          style={styles.descriptionText}>{item["meta"]}  </Text>

                    <View style={styles.bottomContainer}>
                        <View style={styles.contributorsContainer}>
                            <Text style={styles.authorText}>Contributors:</Text>
                            {
                                item.contributors.slice(0, item.contributors.length <= 3 ? item.contributors.length : 3).map((result, i, arr) => {
                                    return <Image
                                        key={i}
                                        source={{uri: arr[i]}}
                                        style={styles.trendingAvatarImage}
                                    />
                                })
                            }
                        </View>
                        {this._favoriteIcon()}
                    </View>
                </View>
            </TouchableOpacity>
        }
        return itemView;
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
    contributorsContainer: {
        flexDirection: "row",
        flex: 1,
        alignItems: 'center',
    },
    trendingAvatarImage: {
        width: 38,
        height: 38,
        borderRadius: 4,
        margin: 2,
    },
})

export default FavoriteItem;
