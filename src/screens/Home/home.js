import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, View, SafeAreaView, FlatList, TouchableOpacity, Text } from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);
  const [jobCounts, setJobCounts] = useState({ totalJobs: 0, partTimeJobs: 0, fullTimeJobs: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://192.168.1.228:3000/api/job/jobs');
      setJobs(response.data);
      setFilteredJobs(response.data);
      setIsLoading(false);
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

  useEffect(() => {
    const lowercasedFilter = searchQuery.toLowerCase();
    const filteredData = jobs.filter(item => {
      return (item.jobTitle.toLowerCase().includes(lowercasedFilter)||item.location.toLowerCase().includes(lowercasedFilter));
    });
    setFilteredJobs(filteredData);
  }, [searchQuery, jobs]);

  const renderJobItem = ({ item }) => (
    <View style={styles.jobItem}>
      <View style={styles.jobInfo}>
        <Text style={styles.jobTitle}>{item.jobTitle}</Text>
        <Text style={styles.jobDetails}>JobType: {item.jobType.charAt(0).toUpperCase() + item.jobType.slice(1)} Time</Text>
        <Text style={styles.jobDetails}>Salary: {item.salary} Tk</Text>
      </View>
      <View style={styles.jobLinkContainer}>
        <View style={styles.buttonContainer}>
          <View style={styles.innerShadow} />
          <TouchableOpacity style={styles.bnt} onPress={() => navigation.navigate('Jobdetails', { job: item })}>
            <Text style={styles.jobLink}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
       <Appbar.Header style={styles.appbarHeader}>
        <Appbar.Content title="JobNest" titleStyle={styles.appbarTitle} />
        {/* <Appbar.Action icon="account-circle" onPress={() => navigation.navigate('Profile')} /> */}
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
        onChangeText={setSearchQuery}
        value={searchQuery}
        clearButtonMode='always'
        autoCapitalize='none'
        autoCorrect={false}
        style={styles.searchbar}
      />

      <FlatList
        data={filteredJobs}
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
  },
  appbarHeader: {
    backgroundColor: '#f0f4f8', 
    elevation: 0, 
    marginTop: 20,
    marginTop: Platform.OS === 'ios' ? -70 : 0, 
    marginLeft: Platform.OS === 'android' ? 140 : 0, 
    shadowOpacity: 0, 
     
  },
  appbarTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 'auto',
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
    fontSize:20,
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
    flexDirection: 'row',  
    justifyContent: 'space-between', 
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
  jobInfo: {
    flex: 1,  
  },
  jobLinkContainer: {
    justifyContent: 'center',  
  },
  bnt: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#0a63a9',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonContainer: {
    position: 'relative',
    borderRadius: 10,
  },
  innerShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
    backgroundColor: '#ebeef1',
    shadowColor: '#ffffff',
    shadowOffset: { width: -10, height: -10 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  jobDetails: {
    fontSize: 14,
    color: '#666',
  },
  jobLink: {
    color: '#007bff',
    fontWeight: '600',
  },
});
