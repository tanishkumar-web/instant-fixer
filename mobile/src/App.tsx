import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.section}>
          <Text style={styles.title}>InstantFixer Mobile</Text>
          <Text style={styles.description}>
            Welcome to the InstantFixer mobile app! This is a cross-platform
            mobile application built with React Native.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.subtitle}>Features</Text>
          <Text style={styles.bullet}>• Premium iPhone/Apple-style design</Text>
          <Text style={styles.bullet}>• Fully responsive UI/UX for all devices</Text>
          <Text style={styles.bullet}>• Dark/Light mode with adaptive colors</Text>
          <Text style={styles.bullet}>• AR navigation & VR service previews</Text>
          <Text style={styles.bullet}>• AI-powered matching and recommendations</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.subtitle}>Get Started</Text>
          <Text style={styles.description}>
            Explore the app to find trusted local helpers for all your needs.
            Fast, reliable, and hassle-free service at your fingertips.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  section: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B0AFF',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  bullet: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginTop: 8,
  },
});

export default App;