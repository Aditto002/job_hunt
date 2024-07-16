import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Appbar, Text, Searchbar } from 'react-native-paper';
import axios from 'axios';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);
  const [jobCounts, setJobCounts] = useState({ totalJobs: 0, partTimeJobs: 0, fullTimeJobs: 0 });
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://192.168.1.228:3000/api/job/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchJobCounts = async () => {
    try {
      const response = await axios.get('http://192.168.1.228:3000/api/job/job-counts');
      setJobCounts(response.data);
    } catch (error) {
      console.error('Error fetching job counts:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchJobCounts();
  }, []);

  const renderJobItem = ({ item }) => (
    <View style={styles.jobItem}>
      <Text style={styles.JobTitle}>{item.jobTitle}</Text>
      <Text style={styles.jobDetails}>JobType: {item.jobType} Time</Text>
      <Text style={styles.jobDetails}>Salary:{item.salary}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Jobdetails', { job: item})}>
        <Text style={styles.jobLink}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Appbar.Header style={styles.homeheader}>
        <Appbar.Content style={{ paddingLeft: 10 }} title="Home" />
        <Appbar.Content style={{ paddingLeft: 140 }} title="JobNest" onPress={() => navigation.navigate('Home')} />
      </Appbar.Header>

      <View style={styles.containers}>
        <View style={styles.subContainer}>
          <Text>Total Jobs</Text>
          <Text>{jobCounts.totalJobs}</Text>
        </View>
        <View style={styles.subContainer}>
          <Text>Part Time</Text>
          <Text>{jobCounts.partTimeJobs}</Text>
        </View>
        <View style={styles.subContainer}>
          <Text>Full Time</Text>
          <Text>{jobCounts.fullTimeJobs}</Text>
        </View>
      </View>

      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />

      <FlatList
        data={jobs}
        renderItem={renderJobItem}
        keyExtractor={item => item._id}
        style={styles.jobList}
        contentContainerStyle={styles.jobListContainer}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  containers: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  homeheader: {
    marginTop: -50,
    height: 80, 
    backgroundColor: '#D6E3E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  searchbar: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  jobList: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  jobListContainer: {
    paddingBottom: 20,
  },
  jobItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  JobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  jobDetails: {
    fontSize: 14,
    color: '#666',
  },
  jobLink: {
    color: '#007bff',
    marginTop: 5,
  },
});
