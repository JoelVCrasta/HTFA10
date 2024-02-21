import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import MlkitOcr from 'react-native-mlkit-ocr';
import {supabase} from '../lib/supabaseClient.js';
import CryptoJS from 'crypto-js';

const Ocr = () => {
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');

  const key = CryptoJS.enc.Utf8.parse('v5T2RpmzkuU2qyMQXVYyqx7Wpnv');
  const iv = CryptoJS.enc.Utf8.parse('EqZywEkfyeZkpGt2');

  function hashData(extractedText) {
    const encrypted = CryptoJS.AES.encrypt(extractedText, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    setText(encrypted.toString());
  }

  const sendData = async () => {
    try {
      const {data, error} = await supabase
        .from('ocr')
        .insert({recog_text: text});
      if (data) {
        console.log(data);
      }
      if (error) throw error;
    } catch (error) {
      console.log('Error', error.message);
    }
  };

  const pickImage = async () => {
    try {
      const options = {
        mediaType: 'photo',
        maxWidth: 2000,
        maxHeight: 2000,
        quality: 1,
        includeBase64: true,
        saveToPhotos: true,
      };

      const result = await launchImageLibrary(options);

      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.error) {
        console.log('ImagePicker Error: ', result.error);
      } else {
        ocrDetect(result.assets[0].uri);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (text) {
      sendData();
    }
  }, [text]);

  async function ocrDetect(imageUri) {
    try {
      const resultFromUri = await MlkitOcr.detectFromUri(imageUri);
      let extractedText = '';
      if (Array.isArray(resultFromUri)) {
        resultFromUri.forEach(block => {
          extractedText += block.text + ' ';
        });
        hashData(extractedText);
        setText2(extractedText);
      } else {
        console.log('Unexpected structure of OCR result');
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>OCR</Text>
      </View>
      <View style={styles.box}>
        <TouchableOpacity style={styles.press} onPress={pickImage}>
          <Text style={styles.text}>Pick Image</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rbox}>
        <ScrollView>
          <Text style={styles.rtext}>{text2}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 120,
  },
  press: {
    backgroundColor: '#ba181b',
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 5,
    alignItems: 'center',
    fontSize: 40,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  header: {
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#ba181b',
    paddingTop: 10,
    paddingBottom: 10,
  },
  rbox: {
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 30,
    padding: 5,
    height: 400,
  },
  rtext: {
    color: 'black',
    fontSize: 18,
    margin: 10,
  },
});

export default Ocr;
