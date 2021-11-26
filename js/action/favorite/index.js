/**
 * @author HaganWu
 * @description index
 * @fileName index.js
 * @data 2021/10/25 14:52
 */
import Types from "../types"
import FavoriteDao from "../../expand/dao/FavoriteDao";
import ProjectModel from "../../model/ProjectModel";

/**
 * @description 加载收藏的项目  FavoriteDao中存储的是原始item数据类型（不含isFavorite字段）
 * @author HaganWu
 * @data 2021/11/25  16:00
 */
export function onLoadFavoriteData(flag, isShowLoading) {
    return dispatch => {
        if (isShowLoading) {
            dispatch({
                type: Types.FAVORITE_LOAD_DATA,
                storeName: flag,
            });
        }
        new FavoriteDao(flag).getAllItems()
            .then(items => {
                let resultDataList = [];
                for (let i = 0, length = items.length; i < length; i++) {
                    resultDataList.push(new ProjectModel(items[i], true));
                }
                dispatch(
                    {
                        type: Types.FAVORITE_LOAD_SUCCESS,
                        projectModes: resultDataList,
                        storeName: flag,
                    }
                );
            })
            .catch(error => {
                console.error(error);
                dispatch(
                    {
                        type: Types.FAVORITE_LOAD_FAIL,
                        error: error,
                        storeName: flag,
                    }
                );
            });
    }
}


