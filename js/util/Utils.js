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
}
