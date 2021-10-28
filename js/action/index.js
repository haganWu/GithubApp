/**
 * @author HaganWu
 * @description index
 * @fileName index.js
 * @data 2021/10/25 14:54
 */
import {onThemeChange} from './theme'
import {onLoadPopularData, onLoadMorePopular} from './popular'
import {onRefreshTrending, onLoadMoreTrending} from './trending'

export default {
    onThemeChange,
    onLoadPopularData,
    onLoadMorePopular,
    onRefreshTrending,
    onLoadMoreTrending,
}
