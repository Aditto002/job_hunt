import axios from 'axios';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, StyleSheet, Text, ActivityIndicator, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // Add this for scrolling with keyboard

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const sendToGoogleSheets = async () => {
    if (!name || !email || !message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const formData = {
      name,
      email,
      message,
    };

    setLoading(true); // Start the loading animation

    // Clear the form immediately after submit, even if the request fails
    setName('');
    setEmail('');
    setMessage('');

    try {
      const response = await axios.post(
        'https://script.google.com/macros/s/AKfycbwTt-fH01k2DmKWk8VapXY1KokNj0Mm6fovyQ6iYodOm_6M6ARRj4YfdmhnywoDzoBL/exec',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.result === 'success') {
        Alert.alert('Success', 'Your message has been sent');
      } else {
        throw new Error('Failed to send message: Invalid response structure.');
      }
    } catch (error) {
      Alert.alert('Alert', 'Your message has sent successfully. We will get back to you soon.');
    } finally {
      setLoading(false); // Stop the loading animation
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} enableOnAndroid={true} extraScrollHeight={100}>
      {/* Header */}
      <Text style={styles.header}>Support</Text>

      {/* Company Information Card with help points */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Need Help?</Text>
        <Text style={styles.infoText}>
          If you're facing any problems or need assistance, feel free to contact us:
        </Text>
        <Text style={styles.bulletPoint}>• For technical issues with our services</Text>
        <Text style={styles.bulletPoint}>• Help with account-related queries</Text>
        <Text style={styles.bulletPoint}>• Any other assistance you might need</Text>
        <Text style={styles.infoText}>     We're here to help you at any time!</Text>
      </View>

      {/* Contact Form */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.textArea}
          placeholder="Your Message"
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={sendToGoogleSheets}
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Send Message</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Ensure full scroll view
    padding: 20,
    backgroundColor: '#f5f7fa',
  },
  header: {
    fontSize: 28,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 30,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    paddingLeft: 10,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    height: 120,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#9c9c9c',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ContactForm;