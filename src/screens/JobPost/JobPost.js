import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View, SafeAreaView, FlatList, TouchableOpacity, Linking } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Appbar, SegmentedButtons, Text } from 'react-native-paper';
import axios from 'axios';

const JobPost = () => {
  const navigation = useNavigation();
  const [jobs, setJobs] = useState('all');
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://192.168.1.228:3000/api/job/jobs');
        setJobList(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs === 'all' ? jobList : jobList.filter(job => job.jobType === jobs);

  const handleValueChange = (value) => {
    setJobs(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Job Posts</Text>
      </View>

      <View style={styles.subHeader}>
        <Text style={styles.headerText}>Find Your Best Job</Text>
      </View>

      <SafeAreaView style={styles.segmentedButtonsContainer}>
        <SegmentedButtons
          value={jobs}
          onValueChange={handleValueChange}
          buttons={[
            { value: 'all', label: 'All Jobs' },
            { value: 'part', label: 'Part Time' },
            { value: 'full', label: 'Full Time' },
          ]}
        />
      </SafeAreaView>

      <FlatList
        contentContainerStyle={styles.list}
        data={filteredJobs}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.jobCard}>
            <Text style={styles.jobTitle}>{item.jobTitle}</Text>
            <Text style={styles.jobDetail}>JobType: {item.jobType} Time</Text>
            <Text style={styles.jobDetail}>Salary:{item.salary}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
              <Text style={styles.learnMore}>Learn more</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default JobPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  header: {
    height: 80, 
    backgroundColor: '#D6E3E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subHeader: {
    height: 50,
    backgroundColor: '#f0f4f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#0C090A',
    marginBottom: -25,
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#6200ea',
  },
  segmentedButtonsContainer: {
    marginHorizontal: 15,
    marginVertical: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  list: {
    paddingHorizontal: 15,
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  jobDetail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  learnMore: {
    color: '#6200ea',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
