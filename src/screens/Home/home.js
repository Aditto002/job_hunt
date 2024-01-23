import { Button, StyleSheet, View,SafeAreaView,FlatList,TouchableOpacity, Linking  } from 'react-native'
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Appbar,SegmentedButtons, Text } from 'react-native-paper';
import { Icon, MD3Colors } from 'react-native-paper';
import React from 'react'
import { Searchbar } from 'react-native-paper';


export const Home = () => {
 
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);


  const navigation = useNavigation()
  return (
    <View >
     <Appbar.Header style={styles.homeheader}>
      <Icon source="home" color={MD3Colors.black} size={28} />
      <Appbar.Content style={{paddingLeft:10, }} title="Home" />
      <Appbar.Content style={{paddingLeft:140, }}  title="JobNest" onPress={() =>navigation.navigate('Home')} />
    </Appbar.Header>


    <View style={styles.container}>
       <View style={styles.Sub_container}>
        <Text>Total Jobs</Text>
        <Text>6</Text>{/* fixed value */}

       </View>
       <View style={styles.Sub_container}>
        <Text>Part Time</Text>
        <Text>2</Text>
        {/* fixed value */}

       </View>

       <View style={styles.Sub_container}>
        <Text>Full Time</Text>
        <Text>4</Text>{/* fixed value */}

       </View>

    </View>
     
     <View style={styles.seardhstyles}>
      {/* icon need */}
      <Text variant="titleMedium" style={{marginBottom:10,paddingLeft:10}}>Search Location</Text>
     <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
     </View>

     <View >
      <Text>Top Jobs</Text>

     </View>
     
  
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  homeheader:{
    marginLeft:10,
    display:'flex',
    justifyContent:'space-between'
  },
  container:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    marginLeft:20,
    marginRight:20,
    marginTop:30

  },
  Sub_container:{
    
    borderColor:"black",
    paddingHorizontal:20,
    paddingVertical:30,
    color:'white',
    elevation: 4,
    alignItems:'center',
    borderRadius: 5,


  },
  seardhstyles:{
    marginHorizontal:20,
    marginVertical:30
  }

})