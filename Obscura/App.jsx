import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Home from './src/screens/Home.jsx';
import Ocr from './src/screens/Ocr.jsx';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Home /> */}
      <Ocr />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
