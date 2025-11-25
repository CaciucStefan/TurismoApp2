// Dummy fetch for locations
export async function getLocations() {
  // Înlocuiți cu fetch('https://thecon.ro/hackathon/locations.json') la livrat
  return [
    {
      id: 1,
      name: "Cafe Example",
      address: "Str. Exemplu 1",
      lat: 44.435,
      lng: 26.101,
      image: "https://placekitten.com/300/200",
      shortDescription: "Mâncare bună",
      rating: 4.5
    },
    // Adăugați mai multe locații
  ];
}

// Dummy AI vibe func
export async function generateVibe(desc, name) {
  // Ideal: trimiteți la un endpoint AI de gen OpenAI, Anthropic, Google, etc.
  // Exemplu call: await fetch(AI_ENDPOINT, { method: 'POST', body: JSON.stringify({desc, name}) })
  return desc + " — O experiență vibrantă ce nu trebuie ratată!";
}