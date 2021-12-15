import {Linking} from "react-native";

/**
 * @author HaganWu
 * @description Utils
 * @fileName Utils.js
 * @data 2021/11/23 16:22
 */
export default class Utils {
    static checkIsFavorite(item, keys = []) {
        if (!keys) {
            return false;
        }
        for (let i = 0, len = keys.length; i < len; i++) {
            let id = item.id;
            if (id.toString() === keys[i]) {
                return true;
            }
        }
        return false;
    }

    static sendEmail(url) {
        Linking.canOpenURL(url)
            .then(support => {
                if (!support) {
                    console.log(`无法处理：${url}`);
                } else {
                    Linking.openURL(url);
                }
            }).catch(error => {
            console.error("An error occurred", error);
        });
    }

    /**
     * @description 检查key是否存在于keys中
     * @author HaganWu
     * @data 2021/12/15  15:18
     */
    static checkKeyIsExist(keys, key) {
        for (let i = 0, l = keys.length; i < l; i++) {
            if (key && key.toLowerCase() === keys[i].name.toLowerCase()) {
                console.log(`搜索关键字${key}已存在`);
                return true;
            }
        }
        console.log(`搜索关键字${key}不存在`);
        return false;
    }
}
