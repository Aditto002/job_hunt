import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppliedJobsList = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the job posts where the user has applied
  const fetchAppliedJobs = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      
      const response = await axios.get('http://192.168.1.228:3000/api/job/getJobPostsWithApplied', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
       
      setAppliedJobs(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  // Render each job post
  const renderJobPostItem = ({ item }) => (
    <View style={styles.jobPostItem}>
      <Text style={styles.title}>Job Title: {item.jobTitle}</Text>
      <Text>Company: {item.company}</Text>
      <Text>Location: {item.location}</Text>
      <Text>Job Type: {item.jobType}</Text>
      <Text>Salary: ${item.salary}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Applied On: {new Date(item.createdAt).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : appliedJobs.length === 0 ? (
        <Text style={styles.noJobsText}>You haven't applied for any jobs yet.</Text>
      ) : (
        <FlatList
          data={appliedJobs}
          renderItem={renderJobPostItem}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  list: {
    paddingBottom: 20,
  },
  jobPostItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noJobsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default AppliedJobsList;
