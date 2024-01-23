import { StyleSheet, View } from 'react-native'
import { Button, TextInput, Text } from 'react-native-paper';
import React from 'react'
import { NavigationContainer ,useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Login = () => {
  const [text, setText] = React.useState('');
  const navigation = useNavigation()
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
      />

      <TextInput
      label="Password"
      // value={text}
      style={{ borderRadius:15, border:0, margin:10 }}
      // onChangeText={text => setText()}
      />   

<Button icon="login" mode="contained" onPress={() => console.log('Pressed')}>
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