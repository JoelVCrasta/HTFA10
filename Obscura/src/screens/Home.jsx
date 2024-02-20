import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import Header from '../components/Header';
import Survey from '../components/Survey';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header />
        <Survey />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },
});

export default Home;
