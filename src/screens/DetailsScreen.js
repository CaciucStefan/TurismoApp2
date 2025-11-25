import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { DESTINATIONS } from '../data/destinations';
import { getFavorites, saveFavorites } from '../utils/storage';

export default function DetailsScreen({ route }) {
  const { id } = route.params;
  const [data, setData] = useState(DESTINATIONS.find((d) => d.id === id));
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    (async () => {
      const fav = await getFavorites();
      setIsFav(fav.includes(id));
    })();
  }, [id]);

  if (!data) {
    return (
      <View style={styles.center}>
        <Text>Destinație inexistentă</Text>
      </View>
    );
  }

  const toggleFav = async () => {
    const fav = await getFavorites();
    let newFavs;
    if (fav.includes(id)) {
      newFavs = fav.filter((f) => f !== id);
      setIsFav(false);
    } else {
      newFavs = [...fav, id];
      setIsFav(true);
    }
    await saveFavorites(newFavs);
    Alert.alert(isFav ? 'Eliminată din favorite' : 'Adăugată la favorite');
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: data.image }} style={styles.hero} />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.title}>{data.name}</Text>
          <TouchableOpacity onPress={toggleFav} style={styles.favButton}>
            <Text style={{ color: isFav ? '#ff6b6b' : '#333', fontWeight: '700' }}>
              {isFav ? '♥ Favorită' : '♡ Adaugă'}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>
          {data.country} • {data.tags.join(', ')}
        </Text>
        <Text style={styles.description}>{data.description}</Text>

        <View style={styles.mapStub}>
          <Text style={{ color: '#666' }}>
            Hartă (ex. coordonate: {data.coordinates.lat}, {data.coordinates.lng})
          </Text>
          <Text style={{ color: '#999', marginTop: 8 }}>
            Pentru hartă interactivă integrați react-native-maps — se pot afișa markere și direcții.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  container: { flex: 1, backgroundColor: '#f7f7fb' },
  hero: { width: '100%', height: 260 },
  content: { padding: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '800' },
  favButton: { padding: 8 },
  subtitle: { color: '#666', marginTop: 6 },
  description: { marginTop: 12, fontSize: 15, lineHeight: 22, color: '#333' },
  mapStub: {
    marginTop: 18,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
});