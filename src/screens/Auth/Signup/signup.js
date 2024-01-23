import { StyleSheet, View } from 'react-native'
import React from 'react'
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Button, Text, TextInput } from 'react-native-paper'

const Signup = () => {
  const [text, setText] = React.useState('');
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Text  variant="displaySmall" style={{margin:8}}> Hey,Welcome</Text>
      <Text style={styles.text_space} variant="labelLarge">Find your best job in Jobnest</Text> 
      <Text variant="titleLarge" style={{ fontWeight: "bold" ,margin:8}}>SignUp</Text>

      <View style={styles.subcontainer}>
      <TextInput
      label="User Name"
      // value={text}
       style={{margin:10 }}
      // onChangeText={text => setText(text)}
      />

     <TextInput
      label="Email"
      // value={text}
       style={{margin:10 }}
      // onChangeText={text => setText(text)}
      />


     <TextInput
      label="Password"
      // value={text}
       style={{margin:10 }}
      // onChangeText={text => setText(text)}
      />



    <Button style={{marginTop:5}} icon="login" mode="contained" onPress={() => console.log('Pressed')}>
    SignUp
  </Button>


  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center",marginTop:5 }}>
  <Text style={{ marginRight: 0 }}>Already have an account, please</Text>
  <Button icon="" mode="text" style={{ padding: 0, margin: 0 }} onPress={() => navigation.navigate('Login')}>
    Login
  </Button>
</View>

      </View>
    </View>
  )
}

export default Signup

const styles = StyleSheet.create({
   container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
   },
   subcontainer:{
    width:"80%"
   }

})