/**
 * @author HaganWu
 * @description index
 * @fileName index.js
 * @data 2021/10/25 14:52
 */
import Types from "../types"
import ThemeDao from "../../expand/dao/ThemeDao";

/**
 * @description 主题变更 action创建函数
 * @author HaganWu
 * @data 2021/12/10  14:25
 */
export function onThemeChange(theme) {
    return {
        type: Types.THEME_CHANGE,
        theme: theme,
    }
}

/**
 * @description 初始化主题
 * @author HaganWu
 * @data 2021/12/10  14:28
 */
export function onThemeInit() {
    return dispatch => {
        new ThemeDao().getTheme()
            .then((theme) => {
                dispatch(onThemeChange(theme));//通过dispatch()方法把action传给Store
            })
    }
}

/**
 * @description 自定义主题颜色选择弹窗
 * @author HaganWu
 * @data 2021/12/10  14:29
 */
export function onShowCustomThemeView(show) {
    // action创建函数
    console.log(" 查看调用 onShowCustomThemeView 次数");
    return {
        type: Types.SHOW_THEME_VIEW,
        customThemeViewVisible: show,
    }
}
