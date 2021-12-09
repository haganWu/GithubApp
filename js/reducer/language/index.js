/**
 * @author HaganWu
 * @description
 * @fileName index.js
 * @data 2021/10/27  10:38
 */
import Types from '../../action/types'
import {FLAG_LANGUAGE} from "../../expand/dao/LanguageDao";

const defaultState = {
    languages: [],
    keys: [],
}

/**
 * @description
 * @author HaganWu
 * @data 2021/12/9  10:16
 */
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.LANGUAGE_LOAD_SUCCESS://获取数据成功
            if (FLAG_LANGUAGE.flag_key === action.flag) {
                return {
                    ...state,
                    keys: action.languages,
                }
            } else {
                return {
                    ...state,
                    languages: action.languages,
                }
            }

        default:
            return state;
    }
}
