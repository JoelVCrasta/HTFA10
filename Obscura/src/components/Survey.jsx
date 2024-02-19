import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  SafeAreaView,
} from 'react-native';
import supabase from 'Obscura/src/supabaseClient.js';

const Survey = () => {
  const [name, setName] = useState('');

  const sendData = async () => {
    try {
      const {data, error} = await supabase
        .from('obscure')
        .insert([{name}])
        .select();

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
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 10,
            marginBottom: 10,
            width: '80%',
            height: 40,
            color: 'white',
          }}
          placeholder="Enter your name"
          defaultValue={name}
          onChangeText={name => setName(name)}
        />
        <Button title="Submit" onPress={sendData} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 'auto',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

export default Survey;
