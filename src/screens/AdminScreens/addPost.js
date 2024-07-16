import axios from 'axios';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph, RadioButton, List, Appbar } from 'react-native-paper';

const PostJob = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('full-time');
  const [salary, setSalary] = useState('');
  const [experience, setExperience] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [description, setDescription] = useState('');

  const handlePostJob = async() => {


    try {

      const formData = { jobTitle:title, company:company,location:location , jobType:jobType, salary:salary,experience:experience,qualifications:qualifications,description:description};


      const response = await axios.post("http://192.168.1.228:3000/api/job/addjobs", formData);
      
      console.log('Status:', response.data.status); 
      if(response.data.status == 'success'){
        Alert.alert("post");
      }

    } catch (error) {
      console.error("Error fetching data: ", error);
    }

  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Post a Job" />
      </Appbar.Header>
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
            />
            <TextInput
              label="Company"
              value={company}
              onChangeText={setCompany}
              style={styles.input}
            />
            <TextInput
              label="Location"
              value={location}
              onChangeText={setLocation}
              style={styles.input}
            />
            <List.Section title="Job Type">
              <View style={styles.radioButtonContainer}>
                <View style={styles.radioButton}>
                  <RadioButton
                    value="full-time"
                    status={jobType === 'full' ? 'checked' : 'unchecked'}
                    onPress={() => setJobType('full')}
                  />
                  <Paragraph>Full-Time</Paragraph>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton
                    value="part-time"
                    status={jobType === 'part' ? 'checked' : 'unchecked'}
                    onPress={() => setJobType('part')}
                  />
                  <Paragraph>Part-Time</Paragraph>
                </View>
              </View>
            </List.Section>
            <TextInput
              label="Salary"
              value={salary}
              onChangeText={setSalary}
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              label="Experience"
              value={experience}
              onChangeText={setExperience}
              style={styles.input}
            />
            <TextInput
              label="Qualifications"
              value={qualifications}
              onChangeText={setQualifications}
              style={styles.input}
            />
            <TextInput
              label="Job Description"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              style={styles.input}
            />
            <Button mode="contained" onPress={handlePostJob} style={styles.button}>
              Post Job
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
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
    marginBottom: 16,

  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginTop: 16,
  },
});

export default PostJob;
