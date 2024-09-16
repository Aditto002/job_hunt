import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const UpdateJobPostScreen = ({ route, navigation }) => {
  const { postId } = route.params;
  const [postDetails, setPostDetails] = useState({
    jobTitle: '',
    company: '',
    location: '',
    jobType: '',
    salary: '',
    experience: '',
    qualifications: '',
    description: '',
  });

  const fetchPostDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`http://192.168.1.228:3000/api/job/adminPostdetails/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPostDetails({
        jobTitle: response.data.jobTitle || '',
        company: response.data.company || '',
        location: response.data.location || '',
        jobType: response.data.jobType || '',
        salary: response.data.salary || '',
        experience: response.data.experience || '',
        qualifications: response.data.qualifications || '',
        description: response.data.description || '',
      });
    } catch (error) {
      console.error('Error fetching job post details:', error);
      Alert.alert('Error', 'Error fetching job post details');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPostDetails();
    }, [postId])
  );

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.put(
        `http://192.168.1.228:3000/api/job/adminupdatePost/${postId}`,
        postDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setPostDetails(response.data.updatedPost);
      Alert.alert('Success', 'Post updated successfully');
      navigation.goBack(); 
    } catch (error) {
      console.error('Error updating job post:', error);
      Alert.alert('Error', 'Error updating job post');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100} // Adjust if necessary for header space
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Update Job Post</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Job Title"
          placeholderTextColor="#777"
          value={postDetails.jobTitle}
          onChangeText={(text) => setPostDetails({ ...postDetails, jobTitle: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Company"
          placeholderTextColor="#777"
          value={postDetails.company}
          onChangeText={(text) => setPostDetails({ ...postDetails, company: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          placeholderTextColor="#777"
          value={postDetails.location}
          onChangeText={(text) => setPostDetails({ ...postDetails, location: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Job Type"
          placeholderTextColor="#777"
          value={postDetails.jobType}
          onChangeText={(text) => setPostDetails({ ...postDetails, jobType: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Salary"
          placeholderTextColor="#777"
          value={postDetails.salary}
          onChangeText={(text) => setPostDetails({ ...postDetails, salary: text })}
          keyboardType="numeric"  // Opens numeric keyboard
        />
        <TextInput
          style={styles.input}
          placeholder="Experience"
          placeholderTextColor="#777"
          value={postDetails.experience}
          onChangeText={(text) => setPostDetails({ ...postDetails, experience: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Qualifications"
          placeholderTextColor="#777"
          value={postDetails.qualifications}
          onChangeText={(text) => setPostDetails({ ...postDetails, qualifications: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor="#777"
          value={postDetails.description}
          onChangeText={(text) => setPostDetails({ ...postDetails, description: text })}
          multiline={true}
        />
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update Post</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    height: 80,
    paddingTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
  },
  container: {
    padding: 20,
    backgroundColor: '#f0f4f8',
    flexGrow: 1,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
    color: '#333',
  },
  updateButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default UpdateJobPostScreen;
