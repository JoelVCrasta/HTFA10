  import React, {useState} from 'react';
  import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
  } from 'react-native';
  import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

  const Ocr = () => {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
      try {
        const options = {
          mediaType: 'photo',
          maxWidth: 300,
          maxHeight: 300,
          quality: 1,
          includeBase64: true,
          saveToPhotos: true,
        };

        const result = await launchImageLibrary(options);
        console.log(result);

        if (result.didCancel) {
          console.log('User cancelled image picker');
        } else if (result.error) {
          console.log('ImagePicker Error: ', result.error);
        } else {
          setImage(result.uri);
          console.log(image);
        }
      } catch (e) {
        console.log(e);
      }
    };

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
