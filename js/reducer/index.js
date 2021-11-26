/**
 * @author HaganWu
 * @description 合并reducer
 * @fileName index.js
 * @data 2021/10/25 13:56
 */
import {combineReducers} from "redux";
import theme from './theme'
import popular from './popular'
import trending from './trending'
import favorite from './favorite'

const index = combineReducers({
    theme: theme,
    popular: popular,
    trending: trending,
    favorite: favorite,
});

export default index;
