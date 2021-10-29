/**
 * @author HaganWu
 * @description DataStore
 * @fileName DataStore.js
 * @data 2021/10/26 16:54
 */
import {AsyncStorage} from "react-native";
import GitHubTrending from "GitHubTrending/trending/GitHubTrending";

export const FLAG_STORAGE = {
    flag_popular: 'popular',
    flag_trending: 'trending',
};

export default class DataStore {


    /**
     * @description 存储本地数据
     * @author HaganWu
     * @data 2021/10/27  10:00
     */
    saveData(url, data, callback) {
        if (!data || !url) return;
        AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback);
    }

    _wrapData(data) {
        return {data: data, timestamp: new Date().getTime()};
    }

    /**
     * 获取本地数据
     * @param url
     * @returns {Promise<unknown>}
     */
    fetchLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                        console.error(e);
                    }
                } else {
                    reject(error);
                    console.error(error);
                }
            })
        })
    }

    /**
     * 获取网络数据
     * @param url
     * @param flag
     * @returns {Promise<unknown>}
     */
    fetchNetData(url, flag) {
        return new Promise((resolve, reject) => {
            if (flag === FLAG_STORAGE.flag_popular) {
                fetch(url)
                    .then((response) => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw  new Error('Network response was not ok!');
                    })
                    .then((responseData) => {
                        this.saveData(url, responseData);
                        resolve(responseData);
                    })
                    .catch(error => {
                        reject(error);
                    })
            } else if (flag === FLAG_STORAGE.flag_trending) {
                const AUTH_TOKEN = 'fd82d1e882462e23b8e88aa82198f166';
                new GitHubTrending(AUTH_TOKEN).fetchTrending(url)
                    .then(items => {
                        if (!items) {
                            throw  new Error("Response data  is empty!")
                        }
                        this.saveData(url, items)
                        resolve(items);
                    })
                    .catch(error => {
                        reject(error);
                    })

            }

        })
    }

    /**
     * 主入口
     * 获取数据 优先从本地获取，如果无本地数据或者本地数据无效，则再从网络获取
     * @param url
     * @param flag
     * @returns {Promise<unknown>}
     */
    fetchData(url, flag) {
        return new Promise((resolve, reject) => {
            this.fetchLocalData(url).then((wrapData) => {
                if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
                    resolve(wrapData);
                } else {
                    this.fetchNetData(url, flag).then((data) => {
                        resolve(this._wrapData(data));
                    }).catch((error) => {
                        reject(error);
                    })

                }
            }).catch(() => {
                this.fetchNetData(url, flag).then((data) => {
                    resolve(this._wrapData(data));
                }).catch((error) => {
                    reject(error);
                })
            })
        })
    }


    /**
     * @description 检查数据有效期
     * @author HaganWu
     * @data 2021/10/27  9:32
     */
    static checkTimestampValid(timestamp) {
        const currentDate = new Date();
        const targetDate = new Date();
        targetDate.setTime(timestamp);
        if (currentDate.getMonth() !== targetDate.getMonth()) {
            return false;
        }
        if (currentDate.getDay() !== targetDate.getDay()) {
            return false;
        }
        //4个小时有效期
        if (currentDate.getHours() - targetDate.getHours() > 4) {
            return false;
        }
        /*//5分钟有效期
        if (currentDate.getMinutes() - targetDate.getMinutes() > 5) {
            return false;
        }*/
        return true;
    }
}
