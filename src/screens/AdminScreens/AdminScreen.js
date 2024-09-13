import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, BackHandler, Alert } from 'react-native';
import { Appbar, Card, Title, Paragraph, Button, DataTable, Divider, List } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { RefreshControl } from 'react-native-gesture-handler';

const AdminScreen = () => {
  const navigation = useNavigation();
  const [adminpostcount, setAdminpostCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const navigateProfile = () => {
    navigation.navigate('Profile');
  };

  const navigateJobPost = () => {
    navigation.navigate('PostJob');
  };
  const navigateAdminJobPost = () => {
    navigation.navigate('AdminJoblist');
  };

  const handleBackPress = () => {
    Alert.alert(
      'Exit App',
      'Are you sure you want to exit?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Exit',
          onPress: () => BackHandler.exitApp(),
        },
      ]
    );
    return true;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('Admin token:', token);

        if (token) {
          const response = await axios.get('http://192.168.1.228:3000/api/job/admintotalpost', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log('Response data:', response.data);
          const { totalPost } = response.data;
          setAdminpostCount(totalPost);
        } else {
          console.error('Token is not available');
        }
      } catch (error) {
        console.error('Error fetching job counts:', error);
      }
    };

    fetchData();
  }, []); // No need to update any value here
  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => {}} />
        <Appbar.Content title="Admin Dashboard" />
        <Feather name="user" style={styles.ficon} onPress={navigateProfile} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}
      //  refreshControl={
      //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      // }
      >
        <Card style={styles.card}>
          <Card.Content>
            <Title>Total Job Posts</Title>
            <Paragraph style={styles.paragraph}>{adminpostcount}</Paragraph>
          </Card.Content>
        </Card>

        <Button icon="plus" mode="contained" onPress={navigateJobPost} style={styles.button}>
          Add Job
        </Button>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Approve Job Applications</Title>
            <Divider style={styles.divider} />
            <Button mode="contained" onPress={() => navigation.navigate('AdminJoblist')}>
              See post
            </Button>
            {/* <DataTable>
              <DataTable.Header>
                <DataTable.Title>Applicant</DataTable.Title>
                <DataTable.Title>Status</DataTable.Title>
                <DataTable.Title>Action</DataTable.Title>
              </DataTable.Header>
              
            </DataTable> */}
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Analytics Overview</Title>
            <Paragraph>Monitor job posts and applications with detailed analytics.</Paragraph>
            <Button mode="contained" onPress={() => navigation.navigate('AdminPostAnalyse')}>
              View Analytics
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Recent Activities</Title>
            <Divider style={styles.divider} />
            <List.Section>
              <List.Item
                title="Added new job post"
                description="10 minutes ago"
                left={props => <List.Icon {...props} icon="briefcase-plus" />}
              />
              <List.Item
                title="Approved job application"
                description="30 minutes ago"
                left={props => <List.Icon {...props} icon="check" />}
              />
              <List.Item
                title="Rejected job application"
                description="1 hour ago"
                left={props => <List.Icon {...props} icon="close" />}
              />
            </List.Section>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
   

    elevation: 3,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    marginBottom: 20,
    backgroundColor: '#6200ee',
  },
  divider: {
    marginVertical: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  approveButton: {
    marginRight: 8,
    backgroundColor: '#4CAF50', 
  },
  ficon:{
    fontSize:25,
    marginRight:15,
  }
  // rejectButton: {
  //   marginLeft: 8,
  //   borderColor: '#F44336', // Red color for reject
  //   color: '#F44336',
  // },
});

export default AdminScreen;
// Job Title
// Company
// Location
// job type (part-time or full-time)
// Salary 
// experience 
// Qualifications
// descripsion