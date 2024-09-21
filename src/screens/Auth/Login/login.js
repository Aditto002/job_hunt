import { StyleSheet, View,TouchableOpacity, Alert } from 'react-native'
import { Button, TextInput, Text, Appbar } from 'react-native-paper';
import React, { useEffect, useState } from 'react'
import { NavigationContainer ,useNavigation} from '@react-navigation/native';
import axios from 'axios';
import { signInStart,signInSuccess,signInFailure } from '../../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Feather from '@expo/vector-icons/Feather';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.user);
  const [showPassword,setShowPassword] = useState(false);
  const [passwords,setPasswords]=useState('');
  

  const loginInfo = async () => {
    if(!email || !password){
      Toast.show({
        type:'error',
        text1:'!!',
        text2:"All fileds are requried",
        visibilityTime:5000
      })
    }else{

      try {
        dispatch(signInStart());
        const formData = { email, password };
        const response = await axios.post("http://192.168.1.228:3000/api/auth/singin", formData);
        console.log(" response ", response)
        console.log(" response.data ", response.data)
  
        if (response.data.status !== 'success') {
          dispatch(signInFailure());
          return;
        }
        if (response.data.data.user.isVerified === true){
          dispatch(signInSuccess(response.data.data.user));
          AsyncStorage.setItem("token",response?.data?.data?.token);
          if(response.data.userType == "Admin"){
    
            Toast.show({
              type:'success',
              text1:'Welcome To JobNest',
              text2:"Signed in successfully",
              visibilityTime:5000
            })
    
              navigation.navigate('AdminScreen');
          }else{
            Toast.show({
              type:'success',
              text1:'Wellcome JobNest',
              text2:"Signed in successfully",
              visibilityTime:5000
            })
            navigation.navigate('Home');
          }  
        }else{
         Alert.alert('OTP Is Not verified!');
         navigation.navigate('OtpVerification', { email: email });
        }
  
        
      } catch (error) {
        Toast.show({
          type:'error',
          text1:'!!',
          text2:"wrong email or password",
          visibilityTime:5000
        })
        dispatch(signInFailure(error));
        console.error("Error fetching data: ", error);
      }
    }
  };

  return (
    <>
    {/* <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Login" />
      </Appbar.Header> */}
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <View style={styles.form}>
        <TextInput
          label="Email"
          value={email}
          style={styles.input}
          onChangeText={text => setEmail(text)}
          theme={{ colors: { primary: '#3f51b5', underlineColor: 'transparent' } }}
        />
        <View style={styles.inputContainer}>
        <TextInput
          label="Password"
          // value={password}
          style={styles.input}
          onChangeText={text => setPassword(text)}
          secureTextEntry={!showPassword}
          // secureTextEntry 
          theme={{ colors: { primary: '#3f51b5', underlineColor: 'transparent' } }}
        />
        <TouchableOpacity style={styles.iconContainer} onPress={() => setShowPassword(!showPassword)}>
              <Feather name={showPassword ? 'eye' : 'eye-off'} style={styles.pass_icons} />
            </TouchableOpacity>
            </View>
        <Button mode="contained" style={styles.button} onPress={loginInfo} loading={loading}>
          Login
        </Button>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 5 }}>
            <Text style={{ marginRight: 0 }}>Don't have an account !!</Text>
            <Button icon="" mode="text" style={{ padding: 0, margin: 0 }} onPress={() => navigation.navigate('Signup')}>
              SignUp
            </Button>
          </View>
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    // paddingTop: -80
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    marginBottom: 100
  },
  input: {
    margiBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
    borderRadius: 5,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  inputContainer: {
    position: 'relative',
    marginVertical: 10,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  pass_icons: {
    fontSize: 22,
    color: 'black',
  },
});

export default Login

