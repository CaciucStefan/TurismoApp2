import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { loadLocations } from '../utils/aiApi';

export default function ListScreen({ navigation }) {
  const [locations, setLocations] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLocations()
      .then(data => {
        setLocations(data);
        setLoading(false);
      })
      .catch(err => {
        console.log('Error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

  if (!locations || locations.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Nu s-au găsit locații</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={locations}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Detail', { location: item })}
        >
          <View style={styles.card}>
            <Image 
              source={{ uri: item.image }} 
              style={styles.image}
            />
            <View style={styles.content}>
              <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.address} numberOfLines={2}>{item.address}</Text>
              <Text style={styles.rating}>⭐ {item.rating}/5</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: '#e0e0e0',
  },
  content: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  address: {
    fontSize: 12,
    color: '#666',
    marginVertical: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
});