import React, { useState, useRef } from 'react';
import { Avatar, Text, TextInput, Button } from 'react-native-paper';
import { Alert, StyleSheet, View, TouchableOpacity, BackHandler,Linking } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { firebase } from '../../firebaseAuth/firebaseConfig.js';
import 'firebase/compat/storage';
import Feather from '@expo/vector-icons/Feather';
import { updateUserStart, updateUserSuccess, updateUserFailur,signOut } from '../../redux/user/userSlice.js';
import axios from 'axios';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [name, setName] = useState(currentUser?.username);
  const [emails, setEmailes] = useState(currentUser?.email);
  const [passwords, setPasswords] = useState(currentUser?.password);
  // const [phone, setPhone] = useState();
  const [profilePicture, setProfilePicture] = useState(currentUser?.profilePicture);
  const navigation = useNavigation();
//////////////////////////////////////////////////////////////////////////////
  const handelBackpress =()=>{
    Alert.alert(
      'Exit App',
      'Are you sure you want to exit ?',
      [{
        text:'Cancel',
        onPress:()=> null,
        style: 'cancel'
      },{
        text:'Exit',
        onPress:()=> BackHandler.exitApp(),
      }]

    );
    return true;
  }
  useFocusEffect(
    React.useCallback(()=>{
      BackHandler.addEventListener('hardwareBackPress',handelBackpress)
      return ()=>{
        BackHandler.removeEventListener('hardwareBackPress',handelBackpress)
      }
    })
  )
  const handleName = (text) => {
    setName(text);
  };
  
  const handelEmail = (text) => {
    setEmailes(text);
  };
  
  const handelPassword = (text) => {
    setPasswords(text);
  };


  // const handleName = (e) => {
  //   const namevar = e.nativeEvent.text;
  //   setName(namevar);
  // };
  
  // const handelEmail = (e) => {
  //   const emailvar = e.nativeEvent.text;
  //   setEmailes(emailvar);
  // };

  // const handelPassword = (e) => {
  //   const passvar = e.nativeEvent.text;
  //   setPasswords(passvar);
  // };
  // const handelphone = (e) => {
  //   const phonevar = e.nativeEvent.text;
  //   setPhone(phonevar);
  // };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setIsUploaded(false);
    }
  };

  const uploadMedia = async () => {
    setImageLoading(true);

    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });

      const filename = image.substring(image.lastIndexOf('/') + 1);
      const ref = firebase.storage().ref().child(filename);

      await ref.put(blob);
      const downloadURL = await ref.getDownloadURL();
      setImageLoading(false);
      setIsUploaded(true);
      Toast.show({
        type:'success',
        text1:'Photo Uploaded',
        text2:"Photo Uploaded",
        visibilityTime:5000
      })
      setProfilePicture(downloadURL);
    } catch (err) {
      console.error(err);
      setImageLoading(false);
    }
  };

  const payment = async () => {
    try {
      console.log("object id ",currentUser._id);
      const token = await AsyncStorage.getItem('token');
  
      const res = await axios.get(`http://192.168.1.228:3000/api/auth/paymentApply/${currentUser._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const paymentUrl = res.data.url; 
      console.log("Redirecting to payment gateway:", paymentUrl);
  
      
      if (paymentUrl) {
        Linking.openURL(paymentUrl); 
      }
      console.log(" hello aditto ", res.status)
      if(res.status===200){
        Alert.alert('Success', 'Your message has been sent');

      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };
  /////////////////////////////////

  const Sendtobackend = async () => {
    try {
      dispatch(updateUserStart());

      const formData = {};

      if (name !== currentUser.username) {
        formData.username = name;
      }
      if (emails !== currentUser.email) {
        formData.email = emails;
      }
      if (passwords !== currentUser.password) {
        formData.password = passwords;
      }
      if (profilePicture !== currentUser.profilePicture) {
        formData.profilePicture = profilePicture;
      }
      // if (phone) {
      //   formData.phone = phone;
      // }

      if (Object.keys(formData).length === 0) {
        Toast.show({
          type:'error',
          text1:'No Change',
          text2:"Change something and update",
          visibilityTime:5000
        })
        return;
      }

      const response = await axios.post(`http://192.168.1.228:3000/api/user/update/${currentUser._id}`, formData);
   
      
      console.log(response.data.data);
      if(response.status == 200){
        Toast.show({
          type:'success',
          text1:'Update',
          text2:"Update successfully",
          visibilityTime:5000
        })
      }
      dispatch(updateUserSuccess(response.data.data));
    } catch (error) {
      dispatch(updateUserFailur(error));
      console.error("Error fetching data: ", error);
    }
  };

  const SingOutfn =()=>{
    Toast.show({
      type:'success',
      text1:'Login again',
      text2:"Signed Out successfully",
      visibilityTime:5000
    })
         AsyncStorage.removeItem("token");
        //  AsyncStorage.removeItem("isLoggedIn");
          dispatch(signOut());
          navigation.navigate('Login')
  }

  return (
    <>
      <View style={styles.container}>
        {image ? (
          <Avatar.Image size={150} style={styles.avatar} source={{ uri: image }} />
        ) : (
          <Avatar.Image size={150} style={styles.avatar} source={{ uri: profilePicture }} />
        )}
        <TouchableOpacity style={styles.cameraIcon}>
          <Feather name="camera" size={30} color="#000" onPress={pickImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.subcontener}>
        <View style={styles.bntstyle}>
          {!isUploaded && image && (
            <Button icon="upload" mode="contained" loading={imageLoading} onPress={uploadMedia}>
              Upload Image
            </Button>
          )}
        </View>
        <TextInput
  mode="outlined"
  label="Name"
  value={name}
  style={styles.input_margin}
  onChangeText={handleName}
/>
<TextInput
  mode="outlined"
  label="Email"
  value={emails}
  style={styles.input_margin}
  onChangeText={handelEmail}
/>
<TextInput
  mode="outlined"
  label="Password"
  // value={passwords}
  style={styles.input_margin}
  onChangeText={handelPassword}
/>


        <Button mode="contained" style={styles.button} onPress={Sendtobackend}>
          Update
        </Button>
        <Button mode="contained" style={styles.button} onPress={SingOutfn}>
          Sing Out
        </Button>
        {
  currentUser?.userType === 'User' && (
    <Button 
      mode="contained" 
      style={styles.button} 
      onPress={() => navigation.navigate('AppliedJobsList')}
    >
      Applied Job List
    </Button>
  )
}
        {
           currentUser?.userType === 'User'? (
            <Button mode="contained" style={styles.button} onPress={payment}>
          Become a Advertiser
        </Button>
          ):('')

        }
        
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  subcontener: {
    width: "80%",
    marginHorizontal: 'auto',
  },
  input_margin: {
    marginBottom: 20,
  },
  bntstyle: {
    width: "50%",
    marginHorizontal: 'auto',
    marginBottom: 20,
    marginTop: 8,
  },
  container: {
    marginTop: 100,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    borderWidth: 1,
    borderColor: '#000',
  },
  cameraIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    marginRight: 110,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
  },
  button: {
    marginTop: 10,
    borderRadius: 5,
  },
});
