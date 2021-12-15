/**
 * @author HaganWu
 * @description AppNavigators
 * @fileName AppNavigators.js
 * @data 2021/10/14 13:06
 */
import React, {Component} from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import HomePage from "../page/HomePage";
import WelcomePage from "../page/WelcomePage";
import DetailPage from "../page/homeTabs/DetailPage";
import FetchDemo from "../page/demo/FetchDemo";
import AsyncStorageDemo from "../page/demo/AsyncStorageDemo";
import DataStoreDemo from "../page/demo/DataStoreDemo";
import TestPage from "../page/TestPage";
import WebViewPage from "../page/WebViewPage";
import AboutPage from "../page/about/AboutPage";
import AboutMePage from "../page/about/AboutMePage";
import CustomKeyLanguagePage from "../page/CustomKeyLanguagePage";
import SearchPage from "../page/SearchPage";

const Stack = createStackNavigator();

class AppNavigators extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="WelcomePage" component={WelcomePage}
                                  options={{headerShown: false}}/>

                    <Stack.Screen name="HomePage" component={HomePage}
                                  options={{headerShown: false}}/>
                    <Stack.Screen name="DetailPage" component={DetailPage}
                                  options={{headerShown: false}}/>
                    <Stack.Screen name="WebViewPage" component={WebViewPage}
                                  options={{headerShown: false}}/>
                    <Stack.Screen name="AboutPage" component={AboutPage}
                                  options={{headerShown: false}}/>
                    <Stack.Screen name="AboutMePage" component={AboutMePage}
                                  options={{headerShown: false}}/>
                    <Stack.Screen name="CustomKeyLanguagePage" component={CustomKeyLanguagePage}
                                  options={{headerShown: false}}/>
                    <Stack.Screen name="SearchPage" component={SearchPage}
                                  options={{headerShown: false}}/>

                    <Stack.Screen name="FetchDemo" component={FetchDemo}
                                  options={{headerShown: true}}/>
                    <Stack.Screen name="AsyncStorageDemo" component={AsyncStorageDemo}
                                  options={{headerShown: true}}/>
                    <Stack.Screen name="DataStoreDemo" component={DataStoreDemo}
                                  options={{headerShown: true}}/>
                    <Stack.Screen name="TestPage" component={TestPage}
                                  options={{headerShown: true}}/>
                </Stack.Navigator>

            </NavigationContainer>
        )
    }
}

export default AppNavigators;
