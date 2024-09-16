import { ScrollView, StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Appbar, Button, Text, TextInput } from 'react-native-paper';
import axios from 'axios';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Feather from '@expo/vector-icons/Feather';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { signInStart,signInSuccess,signInFailure } from '../../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RadioButton } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Signup = () => {
  const [errormsg, setErrormsg] = useState(null);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const navigation = useNavigation();
  const dispatch = useDispatch();


  const [name,setName]=useState('');
  const[nameverify,setNameverify]=useState(false);
  const [emails,setEmailes]=useState('');
  const[emailsverify,setEmailsverify]=useState(false);
  const [passwords,setPasswords]=useState('');
  const[passwordsverify,setPasswordsverify]=useState(false);
  const [showPassword,setShowPassword] = useState(false);
  const [userType , setUserType] = useState('');
  const [secretText , setSecretText] = useState('');
  


  const handleName=(e)=>{
    const namevar=e.nativeEvent.text;
    setName(namevar);
    setNameverify(false);

    if(namevar.length>2){
      setNameverify(true);
    }
  }

  const handelEmail =(e)=>{
    const emailVar = e.nativeEvent.text;
    setEmailes(emailVar);
    setEmailsverify(false);
    if(/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(emailVar)){
      setEmailes(emailVar);
      setEmailsverify(true);
    }
  }

  const handelPassword=(e)=>{
    const passVar = e.nativeEvent.text;
    setPasswords(passVar);
    setPasswordsverify(false);
    if(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passVar)){
      setPasswords(passVar);
      setPasswordsverify(true)
    }
  }

  const Sendtobackend = async () => {
    console.log(secretText);
    try {
      dispatch(signInStart());

      const formData = { username:name, email:emails,password:passwords , userType};
      if(userType=='Admin' && secretText != "ak"){
        return Alert.alert("invalid Admin");
      }

      const response = await axios.post("http://192.168.1.228:3000/api/auth/singup", formData);
      // console.log(response.data.data);
      dispatch(signInSuccess(response.data.data))
      // console.log("token response",response?.data?.token)
      await AsyncStorage.setItem('token', response?.data?.token);
      if(response.data.data.userType == "Admin"){
        Toast.show({
          type:'success',
          text1:'Welcome To JobNest',
          text2:"Signed Up successfully",
          visibilityTime:5000
        })
        navigation.navigate('AdminScreen')
    }else{
      Toast.show({
        type:'success',
        text1:'Welcome To JobNest',
        text2:"Signed Up successfully",
        visibilityTime:5000
      })

      navigation.navigate('Profile');
    };
    } catch (error) {
      Toast.show({
        type:'error',
        text1:'!!',
        text2:"something is wrong",
        visibilityTime:5000
      })
      
      dispatch(signInFailure(error));
      console.error("Error fetching data: ", error);
    }
  };



  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1 }}
  >
    {/* <>
    <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Register" />
      
      </Appbar.Header></> */}


      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="always">
        <View style={styles.container}>
          <Text variant="titleLarge" style={styles.welcomeText}> Hey, Welcome</Text>
          <Text style={styles.text_space} variant="labelLarge">Find your best job in Jobnest</Text>
          {errormsg && <Text style={styles.errorText}>{errormsg}</Text>}

          <View style={styles.toggleButtonContainer}>
            <Text style={styles.radioButton_title}>SignUp As</Text>
            <View style={styles.toggleButtons}>
              <TouchableOpacity
                style={[styles.toggleButton, userType === 'User' && styles.selectedButton]}
                onPress={() => setUserType('User')}
              >
                <Text style={[styles.toggleButtonText, userType === 'User' && styles.selectedButtonText]}>Seeker</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, userType === 'Admin' && styles.selectedButton]}
                onPress={() => setUserType('Admin')}
              >
                <Text style={[styles.toggleButtonText, userType === 'Admin' && styles.selectedButtonText]}>Advrtiser</Text>
              </TouchableOpacity>
            </View>
          </View>

       


 {/* for admin */}

        <View style={styles.subcontainer}>

