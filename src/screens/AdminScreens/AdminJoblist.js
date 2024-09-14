import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons'; 
import Toast from 'react-native-toast-message';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const AdminPosts = () => {
  const [adminPostData, setAdminPostData] = useState({ totalPost: 0, posts: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const fetchAdminPostCounts = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await axios.get('http://192.168.1.228:3000/api/job/admintotalpost', {
          headers: {
            Authorization: `Bearer ${token}`,  // Fixed syntax here
          },
        });

        setAdminPostData(response.data);
      } else {
        setError("Token is not available");
      }
    } catch (error) {
      setError('Error fetching job counts');
    } finally {
      setLoading(false);
    }
  };

  // Refetch data when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchAdminPostCounts();
    }, [])
  );

  const handleEdit = (postId) => {
    // Navigate to the UpdateJobPost screen
    navigation.navigate('UpdatJobPost', { postId });
  };

  const handleDelete = async (postId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await axios.delete(`http://192.168.1.228:3000/api/job/admindeletepost/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Post deleted successfully',
          visibilityTime: 5000
        });

        // Refetch the admin post data after deletion
        fetchAdminPostCounts();
      } else {
        Alert.alert("Error", "Token is not available");
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      Alert.alert("Error", "Error deleting post");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.totalPosts}>Total Posts: {adminPostData.totalPost}</Text>
      <FlatList
        data={adminPostData.adminOwnPost}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.jobTitle}>{item.jobTitle}</Text>
            <Text style={styles.detail}><Text style={styles.label}>Company:</Text> {item.company}</Text>
            <Text style={styles.detail}><Text style={styles.label}>Location:</Text> {item.location}</Text>
            <Text style={styles.detail}><Text style={styles.label}>Job Type:</Text> {item.jobType}</Text>
            <Text style={styles.detail}><Text style={styles.label}>Salary:</Text> {item.salary}</Text>
            <Text style={styles.detail}><Text style={styles.label}>Experience:</Text> {item.experience}</Text>
            <Text style={styles.detail}><Text style={styles.label}>Qualifications:</Text> {item.qualifications}</Text>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => handleEdit(item._id)}
              >
                <FontAwesome name="edit" size={18} color="white" />
                <Text style={styles.buttonText}> Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleDelete(item._id)}
              >
                <FontAwesome name="trash" size={18} color="white" />
                <Text style={styles.buttonText}> Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  totalPosts: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
    textAlign: 'center',
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#e6e6e6',
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1abc9c',
    textTransform: 'capitalize',
  },
  detail: {
    fontSize: 14,
    marginBottom: 8,
    color: '#555',
  },
  label: {
    fontWeight: '600',
    color: '#34495e',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  editButton: {
    backgroundColor: '#3498db',
    width: '45%',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    width: '45%',
  },
  buttonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default AdminPosts;
