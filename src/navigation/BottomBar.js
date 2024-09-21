import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon, MD3Colors } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Feather from '@expo/vector-icons/Feather';

const BottomBar = () => {
  const [activeItem, setActiveItem] = useState('home');
  const { currentUser} = useSelector(state =>state.user);

  const navigation = useNavigation()
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const handlePress = () => {
    if (!currentUser) {
      navigation.navigate('Login');
    } else if (currentUser.userType === 'Admin') {
      navigation.navigate('AdminScreen');
    } else {
      navigation.navigate('Profile');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.bottom_bar, activeItem === 'home' && styles.active]}
        onPress={() => navigation.navigate('Home')}
      >
        <Icon source="home" color={MD3Colors.black} size={28} />
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
         style={[styles.bottom_bar, activeItem === 'post' && styles.active]}
        onPress={() => navigation.navigate('JobPost')} 
      >
        
        <Icon source="post" color={MD3Colors.black} size={28} />
        <Text>Post</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.bottom_bar, activeItem === 'chat' && styles.active]}
        onPress={() => navigation.navigate('ChatScreen')}
      >
        <Icon source="chat" color={MD3Colors.black} size={28} />
        <Text>Support</Text>
      </TouchableOpacity>
         <TouchableOpacity
      style={[styles.bottom_bar, activeItem === 'profile' && styles.active]}
      onPress={handlePress}
    >
      {
  !currentUser ? (
    <>
      <Feather name={'log-in'} style={styles.f_icons_G} />
      <Text style={styles.profile_style}>Login</Text>
    </>
  ) : currentUser.userType === 'Admin' ? (
    <>
      <Feather name={'user-plus'} style={styles.d_icons_G} />
      <Text style={styles.profile_style}>DashB..</Text>
    </>
  ) : (
    <>
      <Feather name={'user'} style={styles.f_icons_G} />
      <Text style={styles.profile_style}>Profile</Text>
    </>
  )
}
    </TouchableOpacity>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  container: {
    // position: 'fixed',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
  },
  bottom_bar: {
    alignItems: 'center',
  },
  active: {
    color: 'blue',
  },
  f_icons_G:{
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -25 }],
    color: 'black',
    fontSize: 25, 
  },
  d_icons_G:{
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -25 }],
    color: 'black',
    fontSize: 28,
    // marginLeft:20

  },
  profile_style:{
    marginTop:28,
    marginRight:-10
  },
  profile_styles:{
    marginTop:26,
    marginRight:-20,
    marginLeft:-20
  }
});
