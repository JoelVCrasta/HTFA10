import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native';
import Header from '../components/Header';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default Home;
