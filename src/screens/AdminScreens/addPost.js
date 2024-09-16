import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph, List, Appbar } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const PostJob = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('full-time');
  const [salary, setSalary] = useState('');
  const [experience, setExperience] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [description, setDescription] = useState('');

  const handlePostJob = async () => {
    try {
      const formData = {
        jobTitle: title,
        company: company,
        location: location,
        jobType: jobType,
        salary: salary,
        experience: experience,
        qualifications: qualifications,
        description: description,
      };

      const token = await AsyncStorage.getItem('token');
      const response = await axios.post('http://192.168.1.228:3000/api/job/addjobs', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === 'success') {
        Toast.show({
          type: 'success',
          text1: 'Post added',
          text2: 'Post added successfully',
          visibilityTime: 5000,
        });
      }
      navigation.navigate('AdminJoblist');
    } catch (error) {
      console.error('Error posting job: ', error);
    }
  };

  const CustomRadioButton = ({ value, selectedValue, onSelect, label }) => (
    <TouchableOpacity style={styles.radioButtonContainer} onPress={() => onSelect(value)}>
      <View style={[styles.radioCircle, selectedValue === value && styles.selectedRadioCircle]}>
        {selectedValue === value && <View style={styles.selectedInnerCircle} />}
      </View>
      <Paragraph style={styles.radioLabel}>{label}</Paragraph>
    </TouchableOpacity>
  );

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Post a Job" />
      </Appbar.Header>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Card style={styles.card}>
            <Card.Content>
              <Title>Post a Job</Title>
              <Paragraph>Fill in the details below to post a new job.</Paragraph>

              <TextInput
                label="Job Title"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
                mode="outlined"
              />

              <TextInput
                label="Company"
                value={company}
                onChangeText={setCompany}
                style={styles.input}
                mode="outlined"
              />

              <TextInput
                label="Location"
                value={location}
                onChangeText={setLocation}
                style={styles.input}
                mode="outlined"
              />

              <List.Section title="Job Type">
                <View>
                  <CustomRadioButton
                    value="full"
                    selectedValue={jobType}
                    onSelect={setJobType}
                    label="Full-Time"
                  />
                  <CustomRadioButton
                    value="part"
                    selectedValue={jobType}
                    onSelect={setJobType}
                    label="Part-Time"
                  />
                </View>
              </List.Section>

              <TextInput
                label="Salary"
                value={salary}
                onChangeText={setSalary}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />

              <TextInput
                label="Experience"
                value={experience}
                onChangeText={setExperience}
                style={styles.input}
                mode="outlined"
              />

              <TextInput
                label="Qualifications"
                value={qualifications}
                onChangeText={setQualifications}
                style={styles.input}
                mode="outlined"
              />

              <TextInput
                label="Job Description"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                style={styles.input}
                mode="outlined"
              />

              <Button mode="contained" onPress={handlePostJob} style={styles.button}>
                Post Job
              </Button>
            </Card.Content>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  input: {
    backgroundColor: '#f0f0f0',
    marginBottom: 16,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4d575b',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRadioCircle: {
    borderColor: '#4d575b',
  },
  selectedInnerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#4d575b',
  },
  radioLabel: {
    fontSize: 16,
    color: '#4d575b',
  },
  button: {
    marginTop: 16,
  },
});

export default PostJob;
