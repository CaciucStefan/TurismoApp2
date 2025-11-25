import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Linking,
} from 'react-native';
import { generateVibeDescription } from '../utils/aiApi';

export default function DetailScreen({ route }) {
  const { location } = route.params;
  const [description, setDescription] = useState(location.shortDescription);
  const [loading, setLoading] = useState(false);

  const onGenerateVibe = async () => {
    setLoading(true);
    try {
      const vibeText = await generateVibeDescription(
        location.name,
        location.shortDescription
      );
      setDescription(vibeText);
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onReserva = () => {
    const message = `Bună! Vreau să fac o rezervare la ${location.name}. Adresa: ${location.address}`;
    const encodedMessage = encodeURIComponent(message);
    Linking.openURL(`https://wa.me/?text=${encodedMessage}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: location.image }} 
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{location.name}</Text>
        <Text style={styles.address}>{location.address}</Text>
        <Text style={styles.rating}>⭐ {location.rating}/5</Text>

        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionLabel}>Descriere:</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={onGenerateVibe}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>✨ Generează Descriere Vibe</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.reserveButton]} 
          onPress={onReserva}
        >
          <Text style={styles.buttonText}>💬 Rezervă pe WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#e0e0e0',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 16,
  },
  descriptionBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  descriptionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#FF6B6B',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  reserveButton: {
    backgroundColor: '#25D366',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});