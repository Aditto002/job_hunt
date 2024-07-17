import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const MyAppBar = ({ title }) => {
  const navigation = useNavigation();

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Appbar.Action icon="dots-vertical" onPress={() => {}} /> 
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default MyAppBar;
