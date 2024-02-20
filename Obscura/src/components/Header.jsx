import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';

const Header = () => {
  

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>Obscura</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ba181b',
  },
  header: {
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default Header;
