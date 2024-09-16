import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Appbar, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ApplyJob = ({route}) => {
  const { jobId } = route.params;
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');

  const handleSubmit = async() => {
    if (!fullName || !email || !phone || !address || !education || !experience || !skills) {
      Alert.alert('Error', 'Please fill in all fields');
    } else {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.post('http://192.168.1.228:3000/api/job/appliedjobs', {
          name:fullName,
            email: email,
            phone_number:phone,
            Address: address,
            education: education,
            experience: experience,
            skills:skills,
            jobId
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.status === 200) {
          Alert.alert('Success', 'Your application has been submitted');
          navigation.goBack();
        } else {
          console.log('Error:', response.data);
        }
      } catch (error) {
        console.error('Error submitting application:', error);
      }
     
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Apply for Job" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container}>
        {/* <Text>{jobId}</Text> */}
        <TextInput
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
          underlineColor="transparent"
              mode="outlined" 
              theme={{
                colors: {
                  primary: '#6c7173', 
                  background: '#f0f0f0', 
                  text: 'black' 
                }
              }}
        />
        <TextInput
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          underlineColor="transparent"
              mode="outlined" 
              theme={{
                colors: {
                  primary: '#4d575b', 
                  background: '#f0f0f0', 
                  text: 'black' 
                }
              }}
        />
        <TextInput
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          underlineColor="transparent"
              mode="outlined" 
              theme={{
                colors: {
                  primary: '#4d575b', 
                  background: '#f0f0f0', 
                  text: 'black' 
                }
              }}
        />
        <TextInput
          label="Address"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
          underlineColor="transparent"
              mode="outlined" 
              theme={{
                colors: {
                  primary: '#4d575b', 
                  background: '#f0f0f0', 
                  text: 'black' 
                }
              }}
        />
        <TextInput
          label="Education Background"
          value={education}
          onChangeText={setEducation}
          style={styles.input}
          multiline
          numberOfLines={4}
          underlineColor="transparent"
              mode="outlined" 
              theme={{
                colors: {
                  primary: '#4d575b', 
                  background: '#f0f0f0', 
                  text: 'black' 
                }
              }}
        />
        <TextInput
          label="Work Experience"
          value={experience}
          onChangeText={setExperience}
          style={styles.input}
          underlineColor="transparent"
              mode="outlined" 
              theme={{
                colors: {
                  primary: '#4d575b', 
                  background: '#f0f0f0', 
                  text: 'black' 
                }
              }}
        />
        <TextInput
          label="Skills and Qualifications"
          value={skills}
          onChangeText={setSkills}
          style={styles.input}
          multiline
          numberOfLines={4}
          underlineColor="transparent"
              mode="outlined" 
              theme={{
                colors: {
                  primary: '#4d575b', 
                  background: '#f0f0f0', 
                  text: 'black' 
                }
              }}
        />
        <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
          Submit
        </Button>
      </ScrollView>
    </>
  );
};

export default ApplyJob;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  submitButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#6200ea',
  },
});
