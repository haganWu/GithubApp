/**
 * @author HaganWu
 * @description theme
 * @fileName index.js
 * @data 2021/10/25 14:11
 */
import Types from '../../action/types'

const defaultState = {
    theme: 'blue',
}
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.THEME_CHANGE:
            return {
                ...state,
                theme: action.theme,
            };
        default:
            return state;
    }
}
