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

const Stack = createStackNavigator();

class AppNavigators extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="HomePage" component={HomePage}
                                  options={{headerShown: false}}/>
                </Stack.Navigator>

            </NavigationContainer>
        )
    }
}

export default AppNavigators;
