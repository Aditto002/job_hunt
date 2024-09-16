import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ApplicantsList = ({ route }) => {
  const { jobId } = route.params; // jobId passed when navigating to this screen
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch job post with applicants
  const fetchJobPostWithApplicants = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      
      const response = await axios.get(`http://192.168.1.228:3000/api/job/getJobPostsWithApplicants/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const jobData = response.data.data;
      const job = jobData.find(job => job._id === jobId);
      setApplicants(job ? job.applied : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching applicants:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobPostWithApplicants();
  }, []);


  const handleAction = (applicantId, action) => {
    console.log(`Applicant ${applicantId} ${action}`);
  };

  const renderApplicantItem = ({ item }) => (
    <View style={styles.applicantItem}>
      <Text style={styles.name}>Name: {item.name}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Phone: {item.phone_number}</Text>
      <Text>Address: {item.Address}</Text>
      <Text>Education: {item.education}</Text>
      <Text>Experience: {item.experience}</Text>
      <Text>Skills: {item.skills}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.approveButton]}
          onPress={() => handleAction(item._id, 'approved')}
        >
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.declineButton]}
          onPress={() => handleAction(item._id, 'declined')}
        >
          <Text style={styles.buttonText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : !applicants || applicants.length === 0 ? (
        <Text style={styles.noApplicantsText}>No applicants for this job yet.</Text>
      ) : (
        <FlatList
          data={applicants}
          renderItem={renderApplicantItem}
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
  applicantItem: {
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
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noApplicantsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  approveButton: {
    backgroundColor: '#4CAF50',
  },
  declineButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ApplicantsList;
