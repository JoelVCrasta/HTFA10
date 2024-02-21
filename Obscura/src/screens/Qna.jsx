import React, {useState, useEffect} from 'react';
import {Button, Text, View, SafeAreaView, StyleSheet} from 'react-native';
import * as qna from '@tensorflow-models/qna';
import * as tf from '@tensorflow/tfjs-react-native';

const Qna = () => {
  const [model, setModel] = useState(null);
  const [question, setQuestion] = useState('what is google');
  const [context, setContext] = useState(
    'Google is a technology company that specializes in Internet-related services and products. They are known for their search engine, advertising technologies, cloud computing, software, and hardware. Google was founded in 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University, in California. The company has since grown to become one of the most influential technology companies in the world, with a wide range of products and services used by billions of people globally.',
  );
  const [answer, setAnswer] = useState('');

/*   useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await qna.load();
        setModel(loadedModel);
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };
    loadModel();
  }, []);

  const askQuestion = async () => {
    if (!model) {
      console.error('Model not loaded');
      return;
    }
    try {
      const answers = await model.findAnswers(question, context);
      if (answers) console.log(answers);
      setAnswer(answers[0] ? answers[0].text : 'No answer found');
    } catch (error) {
      console.error('Error finding answers:', error);
    }
  }; */

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Ask a question:</Text>
        <Text>{answer}</Text>
        <Button title="Ask"  />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Qna;
