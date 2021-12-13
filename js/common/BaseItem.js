/**
 * @author HaganWu
 * @description BaseItem
 * @fileName BaseItem.js
 * @data 2021/11/23 10:38
 */
import React from "react";
import PropTypes from "prop-types";
import {TouchableOpacity} from "react-native";
import IconFont from "../res/iconfont";

export default class BaseItem extends React.Component {
    static propTypes = {
        projectModel: PropTypes.object,
        onSelect: PropTypes.func,//item点击时调用
        onFavorite: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            //收藏状态发生改变时即使更新UI状态
            isFavorite: this.props.projectModel.isFavorite,
        }
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        const isFavorite = nextProps.projectModel.isFavorite;
        if (prevState.isFavorite !== isFavorite) {
            return {
                isFavorite: isFavorite,
            }
        }
        return null;
    }


    _favoriteIcon() {
        const {theme} = this.props;
        return <TouchableOpacity
            style={{padding: 6}}
            onPress={() => this.onPressFavorite()}
            underlayColor='transparent'
        >
            <IconFont
                name={'collection'}
                color={this.state.isFavorite ? theme.themeColor : '#333333'}
                size={26}
            />
        </TouchableOpacity>
    }

    onItemClick() {
        if (this.props.onSelect) {
            this.props.onSelect(isFavorite => {
                //callback 实现 从详情页返回列表时刷新“收藏”按钮状态
                this.setFavoriteState(isFavorite);
            });
        }
    }

    /**
     * 点击收藏/取消收藏
     */
    onPressFavorite() {
        this.setFavoriteState(!this.state.isFavorite);
        //回调至PopularPage/TrendingPage，传参为item和收藏状态
        this.props.onFavorite(this.props.projectModel.item, !this.state.isFavorite);
    }

    /**
     * 更新组件当前的收藏状态
     */
    setFavoriteState(isFavorite) {
        this.props.projectModel.isFavorite = isFavorite;
        this.setState({
            isFavorite: isFavorite,
        })
    }
}
