import { StyleSheet, View } from 'react-native'
import { Button, TextInput, Text } from 'react-native-paper';
import React, { useState } from 'react'
import { NavigationContainer ,useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import { signInStart,signInSuccess,signInFailure } from '../../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';



const Login = () => {
  const [text, setText] = React.useState('');
  const navigation = useNavigation();

  const [emails,setEmailes]=useState('');
  const [passwords,setPasswords]=useState('');

  const dispatch = useDispatch();
  const {loading,error} = useSelector((state)=>state.user);

  const handelEmail =(e)=>{
    const emailVar = e.nativeEvent.text;
    setEmailes(emailVar);
  }
  const handelPassword=(e)=>{
    const passVar = e.nativeEvent.text;
    setPasswords(passVar);
  }

  const logininfo = async () => {
    try {
      dispatch(signInStart());
      const formData = { email:emails,password:passwords };

      const response = await axios.post("http://192.168.1.228:3000/api/auth/singin", formData);
      console.log(response.data.data.user);
      // localStorage.setItem("token",response?.data?.data?.token)
      if(response.data.status !== 'success'){
        dispatch(signInFailure());
        return;
      }
      dispatch(signInSuccess(response.data.data.user));
      navigation.navigate('Home')
    } catch (error) {
      dispatch(signInFailure(error))
      console.error("Error fetching data: ", error);
   
    }
  };

  
  return (
    <>
    <View style={styles.container}>
      <Text  variant="displaySmall">Welcome Back !!</Text>
      <Text style={styles.text_space} variant="headlineSmall">JobNest</Text>  
      <View style={styles.subcontainer}>
      
      <TextInput
      label="User Name"
      value={text}
       style={{ borderRadius:15, border:0, margin:10 }}
      onChangeText={text => setText(text)}
      onChange={(e)=>handelEmail(e)}
      />

      <TextInput
      label="Password"
      // value={text}
      style={{ borderRadius:15, border:0, margin:10 }}
      onChange={(e)=>handelPassword(e)}
      // onChangeText={text => setText()}
      />   

<Button icon="login" mode="contained"  onPress={logininfo}>
    Login
  </Button>
  <Button icon="login" mode="text" onPress={() => navigation.navigate('Signup')}>
    New to Sign up ...
  </Button>
      </View>
      </View>
      </>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
        flex:1,
        alignItems:"center",
        justifyContent:"center",
      },
      subcontainer:{
         width: "80%",
      },
      text_space:{
        margin: 10
      }
})