import * as React from 'react';
import { Avatar, Text, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native'

const Profile = () => {
    return(
        <>
        <View style={styles.contener}>
        <Avatar.Image size={150} style={styles.avater} source={require('../../../assets/imgprofile.png')} />
        </View>

        <View style={styles.subcontener}>
            <TextInput mode="outlined"
                     label="Name"
                    //  placeholder="Name"
                     style={styles.input_margin}
                     >
            </TextInput>
            <TextInput mode="outlined"
                     label="Email"
                    //  placeholder="Email"
                     style={styles.input_margin}
                     >
            </TextInput>
            <TextInput mode="outlined"
                     label="PassWord"
                    //  placeholder="PassWord"
                     >
            </TextInput>
        </View>

        </>
    );
};
export default Profile
const styles = StyleSheet.create({
    contener:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop: 70
    },
    subcontener:{
      width: "80%" ,
      marginHorizontal:'auto'
    },
    input_margin:{
      marginBottom:20
    }
  });
  