/**
 * @author HaganWu
 * @description index
 * @fileName index.js
 * @data 2021/10/25 14:52
 */
import Types from "../types"
import DataStore from "../../expand/dao/DataStore";

/**
 * @description  发送请求（由PopularPage页面中发起） 获取最热数据的异步action(action数据会流转到reducer)
 * @author HaganWu
 * @data 2021/10/27  10:22
 */
export function onLoadPopularData(storeName, url, pageSize) {
    return dispatch => {
        dispatch({
            type: Types.POPULAR_REFRESH,
            storeName: storeName,
        });
        //从dataStore中获取异步数据
        let dataStore = new DataStore();
        dataStore.fetchData(url)//异步action与数据流
            .then(data => {
                dealWithData(dispatch, storeName, data, pageSize);
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
export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray = [], callBack) {
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
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_SUCCESS,
                    storeName: storeName,
                    pageIndex: pageIndex,
                    projectModes: dataArray.slice(0, max),
                })
            }
        }, 200);
    }
}


function dealWithData(dispatch, storeName, data, pageSize) {
    let fixItems = [];
    if (data && data.data && data.data.items) {
        fixItems = data.data.items;
    }

    /**
     * 发送通知：更新store中state中的数据
     */
    dispatch({
        type: Types.POPULAR_REFRESH_SUCCESS,
        items: fixItems,
        projectModes: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize),
        storeName: storeName,
        pageIndex: 1,
    })
}
