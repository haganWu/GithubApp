/**
 * @author HaganWu
 * @description NavigationUtil
 * @fileName NavigationUtil.js
 * @data 2021/10/19 14:25
 */
import {StackActions} from "@react-navigation/native";

export default class NavigationUtil {

    /**
     * @description 重置到首页
     * @author HaganWu
     * @data 2021/10/19  14:29
     */
    static resetToHomePage(params) {
        const {navigation} = params;
        navigation.dispatch(
            StackActions.replace("HomePage", {}),
        )
    }
}
