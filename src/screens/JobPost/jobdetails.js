import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const JobDetails = ({ route }) => {
  const navigation = useNavigation();
  const { job } = route.params;
  const currentUser = useSelector(state => state.user.currentUser);

  const handleApply = () => {
    if (currentUser) {
      navigation.navigate('ApplyJob', { job });
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Job Details" />
      </Appbar.Header>

      <View style={styles.container}>
        <Text style={styles.title}>{job.jobTitle}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detail}><Text style={styles.detailTitle}>Job Type:</Text> {job.jobType} Time</Text>
          <Text style={styles.detail}><Text style={styles.detailTitle}>Salary:</Text> {job.salary} Tk</Text>
          <Text style={styles.detail}><Text style={styles.detailTitle}>Location:</Text> {job.location}</Text>
          <Text style={styles.detail}><Text style={styles.detailTitle}>Company:</Text> {job.company}</Text>
          <Text style={styles.detail}><Text style={styles.detailTitle}>Experience:</Text> {job.experience}</Text>
          <Text style={styles.detail}><Text style={styles.detailTitle}>Qualifications:</Text> {job.qualifications}</Text>
          <Text style={styles.detail}><Text style={styles.detailTitle}>Description:</Text> {job.description}</Text>
        </View>

        <TouchableOpacity
          style={styles.applyButton}
          onPress={handleApply}
          activeOpacity={0.7}
        >
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default JobDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
    color: '#555',
  },
  detailTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  applyButton: {
    backgroundColor: '#6200ea',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    shadowColor: '#6200ea',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 10,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
