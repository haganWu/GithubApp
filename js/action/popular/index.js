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
export function onLoadPopularData(storeName, url) {
    return dispatch => {
        dispatch({
            type: Types.POPULAR_REFRESH,
            storeName: storeName,
        });
        //从dataStore中获取异步数据
        let dataStore = new DataStore();
        dataStore.fetchData(url)//异步action与数据流
            .then(data => {
                dealWithData(dispatch, storeName, data);
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    types: Types.LOAD_POPULAR_FAIL,
                    storeName: storeName,
                    error: error,
                })
            })
    }
}

function dealWithData(dispatch, storeName, data) {
    /**
     * 发送通知：更新store中state中的数据
     */
    dispatch({
        type: Types.LOAD_POPULAR_SUCCESS,
        items: data && data.data && data.data.items,
        storeName: storeName,

    })
}
