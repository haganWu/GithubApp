/**
 * @author HaganWu
 * @description LanguageDao
 * @fileName LanguageDao.js
 * @data 2021/12/8 16:47
 */
import {AsyncStorage} from "react-native";
import langs from "../../res/data/langs.json"
import keys from "../../res/data/keys.json"

export const FLAG_LANGUAGE = {
    flag_language: "language_dao_language",//趋势模块加载语言
    flag_key: "language_dao_key"//最热模块加载标签
}
export default class LanguageDao {
    constructor(flag) {
        this.flag = flag;
    }

    /**
     * 获取语言/标签数据，优先从AsyncStorage中获取
     * @returns {Promise<unknown>}
     */
    fetch() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.flag, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (!result) {
                    //数据为空取本地json配置文件中的数据
                    let data = this.flag === FLAG_LANGUAGE.flag_language ? langs : keys;
                    //保存数据到AsyncStorage
                    this.save(data);
                    resolve(data);
                } else {
                    try {
                        //解析成对象返回给调用者
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                    }
                }
            })
        })
    }

    save(objectData) {
        AsyncStorage.setItem(this.flag, JSON.stringify(objectData), (error, result) => {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
            }
        });
    }

}
