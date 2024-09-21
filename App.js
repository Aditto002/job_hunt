import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { PaperProvider, Text } from 'react-native-paper';
import MainNavigation from './src/navigation/MainNavigation.js';
import { Provider, useDispatch } from 'react-redux';
import store, { persistor } from './src/redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ 
        borderLeftColor: 'green',
        borderLeftWidth: 7,
        width:'90%',
        height:70,
        borderRightColor:'green',
        borderRightWidth: 7
       }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
        fontWeight: '700'
      }}
      text2Style={{
        fontSize:14
      }}
    />
  ),

       error: (props) => (
    <ErrorToast
      {...props}
      text2NumberOfLines={3}
      style={{ 
        borderLeftColor: 'red',
        borderLeftWidth: 7,
        width:'90%',
        height:70,
        borderRightColor:'red',
        borderRightWidth: 7
       }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
        fontWeight: '700'
      }}
      text2Style={{
        fontSize:14
      }}
    />
  ),

};

export default function App() {
  // const dispatch = useDispatch();

  // const loadToken = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('token');
  //     if (token) {
  //       dispatch(signInWithToken(token));
  //     }
  //   } catch (error) {
  //     console.error('Error loading token:', error);
  //   }
  // };

  // useEffect(() => {
  //   loadToken();
  // }, []);


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <MainNavigation/>
          <Toast config={toastConfig}/>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
