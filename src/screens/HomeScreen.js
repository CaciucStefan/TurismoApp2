import React, { useEffect, useState } from 'react';
import { View, FlatList, SafeAreaView, TextInput, StyleSheet, Text } from 'react-native';
import DestinationCard from '../components/DestinationCard';
import { DESTINATIONS } from '../data/destinations';
import { getFavorites } from '../utils/storage';

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [list, setList] = useState(DESTINATIONS);
  const [favIds, setFavIds] = useState([]);

  useEffect(() => {
    (async () => {
      const fav = await getFavorites();
      setFavIds(fav);
    })();
  }, []);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setList(DESTINATIONS);
      return;
    }
    setList(
      DESTINATIONS.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q) ||
          d.tags.join(' ').includes(q)
      )
    );
  }, [query]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f7fb' }}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>TurismApp</Text>
        <Text style={styles.appSubtitle}>Descoperă locuri memorabile</Text>
        <TextInput
          placeholder="Caută: Brașov, natură, city-break..."
          value={query}
          onChangeText={setQuery}
          style={styles.search}
        />
      </View>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DestinationCard
            id={item.id}
            name={item.name}
            country={item.country}
            short={item.short}
            image={item.image}
            rating={item.rating}
            onPress={() => navigation.navigate('Details', { id: item.id })}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nicio destinație găsită</Text>}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '800',
  },
  appSubtitle: {
    color: '#666',
    marginBottom: 12,
  },
  search: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
  },
});