import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {supabase} from '../lib/supabaseClient.js';
import CryptoJS from 'crypto-js';
// import bcrypt from 'react-native-bcrypt';

const Survey = () => {
  const [data, setData] = useState({
    name: '',
    occupation: '',
    amount: 'below $50',
    purchases: 'below 5',
    likely: 'not likely',
  });
  const [isClicked, setIsClicked] = useState(false);

  const allData = `name: ${data.name}, occupation: ${data.occupation}, amount: ${data.amount}, purchases: ${data.purchases}, likely: ${data.likely}`;

  const key = CryptoJS.enc.Utf8.parse('v5T2RpmzkuU2qyMQXVYyqx7Wpnv');
  const iv = CryptoJS.enc.Utf8.parse('EqZywEkfyeZkpGt2');

  function hashData() {
    console.log(allData);
    const encrypted = CryptoJS.AES.encrypt(allData, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();

    /*  const jsonString = JSON.stringify(allData);
    return CryptoJS.SHA256(jsonString).toString(CryptoJS.enc.Hex); */
    //return cryptData;
    /* const saltRounds = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(allData, saltRounds);
    return hash; */
  }

  const sendData = async () => {
    try {
      const hashedData = hashData();
      const {data, error} = await supabase
        .from('fable')
        .insert({hash_data: hashedData});
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
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.pbox}>
          <Text style={styles.question}>Enter your name</Text>
          <View style={styles.box}>
            <TextInput
              style={styles.answer}
              value={data.name}
              onChangeText={name => setData({...data, name})}
            />
          </View>
        </View>
        <View style={styles.pbox}>
          <Text style={styles.question}>What is your Occupation</Text>
          <View style={styles.box}>
            <TextInput
              style={styles.answer}
              value={data.occupation}
              onChangeText={occupation => setData({...data, occupation})}
            />
          </View>
        </View>
        <View style={styles.pbox}>
          <Text style={styles.question}>
            How much do you usually spend on purchases
          </Text>
          <View style={styles.box}>
            <View style={styles.pPicker}>
              <Picker
                selectedValue={data.amount}
                onValueChange={itemValue =>
                  setData({...data, amount: itemValue})
                }
                style={styles.picker}>
                <Picker.Item label="Less than $50" value="below $50" />
                <Picker.Item label="$100-$200" value="between $100-$200" />
                <Picker.Item label="$200-$300" value="between $100-$200" />
                <Picker.Item label="More than $300" value="above $300" />
              </Picker>
              {/* <TextInput
              style={styles.answer}
              value={data.amount}
              onChangeText={amount => setData({...data, amount})}
            /> */}
            </View>
          </View>
        </View>
        <View style={styles.pbox}>
          <Text style={styles.question}>
            How many purchases do you make in a month
          </Text>
          <View style={styles.box}>
            <View style={styles.pPicker}>
              <Picker
                selectedValue={data.purchases}
                onValueChange={itemValue =>
                  setData({...data, purchases: itemValue})
                }
                style={styles.picker}>
                <Picker.Item label="Less than 5" value="below 5" />
                <Picker.Item label="5-10" value="between 5-10" />
                <Picker.Item label="10-15" value="between 10-15" />
                <Picker.Item label="More than 15" value="above 15" />
              </Picker>
              {/* <TextInput
              style={styles.answer}
              value={data.purchases}
              onChangeText={purchases => setData({...data, purchases})}
            /> */}
            </View>
          </View>
        </View>
        <View style={styles.pbox}>
          <Text style={styles.question}>
            How likely are you to purchase our new products/services
          </Text>
          <View style={styles.box}>
            <View style={styles.pPicker}>
              <Picker
                selectedValue={data.likely}
                onValueChange={itemValue =>
                  setData({...data, likely: itemValue})
                }
                style={styles.picker}>
                <Picker.Item label="Not likely" value="not likely" />
                <Picker.Item label="Somewhat likely" value="somewhat likely" />
                <Picker.Item label="Likely" value="likely" />
              </Picker>
              {/* <TextInput
              style={styles.answer}
              value={data.likely}
              onChangeText={likely => setData({...data, likely})}
            /> */}
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={sendData} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  question: {
    fontSize: 20,
    color: 'black',
    alignItems: 'flex-start',
    marginLeft: 20,
    marginBottom: 5,
  },
  answer: {
    width: '90%',
    height: 55,
    padding: 10,
    color: 'black',
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
  picker: {
    width: '90%',
    color: 'black',
  },
  pPicker: {
    width: '90%',
    alignItems: 'center',
    color: 'black',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#ba181b',
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default Survey;
