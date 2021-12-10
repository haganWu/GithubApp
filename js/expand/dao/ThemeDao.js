/**
 * @author HaganWu
 * @description 保存主题
 * @fileName ThemeDao.js
 * @data 2021/12/10 14:13
 */
import {AsyncStorage} from "react-native";
import ThemeFactory, {ThemeFlags} from "../../res/styles/ThemeFactory";

//根据key从数据库中获取主题
const THEME_KEY = "theme_key";

class ThemeDao {

    /**
     * @description 获取当前主题
     * @author HaganWu
     * @data 2021/12/10  14:14
     */
    getTheme() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(THEME_KEY, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (!result) {
                    this.save(ThemeFlags.Default);
                    result = ThemeFlags.Default;
                }
                resolve(ThemeFactory.createTheme(result));
            })
        });
    }

    /**
     * @description 保存主题
     * @author HaganWu
     * @data 2021/12/10  14:20
     */
    save(themeFlag) {
        AsyncStorage.setItem(THEME_KEY, themeFlag, error => {
            console.log(error);
        });
    }
}

export default ThemeDao;
