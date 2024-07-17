import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ApplyJob = ({ route }) => {
  const { job } = route.params;
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');

  const handleSubmit = () => {
    if (!fullName || !email || !phone || !address || !education || !experience || !skills) {
      Alert.alert('Error', 'Please fill in all fields');
    } else {
      Alert.alert('Success', 'Your application has been submitted');
      navigation.goBack();
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Apply for Job" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />
        <TextInput
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
        />
        <TextInput
          label="Address"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
        />
        <TextInput
          label="Education Background"
          value={education}
          onChangeText={setEducation}
          style={styles.input}
        />
        <TextInput
          label="Work Experience"
          value={experience}
          onChangeText={setExperience}
          style={styles.input}
        />
        <TextInput
          label="Skills and Qualifications"
          value={skills}
          onChangeText={setSkills}
          style={styles.input}
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
