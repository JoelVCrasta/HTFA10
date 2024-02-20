import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import MlkitOcr from 'react-native-mlkit-ocr';

const Ocr = () => {
  const [image, setImage] = useState(null);

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
      //console.log(result.assets[0].uri);

      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.error) {
        console.log('ImagePicker Error: ', result.error);
      } else {
        setImage(result.assets[0].uri);
        ocrDetect(result.assets[0].uri);
      }
    } catch (e) {
      console.log(e);
    }
  };

  async function ocrDetect(imageUri) {
    try {
      const resultFromUri = await MlkitOcr.detectFromUri(imageUri);
      let extractedText = '';
      if (Array.isArray(resultFromUri)) {
        resultFromUri.forEach(block => {
          extractedText += block.text + ' ';
        });
      } else {
        console.log('Unexpected structure of OCR result:', resultFromUri);
      }

      console.log(extractedText);
      //console.log(resultFromUri);
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
          <Text style={styles.text}>Open Camera</Text>
        </TouchableOpacity>
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
    marginTop: 150,
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
});

export default Ocr;
