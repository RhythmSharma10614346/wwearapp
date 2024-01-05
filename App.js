import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import TopsScreen from './screens/categories/TopsScreen';
import BottomScreen from './screens/categories/BottomsScreen';
import JacketsScreen from './screens/categories/JacketsScreen';
import ShoesScreen from './screens/categories/ShoesScreen';
import ImageUploadScreen from './ImageUpload';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Tops" component={TopsScreen} />
        <Stack.Screen name="Bottoms" component={BottomScreen} />
        <Stack.Screen name="Jackets" component={JacketsScreen} />
        <Stack.Screen name="Shoes" component={ShoesScreen} />
        <Stack.Screen options={{ headerShown: false }} name='ImageUpload' component={ImageUploadScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a5d2ea',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
