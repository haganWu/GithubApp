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


    /**
     * 跳转到指定页面
     * @param params
     * @param page
     */
    static goPage(params, page) {
        const navigation = NavigationUtil.navigation;
        if (!navigation) {
            console.log('NavigationUtil.navigation can not be null');
            return;
        }
        navigation.navigate(
            page,
            {
                ...params,
            },
        );
    }
}
