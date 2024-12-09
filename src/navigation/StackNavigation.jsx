import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screen/LoginScreen';
import SectionsScreen from '../screen/SectionsScreen';
import OtpScreen from '../screen/OtpScreen';
import PDFListScreen from '../screen/PDFListScreen';

const StackNavigation = () => {
    const Stack = createNativeStackNavigator();

    const AuthStack = () => {
        return (
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown:false}}
            />
            <Stack.Screen
              name="Otp"
              component={OtpScreen}
              options={{headerShown:false}}
            />
            <Stack.Screen
              name="Sections"
              component={SectionsScreen}
              options={{headerShown:false}}
            />
             <Stack.Screen
              name="PDFList"
              component={PDFListScreen}
              options={{headerShown:false}}
            />
             </Stack.Navigator>
            )
        }
  return (
    <NavigationContainer>

    <AuthStack />
  </NavigationContainer>
  )
}

export default StackNavigation
const styles = StyleSheet.create({})