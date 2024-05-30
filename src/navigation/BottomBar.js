import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon, MD3Colors } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const BottomBar = () => {
  const [activeItem, setActiveItem] = useState('home');

  const navigation = useNavigation()
  const handleItemClick = (item) => {
    setActiveItem(item);
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
        onPress={() => handleItemClick('chat')}
      >
        <Icon source="chat" color={MD3Colors.black} size={28} />
        <Text>Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.bottom_bar, activeItem === 'login' && styles.active]}
        onPress={() => navigation.navigate('Login')}
      >
        <Icon source="login" color={MD3Colors.black} size={28} />
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  container: {
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
});
