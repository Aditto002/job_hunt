import React from 'react';
import { Button, StyleSheet, View, SafeAreaView, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Appbar, SegmentedButtons, Text, Searchbar } from 'react-native-paper';
import { Icon, MD3Colors } from 'react-native-paper';

export const Home = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const jobs = [
    { id: '1', title: 'Software Developer', location: 'Sylhet, AuthLab', type: 'Full-time' },
    { id: '2', title: 'Project Manager', location: 'Dhaka, ABCD', type: 'Part-Time' },
    { id: '3', title: 'Software Developer', location: 'Sylhet, AuthLab', type: 'Full-time' },
    { id: '4', title: 'Project Manager', location: 'Dhaka, ABCD', type: 'Part-Time' },
    { id: '5', title: 'Software Developer', location: 'Sylhet, AuthLab', type: 'Full-time' },
    { id: '6', title: 'Project Manager', location: 'Dhaka, ABCD', type: 'Part-Time' },
    { id: '7', title: 'Software Developer', location: 'Sylhet, AuthLab', type: 'Full-time' },
    { id: '8', title: 'Project Manager', location: 'Dhaka, ABCD', type: 'Part-Time' },
    { id: '9', title: 'Software Developer', location: 'Sylhet, AuthLab', type: 'Full-time' },
    { id: '10', title: 'Project Manager', location: 'Dhaka, ABCD', type: 'Part-Time' },
    { id: '11', title: 'Software Developer', location: 'Sylhet, AuthLab', type: 'Full-time' },
    { id: '12', title: 'Project Manager', location: 'Dhaka, ABCD', type: 'Part-Time' },
  ];

  const renderJobItem = ({ item }) => (
    <View style={styles.jobItem}>
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text style={styles.jobDetails}>{item.location} - {item.type}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('JobDetails', { jobId: item.id })}>
        <Text style={styles.jobLink}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  const navigation = useNavigation();

  return (
    <>
      <View>
        <Appbar.Header style={styles.homeheader}>
          <Icon source="home" color={MD3Colors.black} size={28} />
          <Appbar.Content style={{ paddingLeft: 10 }} title="Home" />
          <Appbar.Content style={{ paddingLeft: 140 }} title="JobNest" onPress={() => navigation.navigate('Home')} />
        </Appbar.Header>

        <View style={styles.containers}>
          <View style={styles.Sub_container}>
            <Text>Total Jobs</Text>
            <Text>6</Text>
          </View>
          <View style={styles.Sub_container}>
            <Text>Part Time</Text>
            <Text>2</Text>
          </View>
          <View style={styles.Sub_container}>
            <Text>Full Time</Text>
            <Text>4</Text>
          </View>
        </View>


      </View>

      <View style={styles.container}>
        
        <FlatList
          data={jobs}
          renderItem={renderJobItem}
          keyExtractor={item => item.id}
          style={styles.jobList}
        />
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeheader: {
    marginLeft: 10,
    display: 'flex',
    justifyContent: 'space-between',
  },
  containers: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  Sub_container: {
    borderColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 30,
    color: 'white',
    elevation: 4,
    alignItems: 'center',
    borderRadius: 5,
  },
  seardhstyles: {
    marginHorizontal: 20,
    marginVertical: 30,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  jobList: {
    flex: 1,
  },
  jobItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
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
    marginTop: 5,
  },
});
