# Brief Hackathon 2025

## 1. Tema Hackathon
Construiți o aplicație mobilă de turism simplă, dar foarte bine finisată.

- **NU** vrem o aplicație cu 100 de funcții neterminate.
- **VREM** o aplicație cu funcțiile de bază perfecte și, dacă timpul permite, funcționalități "Nice to Have" complexe.

**Context:** Sunteți developeri care folosiți AI ca un "Exoschelet". Arătați cât de repede puteți asambla o interfață de calitate și logică folosind Claude, Cursor, Gemini, ChatGPT sau alte tooluri AI preferate.

**PRO TIP:** Majoritatea uneltelor AI au pachete GRATUITE pentru studenți:
- Gemini for Students
- Cursor for Students
- Claude Campus Program

---

## 2. Core Features (Obligatorii - Baza Notei)

### 🗺️ 1. Harta și Lista (The Feed)
- **Data Source:** Aplicația trebuie să încarce un fișier JSON cu locații (Cafenele/Restaurante) ce conține: Nume, Adresă, Coordonate (Lat/Long), Poză (URL), Descriere scurtă, Rating.  
  *JSON-ul poate fi descărcat de pe [https://thecon.ro/hackathon/](https://thecon.ro/hackathon/)*
- **Dual View:** Utilizatorul trebuie să poată vedea locațiile în două moduri:
  1. **Map View:** Pin-uri pe o hartă.
     - Orice provider (Google Maps, Apple Maps, Mapbox).
     - *Recomandare:* OpenStreetMap via `react-native-maps` cu URL tiles pentru a evita probleme cu API keys sau billing.
  2. **List View:** O listă scrollabilă cu card-uri elegante (Imagine + Titlu + Rating).

### 👆 2. Structură, Meniu și Detalii (The Interaction)
- **Meniu Principal:** Structură clară cu un Bottom Tab Bar (meniu fix jos) cu minim 2 butoane:
  1. **Explore:** Ecranul principal cu Harta/Lista.
  2. **Profil:** Ecran simplu (static), o poză și un nume.
- **Navigație Fluidă:** Tap pe Pin (hartă) sau Card (listă) → navigare spre ecran de Detalii locație.
- **Ecranul de Detalii & "AI Magic":**
  1. **Conținut:** Poză mare, Titlu, Descriere inițială, Buton "Rezervă" (link WhatsApp).
  2. **Funcția AI Generative:** Buton "Generează Descriere Vibe".
     - La apăsare, aplicația apelează un API AI (OpenAI/Gemini/Anthropic) pentru a rescrie descrierea într-un stil creativ.
     - **Tehnic:** Loading Indicator la request + update descriere vizibil.

---

## 3. Nice to Have (Extra pentru a câștiga)

După ce baza merge perfect, diferența se face la aceste extra features, implementate complet:

1. 🔐 Login/Contul Meu — sistem de autentificare (Mock/Firebase/Supabase) cu profil și poză.
2. 🔍 Filtrare & Căutare — search bar sau filtre ("Doar Restaurante", "Rating > 4").
3. 🤖 Chatbot AI — asistent integrat tip chat pentru întrebări despre locații.
4. ✨ UI/UX Polish — animații fluide, dark mode, error handling prietenos (ex: lipsă internet).

---

## 4. Livrabilul: APK-ul (Eliminatoriu!)

- **Regula de aur:** Dacă marți 25.11, ora 11:00 nu există un fișier .apk instalabil încărcat pe [thecon.ro/hackathon](https://thecon.ro/hackathon), echipa nu intră la jurizare!
- **Pe lângă APK:** Link către repository-ul GitHub (public) pentru verificarea commit-urilor și contribuției fiecărui membru.

### ❗ Cum să nu ratați deadline-ul:
- **Generarea unui APK necesită timp. NU lăsați build-ul pentru ora 10:55!**

#### 1. Varianta Cloud (Expo EAS):
   - Simplu: `eas build -p android --profile preview`
   - Pe planul Free, puteți sta la coadă și 30-60 de minute.
   - Sfat: Build de test luni seara/marți dimineața devreme!

#### 2. Varianta Locală:
   - Cu Android Studio configurat: `npx expo run:android --variant release`
   - Instant, dar cere environment corect.

---

## 5. Criterii de Jurizare

Jurizarea se face online, pe baza APK-ului.

### ETAPA 1: ELIMINATORIE (Pass / Fail)

| Criteriu           | Detalii                                   | Status         |
|--------------------|-------------------------------------------|----------------|
| APK Funcțional     | .apk încărcat până la 11:00, rulează?     | OK / FAIL      |
| GitHub Repository  | Link public valid?                        | OK / FAIL      |

---

### ETAPA 2: PUNCTAJ TEHNIC (MAX 100 Puncte)

#### 1. AI Integration (40p)
| Subcriteriu         | Detalii                                      | Punctaj |
|---------------------|----------------------------------------------|---------|
| Vibe Generator      | Funcția "Generează Descriere" funcționează?  | 15p     |
| UX Asincron         | Indicator de Loading pe requesturi AI?        | 10p     |
| Dev Speed (Q&A)     | Ați folosit AI eficient/creativ la codare?   | 15p     |

#### 2. Code Quality & Complexity (40p)
| Subcriteriu         | Detalii                                      | Punctaj |
|---------------------|----------------------------------------------|---------|
| Core Features       | Harta+Listă+Navigație corectă?               | 10p     |
| Arhitectură         | Cod pe componente/ecrane, reutilizabil?      | 10p     |
| Nice to Have        | Bonus major: Login, Filtrare, Chatbot etc.   | 20p     |

#### 3. UI/UX Experience (20p)
| Subcriteriu         | Detalii                                      | Punctaj |
|---------------------|----------------------------------------------|---------|
| Visual Polish       | Modern (2025), imagini/titluri corecte       | 10p     |
| Interacțiune        | Fluidă, tranziții, feedback la tap           | 10p     |

---

**Total:** 100p