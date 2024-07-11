import { StyleSheet, View,TouchableOpacity } from 'react-native'
import { Button, TextInput, Text } from 'react-native-paper';
import React, { useState } from 'react'
import { NavigationContainer ,useNavigation} from '@react-navigation/native';
import axios from 'axios';
import { signInStart,signInSuccess,signInFailure } from '../../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Feather from '@expo/vector-icons/Feather';




const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.user);
  const [showPassword,setShowPassword] = useState(false);
  const [passwords,setPasswords]=useState('');

  const loginInfo = async () => {
    try {
      dispatch(signInStart());
      const formData = { email, password };
      const response = await axios.post("http://192.168.1.228:3000/api/auth/singin", formData);
      if (response.data.status !== 'success') {
        dispatch(signInFailure());
        return;
      }
      dispatch(signInSuccess(response.data.data.user));
      console.log(response.data)
      navigation.navigate('Home');
    } catch (error) {
      dispatch(signInFailure(error));
      console.error("Error fetching data: ", error);
    }
  };

  return (
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
        {/* <TouchableOpacity style={styles.iconContainer} onPress={() => setShowPassword(!showPassword)}>
              {
                passwords.length < 1 ? null : !showPassword ? (
                  <Feather name={'eye-off'} style={styles.pass_icons} />
                ) : (
                  <Feather name={'eye'} style={styles.pass_icons} />
                )
              }
            </TouchableOpacity> */}
            </View>
        <Button mode="contained" style={styles.button} onPress={loginInfo} loading={loading}>
          Login
        </Button>
        <Button mode="text" style={styles.button} onPress={() => navigation.navigate('Signup')}>
          New to JobNest? Sign up here
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  input: {
    marginBottom: 10,
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
});

export default Login

