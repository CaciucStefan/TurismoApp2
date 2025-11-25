import * as FileSystem from 'expo-file-system';

// Încarcă locații din JSON
export async function loadLocations() {
  try {
    // Încearcă să descarce din web
    const response = await fetch('https://thecon.ro/hackathon/locations.json');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Network error, using mock data');
  }

  // Fallback - mock data
  return [
    {
      id: 1,
      name: 'Café Budapest',
      address: 'Str. Lipscani 20, București',
      latitude: 44.4268,
      longitude: 26.1025,
      image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop',
      shortDescription: 'Café cu atmosferă retro și cafea bună',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Restaurant Casa Doina',
      address: 'Str. Moșilor 5, București',
      latitude: 44.4312,
      longitude: 26.1123,
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop',
      shortDescription: 'Mâncare tradițională românească',
      rating: 4.8,
    },
  ];
}

// Generează descriere AI (Mock + Real OpenAI option)
export async function generateVibeDescription(name, shortDesc) {
  try {
    // OPȚIE 1: Dacă vrei să folosești OpenAI real
    // Decommentează și adaugă API key
    /*
    const API_KEY = 'sk-YOUR-KEY-HERE';
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Rescrie această descriere într-un stil creativ și atractiv (maxim 80 cuvinte): "${shortDesc}". Locația este "${name}". Răspunde doar cu descrierea.`,
          },
        ],
        max_tokens: 100,
      }),
    });
    const data = await response.json();
    return data.choices[0].message.content;
    */

    // OPȚIE 2: Mock responses creative (PENTRU HACKATHON - instant!)
    const vibes = [
      `✨ ${shortDesc} - O experiență vibrantă care nu trebuie ratată! Aici se întâlnesc oameni cu aceeași pasiune și plăceri autentice.`,
      `🌟 ${shortDesc} - Acest loc te va cuceri cu atmosfera sa caldă și ospitalitate de top. Ideal pentru o zi de relaxare sau o întâlnire importantă.`,
      `💫 ${shortDesc} - Un refugiu perfect pentru sufletele curioase. Fiecare detaliu e gândit cu grijă pentru confortul tău.`,
      `🎯 ${shortDesc} - O destinație must-visit! Calitate, gust și o experiență de neuitat te așteaptă.`,
      `🔥 ${shortDesc} - Descoperă magia acestui loc! De la decoruri până la serviciu, totul e perfect.`,
    ];
    return vibes[Math.floor(Math.random() * vibes.length)];
  } catch (error) {
    console.log('Error generating vibe:', error);
    return shortDesc + ' - O locație minunată!';
  }
}