{
                    userType == 'Admin' ? 
                    <View style={styles.inputContainer}>
                    <TextInput
                      label="Secret Text"
                      name='secret_text'
                      style={styles.textInput}
                      onChange={(e)=>setSecretText(e.nativeEvent.text)}          
                    />
                 </View>
        
                    :""
}


          <View style={styles.inputContainer}>
            <TextInput
              label="Username"
              name='username'
              style={styles.textInput}
              onChange={e => handleName(e)}
              ref={usernameRef}
            />
            {name.length < 1 ? null : nameverify ? (<Feather name={'check-circle'} style={styles.f_icons_G} />) : (<Feather name={'x'} style={styles.f_icons} />)}
          </View>
          {
            name.length < 1 ? null : nameverify ? null : (<Text style={{ marginLeft: 10, color: 'red' }}>
              Name should be more than 2 characters
            </Text>)
          }

          <View style={styles.inputContainer}>
            <TextInput
              label="Email"
              name='email'
              style={styles.textInput}
              ref={emailRef}
              onChange={e => handelEmail(e)}
            />
            {emails.length < 1 ? null : emailsverify ? (<Feather name={'check-circle'} style={styles.f_icons_G} />) : (<Feather name={'x'} style={styles.f_icons} />)}
          </View>
          {
            emails.length < 1 ? null : emailsverify ? null : (<Text style={{ marginLeft: 10, color: 'red' }}>
              Enter a proper email address
            </Text>)
          }

          <View style={styles.inputContainer}>
            <TextInput
              label="Password"
              name='password'
              secureTextEntry={!showPassword}
              style={styles.textInput}
              onChange={e => handelPassword(e)}
              ref={passwordRef}
            />
            <TouchableOpacity style={styles.iconContainer} onPress={() => setShowPassword(!showPassword)}>
              {
                passwords.length < 1 ? null : !showPassword ? (
                  <Feather name={'eye-off'} style={styles.pass_icons} />
                ) : (
                  <Feather name={'eye'} style={styles.pass_icons} />
                )
              }
            </TouchableOpacity>
          </View>
          {
            passwords.length < 1 ? null : passwordsverify ? null : (<Text style={{ marginLeft: 10, color: 'red' }}>
              Password must contain uppercase, lowercase, number, and be at least 6 characters long
            </Text>)
          }

          <Button style={{ marginTop: 5 }} icon="login" mode="contained" onPress={Sendtobackend}>
            SignUp
          </Button>

          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 5 }}>
            <Text style={{ marginRight: 0 }}>Already have an account? </Text>
            <Button icon="" mode="text" style={{ padding: 0, margin: 0 }} onPress={() => navigation.navigate('Login')}>
              Login
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>
);
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#f5f5f5',
    padding: 20,
    marginTop: -70
  },
  subcontainer: {
    width: "100%",
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 20,
  },
  f_icons: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
    color: 'red',
    fontSize: 24,
  },
  f_icons_G: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
    color: 'green',
    fontSize: 24,
  },
  inputContainer: {
    position: 'relative',
    marginVertical: 10,
  },
  textInput: {
    paddingRight: 40,
    backgroundColor: '#f0f0f0',
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  pass_icons: {
    color: '#333',
    fontSize: 24,
  },
  text_space: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  toggleButtonContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  toggleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  toggleButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#6200ee',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: '#6200ee',
  },
  toggleButtonText: {
    color: '#6200ee',
    fontSize: 16,
  },
  selectedButtonText: {
    color: '#fff',
  },
  signUpButton: {
    marginTop: 5,
    backgroundColor: '#6200ee'
  },
  welcomeText: {
    margin: 8,
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 24,
    color: '#6200ee'
  },
  errorText: {
    color: 'red',
    alignItems: "center",
    marginBottom: 15
  },
  validationText: {
    marginLeft: 10,
    color: 'red'
  },
  radioButton_title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6200ee',
    textAlign: 'center',
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5
  },
  loginButton: {
    padding: 0,
    margin: 0,
    color: '#6200ee'
  }



});