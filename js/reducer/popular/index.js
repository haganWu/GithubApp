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
        case Types.POPULAR_REFRESH_SUCCESS://下拉刷新成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    items: action.items,//原始数据
                    projectModes: action.projectModes,//此次刷新后要展示的数据
                    isLoading: false,
                    hideLoadingMore: false,
                    pageIndex: action.page,
                },
            }
        case Types.POPULAR_REFRESH://下拉刷新
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true,
                },
            };
        case Types.POPULAR_REFRESH_FAIL://下拉刷新失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false,
                },
            };
        case Types.POPULAR_LOAD_MORE_SUCCESS://上拉加载更多成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModes: action.projectModes,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex,
                },
            }
        case Types.POPULAR_LOAD_MORE_FAIL://上拉加载更多失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    hideLoadingMore: true,
                    pageIndex: action.pageIndex,
                },
            }
        default:
            return state;
    }
}
