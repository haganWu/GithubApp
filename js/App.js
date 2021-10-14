/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';


const App: () => Node = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello Github App!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    text: {
        fontSize: 16,
        color: "#7fb550",
    },
});

export default App;
