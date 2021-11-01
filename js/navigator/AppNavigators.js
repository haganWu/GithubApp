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
                    <Stack.Screen name="FetchDemo" component={FetchDemo}
                                  options={{headerShown: true}}/>
                    <Stack.Screen name="AsyncStorageDemo" component={AsyncStorageDemo}
                                  options={{headerShown: true}}/>
                    <Stack.Screen name="DataStoreDemo" component={DataStoreDemo}
                                  options={{headerShown: true}}/>
                </Stack.Navigator>

            </NavigationContainer>
        )
    }
}

export default AppNavigators;
