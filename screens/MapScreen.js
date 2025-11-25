import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { loadLocations } from '../utils/aiApi';

export default function MapScreen({ navigation }) {
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

  const initialRegion = {
    latitude: locations[0].latitude || 44.4268,
    longitude: locations[0].longitude || 26.1025,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  return (
    <MapView style={{ flex: 1 }} initialRegion={initialRegion}>
      {locations.map(loc => (
        <Marker
          key={loc.id}
          coordinate={{
            latitude: loc.latitude,
            longitude: loc.longitude,
          }}
          title={loc.name}
          description={loc.address}
          onPress={() => navigation.navigate('Detail', { location: loc })}
        />
      ))}
    </MapView>
  );
}