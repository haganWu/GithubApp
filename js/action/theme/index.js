/**
 * @author HaganWu
 * @description index
 * @fileName index.js
 * @data 2021/10/25 14:52
 */
import Types from "../types"

export function onThemeChange(theme) {
    return {type: Types.THEME_CHANGE, theme: theme}
}
