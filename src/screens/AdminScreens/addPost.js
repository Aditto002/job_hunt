import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';

const PostJob = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');

  const handlePostJob = () => {
    // Handle the job posting logic here
    console.log({
      title,
      description,
      location,
      salary
    });
    // Optionally navigate back or show a success message
  };

  return (
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
            label="Job Description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            style={styles.input}
          />
          <TextInput
            label="Location"
            value={location}
            onChangeText={setLocation}
            style={styles.input}
          />
          <TextInput
            label="Salary"
            value={salary}
            onChangeText={setSalary}
            style={styles.input}
            keyboardType="numeric"
          />
          <Button mode="contained" onPress={handlePostJob} style={styles.button}>
            Post Job
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default PostJob;
