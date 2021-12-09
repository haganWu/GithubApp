/**
 * @author HaganWu
 * @description index
 * @fileName index.js
 * @data 2021/10/25 14:54
 */
import {onThemeChange} from './theme'
import {onLoadPopularData, onLoadMorePopular, onFlushPopularFavoriteState} from './popular'
import {onRefreshTrending, onLoadMoreTrending} from './trending'
import {onLoadFavoriteData} from "./favorite";
import {onLoadLanguage} from "./language";


export default {
    onThemeChange,
    onLoadPopularData,
    onLoadMorePopular,
    onRefreshTrending,
    onLoadMoreTrending,
    onLoadFavoriteData,
    onFlushPopularFavoriteState,
    onLoadLanguage,
}
