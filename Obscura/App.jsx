import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Home from './src/screens/Home.jsx';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Home />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
