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
 * favorite:{
 *     popular:{
 *         projectModels:[],
 *         isLoading:false,
 *     }
 *      trending:{
 *         projectModels:[],
 *         isLoading:false,
 *     }
 * }
 *
 * @author HaganWu
 * @data 2021/10/27  10:40
 */
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.FAVORITE_LOAD_DATA://获取收藏数据
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true,
                },
            }
        case Types.FAVORITE_LOAD_SUCCESS://获取数据成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModes: action.projectModes,//此次要展示的数据
                    isLoading: false,
                },
            };
        case Types.FAVORITE_LOAD_FAIL://下拉刷新失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false,
                },
            };
        default:
            return state;
    }
}
