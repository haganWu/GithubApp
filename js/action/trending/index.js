/**
 * @author HaganWu
 * @description
 * @fileName index.js
 * @data 2021/10/28  16:23
 */
import Types from "../types"
import DataStore, {FLAG_STORAGE} from "../../expand/dao/DataStore";
import dealWithData, {_projectModels} from "../ActionUtil";

export function onRefreshTrending(storeName, url, pageSize, favoriteDao) {
    return dispatch => {
        dispatch({
            type: Types.TRENDING_REFRESH,
            storeName: storeName,
        });
        //从dataStore中获取异步数据
        let dataStore = new DataStore();
        dataStore.fetchData(url, FLAG_STORAGE.flag_trending)//异步action与数据流
            .then(data => {
                dealWithData(Types.TRENDING_REFRESH_SUCCESS, dispatch, storeName, data, pageSize, favoriteDao,favoriteDao);
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: Types.TRENDING_REFRESH_FAIL,
                    storeName: storeName,
                    error: error,
                })
            })
    }
}

/**
 * @description
 * @author HaganWu
 * @data 2021/10/28  16:26
 */
export function onLoadMoreTrending(storeName, pageIndex, pageSize, dataArray = [], favoriteDao, callBack) {
    return dispatch => {
        setTimeout(() => {
            if ((pageIndex - 1) * pageSize >= dataArray.length) {//已加载完全部数据
                if (typeof callBack == 'function') {
                    callBack('no more data');
                }
                dispatch({
                    type: Types.TRENDING_LOAD_MORE_FAIL,
                    error: 'no more',
                    storeName: storeName,
                    pageIndex: --pageIndex,
                })
            } else {
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
                _projectModels(dataArray.slice(0, max), favoriteDao,favoriteDao,FLAG_STORAGE.flag_trending, projectModes => {
                    dispatch({
                        type: Types.TRENDING_LOAD_MORE_SUCCESS,
                        storeName: storeName,
                        pageIndex: pageIndex,
                        projectModes: projectModes,
                    })
                })
            }
        }, 200);
    }
}


