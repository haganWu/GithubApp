/**
 * @author HaganWu
 * @description  reducer 根据action修改state将其转变成下一个state （previousState, action) => newState
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
                    projectModels: action.projectModels,//此次刷新后要展示的数据
                    isLoading: false,
                    hideLoadingMore: true,
                    pageIndex: action.pageIndex,
                },
            }
        case Types.POPULAR_REFRESH://下拉刷新
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true,
                    hideLoadingMore: true,
                },
            };
        case Types.POPULAR_REFRESH_FAIL://下拉刷新失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false,
                    hideLoadingMore: true,
                },
            };
        case Types.POPULAR_LOAD_MORE_SUCCESS://上拉加载更多成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
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
        case Types.PLUSH_POPULAR_FAVORITE_STATE://刷新收藏状态
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                },
            }
        default:
            return state;
    }
}
