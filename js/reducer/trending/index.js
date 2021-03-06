/**
 * @author HaganWu
 * @description
 * @fileName index.js
 * @data 2021/10/28  16:41
 */
import Types from '../../action/types'

const defaultState = {}

/**
 *  @description 结果
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
 * @description
 * @author HaganWu
 * @data 2021/10/28  16:41
 */
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.TRENDING_REFRESH_SUCCESS://下拉刷新成功
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
        case Types.TRENDING_REFRESH://下拉刷新
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true,
                    hideLoadingMore: true,
                },
            };
        case Types.TRENDING_REFRESH_FAIL://下拉刷新失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false,
                    hideLoadingMore: true,
                },
            };
        case Types.TRENDING_LOAD_MORE_SUCCESS://上拉加载更多成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex,
                },
            }
        case Types.TRENDING_LOAD_MORE_FAIL://上拉加载更多失败
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
