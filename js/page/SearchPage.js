/**
 * @author HaganWu
 * @description
 * @fileName SearchPage.js
 * @data 2021/12/14  15:01
 */
import React from "react";
import {Component} from "react";
import {
    ActivityIndicator,
    DeviceInfo,
    FlatList,
    Platform,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import actions from '../action/index'
import {connect} from "react-redux";
import FavoriteDao from "../expand/dao/FavoriteDao";
import {FLAG_STORAGE} from "../expand/dao/DataStore";
import LanguageDao, {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";
import ViewUtil from "../util/ViewUtil";
import BackPressComponent from "../common/BackPressComponent";
import NavigationUtil from "../navigator/NavigationUtil";
import PopularItem from "../common/PopularItem";
import FavoriteUtil from "../util/FavoriteUtil";
import GlobalStyles from "../res/styles/GlobalStyles";
import Toast from "react-native-easy-toast";
import SafeAreaViewPlus from "../common/SafeAreaViewPlus";
import Utils from "../util/Utils";

const PAGE_SIZE = 10;
type Props = {}

class SearchPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.params = this.props.route.params;
        this.backPress = new BackPressComponent({backPress: () => this.onBackPress()});
        this.favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.isKeyChange = false;//点击返回键时判断点击底部"添加"操作
    }

    /**
     * @description 处理返回键
     * @author HaganWu
     * @data 2021/12/14  15:06
     */
    onBackPress() {
        const {onSearchCancel, onLoadLanguage} = this.props;
        onSearchCancel(this.searchToken);
        //收起键盘
        this.inputView.blur();
        if (this.isKeyChange) {
            onLoadLanguage(FLAG_LANGUAGE.flag_key);//重新加载标签,刷新"最热"首页视图展示新添加的标签
        }
        NavigationUtil.goBack(this.props.navigation);
    }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    loadData(loadMore) {
        const {onSearch, onLoadMoreSearch, search, keys} = this.props;
        if (loadMore) {
            onLoadMoreSearch(++search.pageIndex, PAGE_SIZE, search.items, this.favoriteDao, () => {
                this.toast.show('没有更多了');
            });
        } else {
            console.log(`this.inputKey:${this.inputKey}, PAGE_SIZE:${PAGE_SIZE},  this.favoriteDao:${this.favoriteDao}, keys:${keys}`);
            onSearch(this.inputKey, PAGE_SIZE, this.searchToken = new Date().getTime(), this.favoriteDao, keys, message => {
                this.toast.show(message);
            });
        }

    }


    onSearchClick() {
        const {onSearchCancel, search} = this.props;
        if (search.showText === '搜索') {
            this.loadData(false);
        } else {
            onSearchCancel(this.searchToken);
        }
    }


    renderItem(data) {
        const item = data.item;
        const {theme} = this.props;
        return <PopularItem
            projectModel={item}
            theme={theme}
            onSelect={(callback) => {
                NavigationUtil.goPage({
                    projectModel: item,
                    flag: FLAG_STORAGE.flag_popular,
                    callback,
                }, 'DetailPage');
            }}
            onFavorite={(item, isFavorite) => FavoriteUtil.onFavorite(FLAG_STORAGE.flag_popular, this.favoriteDao, item, isFavorite)}
        />;
    }

    genIndicator() {
        const {search} = this.props;
        return search.hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                />
                <Text>正在加载更多</Text>
            </View>;
    }

    /**
     * @description 添加标签
     * @author HaganWu
     * @data 2021/12/15  14:25
     */
    saveKey() {
        const {keys, onAddSearchKey} = this.props;
        let key = this.inputKey;
        if (Utils.checkKeyIsExist(keys, key)) {
            this.toast.show(key + '已经存在');
        } else {
            key = {
                'path': key,
                'name': key,
                'checked': true,
            };
            keys.unshift(key);//将key添加到数组的开头
            this.languageDao.save(keys);
            this.toast.show(key.name + '保存成功');
            this.isKeyChange = true;
            onAddSearchKey()
        }
    }

    renderNavBar() {
        const {theme} = this.props;
        const {showText, inputKey} = this.props.search;
        const placeholder = inputKey || '请输入';
        let backButton = ViewUtil.getLeftBackButton(() => this.onBackPress());
        let inputView = <TextInput
            ref={inputTextView => this.inputView = inputTextView}
            placeholder={placeholder}
            onChangeText={text => this.inputKey = text}
            style={styles.textInput}
        >
        </TextInput>;
        let rightButton =
            <TouchableOpacity
                onPress={() => {
                    this.inputView.blur();//收起键盘
                    this.onSearchClick();
                }}
            >
                <View style={{marginRight: 10}}>
                    <Text style={styles.searchContentText}>{showText}</Text>
                </View>
            </TouchableOpacity>;
        return (
            <View style={{
                backgroundColor: theme.themeColor,
                flexDirection: 'row',
                alignItems: 'center',
                height: (Platform.OS === 'ios') ? GlobalStyles.nav_bar_height_ios : GlobalStyles.nav_bar_height_android,
            }}>
                {backButton}
                {inputView}
                {rightButton}
            </View>
        )
    }


    render() {
        const {isLoading, projectModels, showBottomAddButton} = this.props.search;
        console.log(`SearchPage -> render -> showBottomAddButton:${showBottomAddButton}`)
        const {theme} = this.props;
        let statusBar = null;
        if (Platform.OS === "IOS" && !DeviceInfo.isIPhoneX_deprecated) {
            statusBar = <View style={[styles.statusBar, {backgroundColor: theme.themeColor}]}/>;
        }

        let listView = !isLoading ?
            <FlatList
                data={projectModels}
                renderItem={data => this.renderItem(data)}
                keyExtractor={item => "" + item.item.id + item.item["full_name"]}
                contentContainerStyle={{paddingTop: 0, paddingBottom: showBottomAddButton ? 80 : 0}}
                refreshControl={
                    <RefreshControl
                        title={"loading"}
                        titleColor={theme.themeColor}
                        colors={[theme.themeColor]}
                        refreshing={isLoading}
                        onRefresh={() => this.loadData()}
                        tintColor={theme.themeColor}
                    />
                }
                ListFooterComponent={() => this.genIndicator()}
                onEndReached={() => {
                    //列表滚动到底部时回调
                    this.loadData(true);
                }}
            />
            : null;
        let bottomAddButton = showBottomAddButton ?
            <TouchableOpacity
                style={[styles.bottomButton, {backgroundColor: theme.themeColor}]}
                onPress={() => {
                    this.saveKey();
                }}
            >
                <View style={{justifyContent: 'center'}}>
                    <Text style={styles.searchContentText}>拿下</Text>
                </View>
            </TouchableOpacity>
            : null;

        let indicatorView = isLoading ?
            <ActivityIndicator
                style={styles.centering}
                size='large'
                animating={isLoading}
            /> : null;
        let resultView = <View style={{flex: 1}}>
            {indicatorView}
            {listView}
        </View>;

        return (
            <SafeAreaViewPlus
                style={GlobalStyles.root_container}
                topColor={theme.themeColor}
            >
                {statusBar}
                {this.renderNavBar()}
                {resultView}
                {bottomAddButton}
                <Toast
                    ref={toast => this.toast = toast}
                    position={'center'}
                />
            </SafeAreaViewPlus>
        )
    }
}

