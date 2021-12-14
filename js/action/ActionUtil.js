/**
 * @author HaganWu
 * @description 处理数据
 * @fileName ActionUtil.js
 * @data 2021/10/28 16:30
 */
import ProjectModel from "../model/ProjectModel";
import Utils from "../util/Utils";


export default function dealWithData(actionType, dispatch, storeName, data, pageSize, favoriteDao, params) {
    let fixItems = [];
    if (data && data.data) {
        if (Array.isArray(data.data)) {
            fixItems = data.data;
        } else if (Array.isArray(data.data.items)) {
            fixItems = data.data.items;
        }

    }

    //发送通知：更新store中state中的数据
    //第一次加载的数据
    let showItems = pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize);
    _projectModels(showItems, favoriteDao, projectModels => {
        dispatch({
            type: actionType,
            items: fixItems,
            projectModes: projectModels,
            storeName: storeName,
            pageIndex: 1,
            ...params,
        })
    });

}

/**
 * 本地包装数据--添加收藏着状态
 * ProjectModel：｛
 *   item: 源数据
 *   isFavorite： 是否收藏
 * ｝
 *
 * @param showItems
 * @param favoriteDao
 * @param callback
 * @returns {Promise<void>}
 * @private
 */
export async function _projectModels(showItems, favoriteDao, callback) {
    let keys = [];
    try {
        keys = await favoriteDao.getAllFavoriteKeys();
    } catch (e) {
        console.error(e);
    }
    let projectModels = [];
    for (let i = 0, len = showItems.length; i < len; i++) {
        projectModels.push(new ProjectModel(showItems[i], Utils.checkIsFavorite(showItems[i], keys)))
    }
    doCallback(callback, projectModels);
}

export const doCallback = (callback, object) => {
    if (typeof callback === 'function') {
        callback(object);
    }
}
