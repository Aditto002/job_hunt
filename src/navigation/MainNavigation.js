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
import AdminScreen from '../screens/AdminScreens/AdminScreen.js';
import PostJob from '../screens/AdminScreens/addPost.js';
import Jobdetails from '../screens/JobPost/jobdetails.js';
import ApplyJob from '../screens/JobPost/applyJob.js';
import AdminPostAnalyse from '../screens/AdminScreens/adminPostanalyse.js';
import AdminJoblist from '../screens/AdminScreens/AdminJoblist.js';
import UpdateJobPostScreen from '../screens/AdminScreens/UpdatejobPost.js';
import ApplicantsList from '../screens/AdminScreens/applicantsList.js';
import AppliedJobsList from '../screens/userJobAppliedList/appliedJobsList.js';
import OtpVerification from '../screens/Auth/OTPVerification/otpVeriification.js';
import SuccessPaymentScreen from '../screens/PaymentStatusScreen/paymentStatusScreen.js';
import { useSelector } from 'react-redux';


const Stack = createNativeStackNavigator();
const linking = {
  prefixes: ['jobhunt://'],
  config: {
    screens: {
      SuccessPayment: 'success-payment',
      // FailPayment: 'fail-payment',
      // CancelPayment: 'cancel-payment',
    },
  },
};
const StackNav = ()=>{
  const [routeName, setRouteName] = React.useState('');
  const { currentUser } = useSelector(state => state.user);
  const [initialRoute, setInitialRoute] = React.useState('Homebg');
  


  React.useEffect(() => {
  
    if (currentUser) {
      setInitialRoute('Profile'); 
    } else {
      setInitialRoute('Homebg'); 
    }
  }, [currentUser]);

  return(
    <>
    
    <Stack.Navigator
      
      // initialRouteName={initialRoute}
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
    >{
      currentUser?(
        <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerBackVisible: false }} 
      />
      ):(
        <Stack.Screen
        name='Homebg'
        component={Homebg}
        options={{ headerShown: false }}
        />
      )
    }
      <Stack.Screen
        name="PostJob"
        component={PostJob}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Jobdetails"
        component={Jobdetails}
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
      name="ApplyJob" 
      component={ApplyJob}
       />

      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerBackVisible: false }} 
      />
      <Stack.Screen
      name="AdminScreen"
      component={AdminScreen}
      options={{ headerBackVisible: false }}
      />
      <Stack.Screen
      name="AdminPostAnalyse"
      component={AdminPostAnalyse}
      options={{ headerBackVisible: false }}
      />
      <Stack.Screen
      name="AdminJoblist"
      component={AdminJoblist}
      options={{ headerBackVisible: false }}
      />
      <Stack.Screen
      name="UpdatJobPost"
      component={UpdateJobPostScreen}
      options={{ headerBackVisible: false }}
      />
      <Stack.Screen
      name="ApplicantsList"
      component={ApplicantsList}
      options={{ headerBackVisible: false }}
      />
      <Stack.Screen
      name="AppliedJobsList"
      component={AppliedJobsList}
      options={{ headerBackVisible: false }}
      />
      <Stack.Screen
      name="OtpVerification"
      component={OtpVerification}
      options={{ headerBackVisible: false }}
      />
      {/* //////////////////////////////////////// */}
      <Stack.Screen name="SuccessPayment" component={SuccessPaymentScreen} />
    </Stack.Navigator>
    {routeName !== 'Homebg'  && <BottomBar />}
    {/* {routeName !== 'Homebg' && routeName !== 'Login' && routeName !== 'Signup' && <BottomBar />} */}
    </>
    
  );
  
};

const MainNavigation = () => {
  
  return (
    <NavigationContainer linking={linking}>
      <StackNav/>

    </NavigationContainer>
  );
};

export default MainNavigation;
