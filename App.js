import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import {Home} from './src/screens/Home/home.js';
import Login from './src/screens/Auth/Login/login.js';
import Signup from './src/screens/Auth/Signup/signup.js';
import { PaperProvider,Text } from 'react-native-paper';
import MainNavigation from './src/navigation/MainNavigation.js';



export default function App() {
  return (

    <PaperProvider>
    <MainNavigation>
    </MainNavigation>
      
    </PaperProvider>

  );
}
