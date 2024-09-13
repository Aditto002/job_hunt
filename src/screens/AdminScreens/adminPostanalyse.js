import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AdminPostAnalyse = () => {
  const [jobs, setJobs] = useState([]);
  
  const { currentUser } = useSelector(state => state.user);// Assuming you store the user information in the Redux store

  useEffect(() => {
    
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://192.168.1.228:3000/api/jobs?admin=${currentUser._id}`);
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs: ", error);
      }
    };

    fetchJobs();
  }, [currentUser._id]);

  const renderJobItem = ({ item }) => (
    <View style={styles.jobItem}>
      <Text style={styles.jobTitle}>{item.jobTitle}</Text>
      <Text style={styles.jobDetails}>JobType: {item.jobType} Time</Text>
      <Text style={styles.jobDetails}>Salary: {item.salary}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <FlatList
        data={jobs}
        renderItem={renderJobItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  jobItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  jobDetails: {
    fontSize: 14,
    color: '#555',
  },
});

export default AdminPostAnalyse;
