/**
 * @author HaganWu
 * @description index
 * @fileName index.js
 * @data 2021/12/14 13:16
 */
import Types from '../../action/types'

const defaultState = {
    showText: "搜索",//右侧按钮 搜索/取消
    items: [],//原始数据
    isLoading: false,
    projectModels: [],//要显式的数据
    hideLoadingMore: true,//默认隐藏加载更多
    showBottomAddButton: false,//显式添加按钮
    inputKey: ""
}
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.SEARCH_REFRESH://搜索数据
            return {
                ...state,
                isLoading: true,
                hideLoadingMore: true,
                showBottomAddButton: false,
                showText: "取消",
            };
        case Types.SEARCH_REFRESH_SUCCESS://获取数据成功
            return {
                ...state,
                isLoading: false,
                hideLoadingMore: true,
                showBottomAddButton: action.showBottomAddButton,
                items: action.items,
                projectModels: action.projectModels,
                pageIndex: action.pageIndex,
                showText: "搜索",
                inputKey: action.inputKey,
            };


        case Types.SEARCH_FAIL://下拉刷新失败
            return {
                ...state,
                isLoading: false,
                hideLoadingMore: true,
                showText: "搜索",
            };
        case Types.SEARCH_CANCEL://上拉加载更多成功
            return {
                ...state,
                isLoading: false,
                hideLoadingMore: true,
                showText: "搜索",
            };
        case Types.SEARCH_LOAD_MORE_SUCCESS://上拉加载更多成功
            return {
                ...state,
                isLoading: false,
                hideLoadingMore: true,
                projectModels: action.projectModels,
                pageIndex: action.pageIndex,
            };
        case Types.SEARCH_LOAD_MORE_FAIL://上拉加载更多失败
            return {
                ...state,
                isLoading: false,
                hideLoadingMore: true,
                pageIndex: action.pageIndex,
            };
        default:
            return state;
    }
}
