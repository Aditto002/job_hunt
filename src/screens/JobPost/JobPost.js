import { Button, StyleSheet, View,SafeAreaView,FlatList,TouchableOpacity, Linking  } from 'react-native'
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Appbar,SegmentedButtons, Text } from 'react-native-paper';
import { Icon, MD3Colors } from 'react-native-paper';
import React from 'react'


export const JobPost = () => {
 
  const navigation = useNavigation()
  const [jobs, setJobs] = React.useState('all');

  const jobList = [
    {
      id: '1',
      jobType: 'full',
      payment: '$60,000 per year',
      jobDescription: 'Senior Web Developer',
      workHours:"5 year",
      link: 'https://chat.openai.com/c/cbd4089e-23cb-46af-82d9-7c4161e77825'
    },
    {
      id: '2',
      jobType: 'part',
      payment: '$20 per hour',
      workHours:"6 hours",
      jobDescription: 'Social Media Manager',
      link: 'https://chat.openai.com/c/cbd4089e-23cb-46af-82d9-7c4161e77825'
    },
    {
      id: '3',
      jobType: 'full',
      payment: '$70,000 per year',
      workHours:"10 years",
      jobDescription: 'Data Scientist',
      link: 'https://chat.openai.com/c/cbd4089e-23cb-46af-82d9-7c4161e77825'
    },
    {
      id: '11',
      jobType: 'full',
      payment: '$60,000 per year',
      jobDescription: 'Senior Web Developer',
      workHours:"5 year",
      link: 'https://chat.openai.com/c/cbd4089e-23cb-46af-82d9-7c4161e77825'
    },
    {
      id: '12',
      jobType: 'part',
      payment: '$20 per hour',
      workHours:"6 hours",
      jobDescription: 'Social Media Manager',
      link: 'https://chat.openai.com/c/cbd4089e-23cb-46af-82d9-7c4161e77825'
    },
    {
      id: '13',
      jobType: 'full',
      payment: '$70,000 per year',
      workHours:"10 years",
      jobDescription: 'Data Scientist',
      link: 'https://chat.openai.com/c/cbd4089e-23cb-46af-82d9-7c4161e77825'
    },
  ];
  
  const filteredJobs = jobs=== 'all' ? jobList : jobList.filter(job => job.jobType === jobs);

  const handleValueChange = (value) => {
    setJobs(value);
  };


  return (
    <View style={styles.container}>
      {/* Home bar  */}
    <Appbar.Header style={styles.homeheaders}>
      <Appbar.Content style={{paddingLeft:10,alignItems:'center', }} title="Job posts" />
      {/* <Appbar.Action icon={{ uri: 'https://static.vecteezy.com/system/resources/previews/015/119/100/original/businessman-icon-man-icon-design-illustration-free-png.png' }} onPress={() =>navigation.navigate('Login')} /> */}
      {/* <Appbar.Action icon="dots-vertical" onPress={_handleMore} /> */}
    </Appbar.Header>

     <View style={{justifyContent:'center',alignItems:'center',marginTop:20,marginBottom:20}}>
      <Text variant="headlineSmall" >Find your best jobs</Text>
      </View>

      <SafeAreaView style={{marginLeft:15, marginRight:15}}>
      <SegmentedButtons
        value={jobs}
        onValueChange={handleValueChange}
        buttons={[
          {
            value: 'all',
            label: 'All Jobs',
          },
          {
            value: 'part',
            label: 'Part Time',
          },
          { value: 'full', label: 'Full Time' },
        ]}
      />
    </SafeAreaView>
    <View style={styles.jobs_Views}>
    <FlatList
  data={filteredJobs}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.jobs_Items} >
      <Text>Job Type : {item.jobDescription}</Text>
      <Text>Salary : {item.payment}</Text>
      <Text>Job Hours : {item.workHours}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
            <View style={{flexDirection: 'row', alignItems: 'center' }}>
              <Text>Learn more </Text>
              {/* <Icon name="home" color="black" size={10} /> */}
            </View>
          </TouchableOpacity>
    </View>
  )}
/>
</View>
    </View>
  )
}

export default JobPost

const styles = StyleSheet.create({
  homeheaders:{
    paddingLeft:15
  },
  jobs_Items:{
    alignItems:'center',
    marginTop:10,
    padding:50,
    borderWidth:  2,
    borderColor:"black",  
  },
  jobs_Views:{
    alignItems:'center',
    marginBottom:425
  }
})