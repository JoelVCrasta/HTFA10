import React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';

const Survey = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>Survey</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 'auto',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

export default Survey;
