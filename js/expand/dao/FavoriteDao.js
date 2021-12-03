/**
 * @author HaganWu
 * @description favoriteDao
 * @fileName FavoriteDao.js
 * @data 2021/11/23 10:02
 */
import {AsyncStorage} from "react-native";

const FAVORITE_KEY_PREFIX = 'favorite_'
export default class FavoriteDao {
    constructor(flag) {
        this.favoriteKey = FAVORITE_KEY_PREFIX + flag;
    }

    /**
     * 收藏项目
     * @param key 项目id
     * @param value 收藏的项目
     */
    saveFavoriteItem(key, value) {
        AsyncStorage.setItem(key, value, (error) => {
            if (!error) {
                this.updateFavoriteKeys(key, true);
            }
        })
    }


    updateFavoriteKeys(key, isAdd) {
        AsyncStorage.getItem(this.favoriteKey, (error, result) => {
            if (!error) {
                let favoriteKeys = [];
                if (result) {
                    favoriteKeys = JSON.parse(result);
                }
                let index = favoriteKeys.indexOf(key);
                if (isAdd) {
                    if (index === -1) {
                        favoriteKeys.push(key);
                    }
                } else {
                    if (index !== -1) {
                        favoriteKeys.splice(index, 1)
                    }
                }
                AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys))
            }
        })
    }

    getAllFavoriteKeys() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.favoriteKey, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(error);
                }
            })
        })
    }

    /**
     * 取消收藏项目
     * @param key 项目id
     */
    removeFavoriteItem(key) {
        AsyncStorage.removeItem(key, (error) => {
            if (!error) {
                console.log(`FavoriteDao 取消收藏--》key:${key}`);
                this.updateFavoriteKeys(key, false);
            }
        });
    }

    /**
     * 获取所有收藏的项目
     */
    getAllItems() {
        return new Promise((resolve, reject) => {
            this.getAllFavoriteKeys().then((keys) => {
                let items = [];
                if (keys) {
                    AsyncStorage.multiGet(keys, (err, stores) => {
                        try {
                            stores.map((result, i, store) => {
                                // let key = store[i][0];
                                let value = store[i][1];
                                if (value) {
                                    items.push(JSON.parse(value));
                                }
                            });
                            resolve(items);
                        } catch (e) {
                            reject(e);
                        }
                    });
                } else {
                    resolve(items);
                }
            }).catch((e) => {
                reject(e);
            })
        })
    }
}
