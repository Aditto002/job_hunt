import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Avatar, Card, Title, Paragraph, Button, DataTable, Divider, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';

const AdminScreen = () => {
  const navigation = useNavigation();
  const navigatProfile =()=>{
    navigation.navigate('Profile')
  }
  const navigatJobPost =()=>{
    navigation.navigate('PostJob')
  }
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => {}} />
        <Appbar.Content title="Admin Dashboard" />
        {/* <Appbar.Action icon="profile" onPress={() => {navigatProfile()}} /> */}
        <Feather name={'user'} style={styles.ficon}  onPress={() => {navigatProfile()}}/>
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Total Job Posts</Title>
            <Paragraph style={styles.paragraph}>00</Paragraph>
          </Card.Content>
        </Card>

        <Button icon="plus" mode="contained" onPress={() => {navigatJobPost()}} style={styles.button}>
          Add Job
        </Button>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Approve Job Applications</Title>
            <Divider style={styles.divider} />
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Applicant</DataTable.Title>
                <DataTable.Title>Status</DataTable.Title>
                <DataTable.Title>Action</DataTable.Title>
              </DataTable.Header>

              {/* <DataTable.Row>
                <DataTable.Cell>Joh</DataTable.Cell>
                <DataTable.Cell>Pending</DataTable.Cell>
                <DataTable.Cell>
                  <View style={styles.actionButtons}>
                    <Button mode="contained" onPress={() => {}} style={styles.approveButton}>
                      Approve
                    </Button>
                  
                  </View>
                </DataTable.Cell>
              </DataTable.Row> */}
              {/* Add more rows as needed */}
            </DataTable>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Analytics Overview</Title>
            <Paragraph>Monitor job posts and applications with detailed analytics.</Paragraph>
            <Button mode="contained" onPress={() => {}}>
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
              {/* Add more items as needed */}
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
  profileIcon: {
    marginRight: 10,
  },
  content: {
    padding: 20,
    paddingBottom: 100, // To provide space for the FAB
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
