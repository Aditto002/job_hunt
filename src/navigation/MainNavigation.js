import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home/home';
import Login from '../screens/Auth/Login/login';
import Signup from '../screens/Auth/Signup/signup';
import * as React from 'react';
import BottomBar from './BottomBar';
import JobPost from '../screens/JobPost/JobPost';
import Profile from '../screens/Profile/profile';
import ChatScreen from '../screens/Chat/ChatScreen.js';
import GetStarted from '../screens/GetStarted/GetStarted.js';
import Homebg from './index.js';
// import { createDrawerNavigator } from '@react-navigation/drawer';


const StackNav = ()=>{
  const Stack = createNativeStackNavigator();
  const [routeName, setRouteName] = React.useState('');
  return(
    <>
    
    <Stack.Navigator
      
      initialRouteName="GetStarted"
      screenListeners={({ route }) => {
        setRouteName(route.name);
      }}
      screenOptions={{
        headerShown: false,
        statusBarColor:'#0163d2',
        headerStyle:{
          backgroundColor:'#8BB2C5'
        },
        headerTintColor: '#8BB2C5',
        headerTitleAlign: '#8BB2C5'

      }}
    >
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{ headerShown: false }}
      />
      <Stack.Screen
      name='Homebg'
      component={Homebg}
      options={{ headerShown: false }}
      
      
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerBackVisible: false }} // Hide back button
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerBackVisible: false }} 
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerBackVisible: false }} 
      />
      <Stack.Screen
        name="JobPost"
        component={JobPost}
        options={{ headerBackVisible: false }} 
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerBackVisible: false }} 
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerBackVisible: false }} 
      />
    </Stack.Navigator>
    {routeName !== 'GetStarted' && <BottomBar />}
    </>
    
  );
  
};
// const MyComponent = () => {

//   // const [active, setActive] = React.useState('');
//   const Drawer = createDrawerNavigator();

//   return (
   
//        <Drawer.Navigator initialRouteName="Profile">
//         <Drawer.Screen name="Profile" component={StackNav} />
        
//       </Drawer.Navigator>
    
//   );
// };

const MainNavigation = () => {
  
  return (
    <NavigationContainer>
      <StackNav/>

    </NavigationContainer>
  );
};

export default MainNavigation;
