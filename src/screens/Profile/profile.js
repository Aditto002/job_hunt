import React, { useState, useRef } from 'react';
import { Avatar, Text, TextInput, Button } from 'react-native-paper';
import { Alert, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { firebase } from '../../firebaseAuth/firebaseConfig.js';
import 'firebase/compat/storage';
import Feather from '@expo/vector-icons/Feather';
import { updateUserStart, updateUserSuccess, updateUserFailur,signOut } from '../../redux/user/userSlice.js';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [name, setName] = useState(currentUser.username);
  const [emails, setEmailes] = useState(currentUser.email);
  const [passwords, setPasswords] = useState(currentUser.password);
  const [profilePicture, setProfilePicture] = useState(currentUser.profilePicture);
  const navigation = useNavigation();
  const handleName = (e) => {
    const namevar = e.nativeEvent.text;
    setName(namevar);
  };
  
  const handelEmail = (e) => {
    const emailvar = e.nativeEvent.text;
    setEmailes(emailvar);
  };

  const handelPassword = (e) => {
    const passvar = e.nativeEvent.text;
    setPasswords(passvar);
  };

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
      Alert.alert('Photo Uploaded !!');
      setProfilePicture(downloadURL);
    } catch (err) {
      console.error(err);
      setImageLoading(false);
    }
  };

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

      if (Object.keys(formData).length === 0) {
        Alert.alert("No changes made");
        return;
      }

      const response = await axios.post(`http://192.168.1.228:3000/api/user/update/${currentUser._id}`, formData);
      if (response.data.status !== 'success') {
        dispatch(updateUserFailur());
        return;
      }
      dispatch(updateUserSuccess(response.data.data.user));
      console.log(response.data.data.user);
    } catch (error) {
      dispatch(updateUserFailur(error));
      console.error("Error fetching data: ", error);
    }
  };

  const SingOutfn =()=>{
      
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
          defaultValue={currentUser.username ?currentUser.username:""}
          style={styles.input_margin}
          onChange={handleName}
        />
        <TextInput
          mode="outlined"
          label="Email"
          defaultValue={currentUser.email?currentUser.email:""}
          style={styles.input_margin}
          onChange={handelEmail}
        />
        <TextInput
          mode="outlined"
          label="Password"
          // defaultValue={currentUser.password}
          onChange={handelPassword}
        />
        <Button mode="contained" style={styles.button} onPress={Sendtobackend}>
          Update
        </Button>
        <Button mode="contained" style={styles.button} onPress={SingOutfn}>
          Sing Out
        </Button>
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
