/**
 * @author HaganWu
 * @description index
 * @fileName index.js
 * @data 2021/12/13 16:02
 */
import Types from "../types"
import dealWithData, {_projectModels, doCallback} from "../ActionUtil";
import ArrayUtil from "../../util/ArrayUtil";
import Utils from "../../util/Utils";

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars'
const CANCEL_TOKENS = [];

/**
 * @description 搜索action 创建函数
 * @param inputKey 所搜关键字
 * @param pageSize
 * @param token 本次所所有唯一的一个key，可根据此参数取消本次搜索
 * @param favoriteDao
 * @param popularKeys 最热模块下所有标签
 * @param callback
 * @returns {(function(*=): void)|*}
 */
export function onSearch(inputKey, pageSize, token, favoriteDao, popularKeys, callback) {
    return dispatch => {
        dispatch({
            type: Types.SEARCH_REFRESH,
        });
        fetch(genFetchUrl(inputKey))
            .then((response) => {
                //根据response判断用户“取消”的操作
                return didCancel(token, false) ? null : response.json();
            })
            .then(responseJson => {
                if (didCancel(token, true)) {
                    //用户取消不做任何处理
                    console.log("用户点击取消");
                    return;
                }
                if (!responseJson || !responseJson.items || responseJson.items.length === 0) {
                    const failMessage = `没有找到${inputKey}的项目`;
                    //搜索结果为空
                    dispatch({
                        type: Types.SEARCH_FAIL,
                        error: failMessage,
                    });
                    doCallback(callback, failMessage);
                } else {
                    //搜索结果不为空
                    let items = responseJson.items;
                    dealWithData(Types.SEARCH_REFRESH_SUCCESS, dispatch, "", {data: items}, pageSize, favoriteDao, {
                        showBottomAddButton: !Utils.checkKeyIsExist(popularKeys, inputKey),
                        inputKey: inputKey,
                    });
                }
            })
            .catch(error => {
                console.log(`onSearch fetch error:${error}`);
                dispatch({
                    type: Types.SEARCH_FAIL,
                    error: error,
                });
            })

    }
}


/**
 * @description 取消搜索action创建函数
 * @param token 搜索唯一id
 */
export function onSearchCancel(token) {
    return dispatch => {
        CANCEL_TOKENS.push(token);
        dispatch({type: Types.SEARCH_CANCEL});
    }
}

/**
 * @description 搜索加载更多的action创建函数
 * @author HaganWu
 * @data 2021/12/14  13:14
 */
export function onLoadMoreSearch(pageIndex, pageSize, dataArray = [], favoriteDao, callBack) {
    return dispatch => {
        setTimeout(() => {
            if ((pageIndex - 1) * pageSize >= dataArray.length) {//已加载完全部数据
                if (typeof callBack == 'function') {
                    callBack('no more data');
                }
                dispatch({
                    type: Types.SEARCH_LOAD_MORE_FAIL,
                    error: 'no more',
                    pageIndex: --pageIndex,
                })
            } else {
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
                _projectModels(dataArray.slice(0, max), favoriteDao, projectModels => {
                    dispatch({
                        type: Types.SEARCH_LOAD_MORE_SUCCESS,
                        pageIndex: pageIndex,
                        projectModels: projectModels,
                    })
                })

            }
        }, 200);
    }
}


function genFetchUrl(key) {
    const urlValue = URL + key + QUERY_STR;
    console.log(`urlValue:${urlValue}`);
    return URL + key + QUERY_STR;
}

/**
 * @description 检查指定token是否已经取消
 * @author HaganWu
 * @data 2021/12/14  10:48
 */
function didCancel(token, isRemove) {
    if (CANCEL_TOKENS.includes(token)) {
        isRemove && ArrayUtil.remove(CANCEL_TOKENS, token);
        return true;
    }
    return false;
}

