/**
 * @author HaganWu
 * @description ActionUtil
 * @fileName ActionUtil.js
 * @data 2021/10/28 16:30
 */


export default function dealWithData(actionType, dispatch, storeName, data, pageSize) {
    let fixItems = [];
    if (data && data.data) {
        if (Array.isArray(data.data)) {
            fixItems = data.data;
        } else if (Array.isArray(data.data.items)) {
            fixItems = data.data.items;
        }

    }

    /**
     * 发送通知：更新store中state中的数据
     */
    dispatch({
        type: actionType,
        items: fixItems,
        projectModes: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize),
        storeName: storeName,
        pageIndex: 1,
    })
}

