import React from 'react';
import { View, Text, Button } from 'react-native';

const SuccessPayment = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Payment was successful!</Text>
      <Button title="Go Back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default SuccessPayment;
