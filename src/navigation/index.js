import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { Video, ResizeMode } from "expo-av";
// import { useRouter } from "expo-router";
import { useNavigation } from '@react-navigation/native';


const Homebg = () => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const navigation = useNavigation();
    // const router = useRouter();
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: "https://videos.pexels.com/video-files/6700265/6700265-uhd_1440_2560_25fps.mp4",
        }}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={styles.overlay}>
      
        <Text style={styles.mainText}>Welcome</Text>
        <Text style={styles.subText}>To JobNest</Text>
        <Text style={styles.tagline}>Find a Job And Build Future</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>GetStarted</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

export default Homebg

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
      },
      video: {
        ...StyleSheet.absoluteFillObject,
      },
      overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        paddingBottom: 300,
      },
      mainText: {
        color: "white",
        fontSize: 68,
        fontWeight: "bold",
        textAlign: "center",
  
      },
      subText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
      },
      tagline: {
        color: "white",
        fontSize: 18,
        fontStyle: "italic",
        textAlign: "center",
        marginTop: 10,
      },
      buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        position: "absolute",
        bottom: 70,
        top:'70%',
        left: 0,
        right: 0,
      },
      button: {
        backgroundColor: "#6200ea",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 50,
        elevation: 3, // Adds a shadow effect on Android
      },
      buttonText: {
        color: "white",
        fontSize: 21,
        fontWeight: "bold",
      },
})