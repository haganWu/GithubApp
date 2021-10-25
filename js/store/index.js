/**
 * @author HaganWu
 * @description 数据存储仓库
 * @fileName index.js
 * @data 2021/10/25 13:55
 */
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import reducers from '../reducer'

/**
 * @description 中间件
 * @author HaganWu
 * @data 2021/10/25  13:59
 */
const middlewares = [
    thunk,
]


export default createStore(reducers, applyMiddleware(...middlewares))
