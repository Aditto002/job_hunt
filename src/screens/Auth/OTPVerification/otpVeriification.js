import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../../../redux/user/userSlice';

const OtpVerification = ({ route, navigation }) => {
  const { email } = route.params; // Email from URL parameters
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();

  const handleVerifyOtp = async () => {
    try {
      dispatch(signInStart());
        console.log("email is ",email)
      const response = await axios.post('http://192.168.1.228:3000/api/auth/verify', {
        email,
        otp,
      });
      console.log("otp info ", response.data)
      await AsyncStorage.setItem('token', response?.data?.data?.token);
      dispatch(signInSuccess(response.data.data.user));

      if (response.status === 200) {
        Alert.alert('OTP verified successfully!');
        navigation.navigate('Home'); // Navigate after success
      } else {
        Alert.alert('Invalid OTP. Please try again.');
      }

      if(response.data.data.user.userType == "Admin"){
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

      navigation.navigate('Home');
    };

      
    } catch (error) {
      
      dispatch(signInFailure(error));
      Alert.alert('Error verifying OTP. Please try again.');
      console.log("error ", error)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>Please enter the OTP sent to your email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
      />
      <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2b2d42',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#8d99ae',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2b2d42',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default OtpVerification;