const mapPopularStateToProps = state => ({
    search: state.search,
    keys: state.language.keys,
    theme: state.theme.theme
});
const mapPopularDispatchToProps = dispatch => ({
    onSearch: (inputKey, pageSize, token, favoriteDao, popularKeys, callback) => dispatch(actions.onSearch(inputKey, pageSize, token, favoriteDao, popularKeys, callback)),
    onSearchCancel: (token) => dispatch(actions.onSearchCancel(token)),
    onLoadMoreSearch: (pageIndex, pageSize, items, favoriteDao, callBack) => dispatch(actions.onLoadMoreSearch(pageIndex, pageSize, items, favoriteDao, callBack)),
    onLoadLanguage: (flag) => dispatch(actions.onLoadLanguage(flag)),
    onAddSearchKey: () => dispatch(actions.onAddSearchKey())
})
export default connect(mapPopularStateToProps, mapPopularDispatchToProps)(SearchPage);

const styles = StyleSheet.create({
    searchBox: {
        flex: 1,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 4,
        marginVertical: 8,
        marginHorizontal: 12,
    },
    statusBar: {
        height: 20,
    },
    bottomButton: {
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.9,
        height: 40,
        position: 'absolute',
        left: 10,
        top: GlobalStyles.window_height - 66 - (DeviceInfo.isIPhoneX_deprecated ? 34 : 0),
        right: 10,
        borderRadius: 3,
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    textInput: {
        flex: 1,
        height: (Platform.OS === 'ios') ? 26 : 36,
        borderWidth: 1,
        borderColor: 'white',
        alignSelf: 'center',
        paddingLeft: 5,
        marginRight: 10,
        marginLeft: 5,
        borderRadius: 3,
        opacity: 0.7,
        color: 'white',
    },
    searchContentText: {
        fontSize: 18,
        color: 'white',
        fontWeight: "500"
    },
});





