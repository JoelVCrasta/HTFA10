import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Picker,
  SafeAreaView,
} from 'react-native';
import {supabase} from '../lib/supabaseClient.js';

const Survey = () => {
  const [data, setData] = useState({
    
  });

  const sendData = async () => {
    try {
      const {data, error} = await supabase.from('obscure').insert({name});
      if (data) {
        console.log(data);
      }
      if (error) throw error;
    } catch (error) {
      console.log('Error', error.message);
    }
  };

  const getData = async () => {
    try {
      const {data, error} = await supabase.from('obscure').select('name');
      if (data) {
        console.log(data);
      }
      if (error) throw error;
    } catch (error) {
      console.log('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>Survey</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.pbox}>
          <Text style={styles.question}>Enter your name</Text>
          <View style={styles.box}>
            <TextInput
              style={styles.answer}
              value={name}
              onChangeText={name => setName(name)}
            />
          </View>
        </View>
        <View style={styles.pbox}>
          <Text style={styles.question}>What is your Occupation</Text>
          <View style={styles.box}>
            <TextInput
              style={styles.answer}
              value={name}
              onChangeText={name => setName(name)}
            />
          </View>
        </View>
        <View style={styles.pbox}>
          <Text style={styles.question}>How much do you usually spend on purchases</Text>
          <View style={styles.box}>
            <Picker></Picker>
          </View>
        </View>
        <View style={styles.pbox}>
          <Text style={styles.question}>How many purchases do you make in a month</Text>
          <View style={styles.box}>
            <TextInput
              style={styles.answer}
              value={name}
              onChangeText={name => setName(name)}
            />
          </View>
        </View>
        <View style={styles.pbox}>
          <Text style={styles.question}>How likely are you to purchase our new products/services</Text>
          <View style={styles.box}>
            <TextInput
              style={styles.answer}
              value={name}
              onChangeText={name => setName(name)}
            />
          </View>
        </View>
        <View>
          <Button title="Submit" onPress={sendData} />
          <Button title="get" onPress={getData} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  question: {
    fontSize: 20,
    color: 'white',
    alignItems: 'flex-start',
    marginLeft: 20,
    marginBottom: 5,
  },
  answer: {
    width: '90%',
    color: 'white',
    fontSize: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
  },
  box: {
    width: '100%',
    alignItems: 'center',
  },
  pbox: {
    width: '100%',
    marginBottom: 20,
  },
});

export default Survey;
