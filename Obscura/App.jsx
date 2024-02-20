import React from 'react';
import {Image, SafeAreaView, View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/screens/Home.jsx';
import Ocr from './src/screens/Ocr.jsx';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#ba181b',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            height: 60,
            paddingBottom: 10,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIconStyle: {display: 'none'},
            tabBarLabelStyle: {
              fontSize: 20,
              marginBottom: 6,
              fontWeight: 'bold',
            },
          }}
        />
        <Tab.Screen
          name="OCR"
          component={Ocr}
          options={{
            tabBarIconStyle: {display: 'none'},
            tabBarLabelStyle: {
              fontSize: 20,
              marginBottom: 6,
              fontWeight: 'bold',
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
