/**
 * @author HaganWu
 * @description
 * @fileName index.js
 * @data 2021/10/27  10:38
 */
import Types from '../../action/types'

const defaultState = {}

/**
 * @description 结果
 *
 * popular:{
 *     java:{
 *         items:[],
 *         isLoading:false,
 *     }
 *      ois:{
 *         items:[],
 *         isLoading:false,
 *     }
 * }
 *
 * @author HaganWu
 * @data 2021/10/27  10:40
 */
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.LOAD_POPULAR_SUCCESS:
            return {
                ...state,
                [action.storeName]: {
                    ...[action.storeName],
                    items: action.items,
                    isLoading: false,
                },
            }
        case Types.POPULAR_REFRESH:
            return {
                ...state,
                [action.storeName]: {
                    ...[action.storeName],
                    isLoading: true,
                },
            };
        case Types.LOAD_POPULAR_FAIL:
            return {
                ...state,
                [action.storeName]: {
                    ...[action.storeName],
                    isLoading: false,
                },
            }
        default:
            return state;
    }
}
