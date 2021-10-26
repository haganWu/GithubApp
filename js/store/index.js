/**
 * @author HaganWu
 * @description 数据存储仓库
 * @fileName index.js
 * @data 2021/10/25 13:55
 */
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import reducers from '../reducer'


const logger = store => next => action => {
    if (typeof action == 'function') {
        console.log('dispatching a function');
    } else {
        console.log('dispatching', action);
    }
    const result = next(action);
    console.log('nextState', store.getState());
    return result
}

/**
 * @description 中间件
 * @author HaganWu
 * @data 2021/10/25  13:59
 */
const middlewares = [
    logger,
    thunk,
]


export default createStore(reducers, applyMiddleware(...middlewares))
