/**
 * @author HaganWu
 * @description CodePushPage
 * @fileName CodePushPage.js
 * @data 2021/12/17 15:10
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import CodePush from "react-native-code-push";
import NavigationBar from "../common/NavigationBar";
import ViewUtil from "../util/ViewUtil";
import BackPressComponent from "../common/BackPressComponent";
import SafeAreaViewPlus from "../common/SafeAreaViewPlus";

type Props = {}

class CodePushPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.params = this.props.route.params;
        this.backPress = new BackPressComponent({backPress: () => this.onBackPress()});
        this.state = {restartAllowed: true};
    }

    onBackPress() {
        this.onBack();
        return true;
    }

    codePushStatusDidChange(syncStatus) {
        switch (syncStatus) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                this.setState({syncMessage: "Checking for update."});
                break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                this.setState({syncMessage: "Downloading package."});
                break;
            case CodePush.SyncStatus.AWAITING_USER_ACTION:
                this.setState({syncMessage: "Awaiting user action."});
                break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
                this.setState({syncMessage: "Installing update."});
                break;
            case CodePush.SyncStatus.UP_TO_DATE:
                this.setState({syncMessage: "App up to date.", progress: false});
                break;
            case CodePush.SyncStatus.UPDATE_IGNORED:
                this.setState({syncMessage: "Update cancelled by user.", progress: false});
                break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
                this.setState({syncMessage: "Update installed and will be applied on restart.", progress: false});
                break;
            case CodePush.SyncStatus.UNKNOWN_ERROR:
                this.setState({syncMessage: "An unknown error occurred.", progress: false});
                break;
        }
    }

    codePushDownloadDidProgress(progress) {
        this.setState({progress});
    }

    toggleAllowRestart() {
        this.state.restartAllowed
            ? CodePush.disallowRestart()
            : CodePush.allowRestart();

        this.setState({restartAllowed: !this.state.restartAllowed});
    }

    getUpdateMetadata() {
        CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING)
            .then((metadata: LocalPackage) => {
                this.setState({
                    syncMessage: metadata ? JSON.stringify(metadata) : "Running binary version",
                    progress: false
                });
            }, (error: any) => {
                this.setState({syncMessage: "Error: " + error, progress: false});
            });
    }

    /** Update is downloaded silently, and applied on restart (recommended) */
    sync() {
        CodePush.sync(
            {},
            this.codePushStatusDidChange.bind(this),
            this.codePushDownloadDidProgress.bind(this)
        );
    }

    /** Update pops a confirmation dialog, and then immediately reboots the app */
    syncImmediate() {
        CodePush.sync(
            {installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: true},
            this.codePushStatusDidChange.bind(this),
            this.codePushDownloadDidProgress.bind(this)
        );
    }

    render() {
        const {theme} = this.params;
        let statusBar = {
            backgroundColor: theme.themeColor,
            barStyle: "light-content",
        }
        let navigationBar =
            <NavigationBar
                title={"热更新"}
                statusBar={statusBar}
                style={theme.styles.navBar}
                leftButton={ViewUtil.getLeftBackButton(() => {
                    this.onBackPress()
                })}
            />
        let progressView;

        if (this.state.progress) {
            progressView = (
                <Text
                    style={styles.messages}>{this.state.progress.receivedBytes} of {this.state.progress.totalBytes} bytes
                    received</Text>
            );
        }

        return (
            <SafeAreaViewPlus
                topColor={theme.themeColor}>

                {navigationBar}

                <View style={styles.container}>

                    <TouchableOpacity style={styles.buttonContainer} onPress={this.sync.bind(this)}>
                        <Text style={styles.syncButton}>Press for background sync</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer} onPress={this.syncImmediate.bind(this)}>
                        <Text style={styles.syncButton}>Press for dialog-driven sync</Text>
                    </TouchableOpacity>

                    {progressView}

                    <TouchableOpacity style={styles.buttonContainer} onPress={this.toggleAllowRestart.bind(this)}>
                        <Text
                            style={styles.restartToggleButton}>Restart {this.state.restartAllowed ? "allowed" : "forbidden"}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer} onPress={this.getUpdateMetadata.bind(this)}>
                        <Text style={styles.syncButton}>Press for Update Metadata</Text>
                    </TouchableOpacity>

                    <Text style={styles.messages}>{this.state.syncMessage || ""}</Text>
                </View>
            </SafeAreaViewPlus>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center"
    },

    buttonContainer: {
        alignSelf: "center",
        marginTop: 30,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: "#eeeeee",
        borderColor: "#eeeeee",
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    messages: {
        marginTop: 30,
        textAlign: "center",
    },
    restartToggleButton: {
        color: "blue",
        fontSize: 17
    },
    syncButton: {
        color: "green",
        fontSize: 17
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 20
    },
});

/**
 * Configured with a MANUAL check frequency for easy testing. For production apps, it is recommended to configure a
 * different check frequency, such as ON_APP_START, for a 'hands-off' approach where CodePush.sync() does not
 * need to be explicitly called. All options of CodePush.sync() are also available in this decorator.
 */
let codePushOptions = {checkFrequency: CodePush.CheckFrequency.MANUAL};

CodePushPage = CodePush(codePushOptions)(CodePushPage);

export default CodePushPage;
