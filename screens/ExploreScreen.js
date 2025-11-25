import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './MapScreen';
import ListScreen from './ListScreen';
import DetailScreen from './DetailScreen';

const Stack = createStackNavigator();

function ExploreNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="ExploreHome" component={ExploreHome} options={{ title: 'Explorare' }} />
      <Stack.Screen name="MapView" component={MapScreen} options={{ title: 'Hartă' }} />
      <Stack.Screen name="ListView" component={ListScreen} options={{ title: 'Lista' }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detalii' }} />
    </Stack.Navigator>
  );
}

function ExploreHome({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MapView')}>
        <Text style={styles.buttonText}>📍 Hartă</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListView')}>
        <Text style={styles.buttonText}>📋 Listă</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    width: '100%',
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ExploreNavigation;