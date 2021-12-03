import {FLAG_STORAGE} from "../expand/dao/DataStore";

/**
 * @author HaganWu
 * @description FavoriteUtil
 * @fileName FavoriteUtil.js
 * @data 2021/11/24 15:21
 */
export default class FavoriteUtil {


    /**
     * 处理 点击 收藏/取消收藏
     * @param flag
     * @param favoriteDao
     * @param item
     * @param isFavorite
     */
    static onFavorite(flag,favoriteDao, item, isFavorite) {
        let key = flag === FLAG_STORAGE.flag_popular ? item.id.toString() + item["full_name"] :
            item.id.toString() + item["fullName"];
        console.log(`FavoriteUtil onFavorite --> item.id.toString:${item.id.toString()},key:${key}`)
        if (isFavorite) {
            favoriteDao.saveFavoriteItem(key, JSON.stringify(item));
        } else {
            favoriteDao.removeFavoriteItem(key);
        }
    }
}
