/**
 * @author HaganWu
 * @description index
 * @fileName index.js
 * @data 2021/10/25 14:52
 */
import Types from "../types"
import DataStore, {FLAG_STORAGE} from "../../expand/dao/DataStore";
import dealWithData, {_projectModels} from "../ActionUtil";

/**
 * @description  发送请求（由PopularPage页面中发起） 获取最热数据的异步action(action数据会流转到reducer)
 * @author HaganWu
 * @data 2021/10/27  10:22
 */
export function onLoadPopularData(storeName, url, pageSize, favoriteDao) {
    return dispatch => {
        dispatch({
            type: Types.POPULAR_REFRESH,
            storeName: storeName,
        });
        //从dataStore中获取异步数据
        let dataStore = new DataStore();
        dataStore.fetchData(url, FLAG_STORAGE.flag_popular)//异步action与数据流
            .then(data => {
                dealWithData(Types.POPULAR_REFRESH_SUCCESS, dispatch, storeName, data, pageSize, favoriteDao);
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: Types.POPULAR_REFRESH_FAIL,
                    storeName: storeName,
                    error: error,
                })
            })
    }
}

/**
 * @author HaganWu
 * @description 上拉加载更多
 * @fileName index.js
 * @data 2021/10/28  9:49
 */
export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray = [], favoriteDao, callBack) {
    return dispatch => {
        setTimeout(() => {
            if ((pageIndex - 1) * pageSize >= dataArray.length) {//已加载完全部数据
                if (typeof callBack == 'function') {
                    callBack('no more data');
                }
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_FAIL,
                    error: 'no more',
                    storeName: storeName,
                    pageIndex: --pageIndex,
                })
            } else {
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
                _projectModels(dataArray.slice(0, max), favoriteDao, projectModels => {
                    dispatch({
                        type: Types.POPULAR_LOAD_MORE_SUCCESS,
                        storeName: storeName,
                        pageIndex: pageIndex,
                        projectModels: projectModels,
                    })
                })

            }
        }, 200);
    }
}


/**
 * 刷新收藏状态
 * @param storeName
 * @param pageIndex
 * @param pageSize
 * @param dataArray
 * @param favoriteDao
 */
export function onFlushPopularFavoriteState(storeName, pageIndex, pageSize, dataArray = [], favoriteDao) {
    return dispatch => {
        let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
        _projectModels(dataArray.slice(0, max), favoriteDao, projectModels => {
            dispatch({
                type: Types.PLUSH_POPULAR_FAVORITE_STATE,
                storeName: storeName,
                pageIndex: pageIndex,
                projectModels: projectModels,
            })
        })
    }
}

