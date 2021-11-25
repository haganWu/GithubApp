/**
 * @author HaganWu
 * @description FavoriteUtil
 * @fileName FavoriteUtil.js
 * @data 2021/11/24 15:21
 */
export default class FavoriteUtil {

    /**
     * 处理 点击 收藏/取消收藏
     * @param favoriteDao
     * @param item
     * @param isFavorite
     */
    static onFavorite(favoriteDao, item, isFavorite) {
        const key = item.id.toString();
        console.log(`onFavorite --> item.id.toString:${item.id.toString()},key:${key}`)
        if (isFavorite) {
            favoriteDao.saveFavoriteItem(key, JSON.stringify(item));
        } else {
            favoriteDao.removeFavoriteItem(key);
        }
    }
}
