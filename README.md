# Traveler's Japanese

A static flashcard app to help visitors to Japan learn essential Japanese travel phrases.

## Features

- **Flashcard study mode**: Click cards to reveal Japanese translations
- **Audio pronunciation**: Click the speaker icon or press P to hear phrases spoken
- **Phonetic guides**: Each phrase includes an English phonetic guide (e.g., "ah-ree-gah-toh")
- **Pronunciation guide**: Learn Japanese vowels, consonants, and pronunciation tips
- **Progress tracking**: Right/wrong counts stored in localStorage
- **Smart card selection**: Cards you struggle with appear more frequently
- **Frequency weighting**: Essential phrases (hello, thank you) appear more often than situational ones
- **Category filtering**: Study specific phrase categories
- **Progress statistics**: View your learning progress and mastery levels
- **Keyboard shortcuts**: Space/Enter to flip, Arrow keys or J/K to answer, P to play audio

## Usage

Open `index.html` in any web browser to start studying.

### Keyboard Shortcuts

- `Space` or `Enter`: Flip the card
- `→` or `J`: I knew it (correct)
- `←` or `K`: I didn't know it (incorrect)
- `P`: Play audio pronunciation (when card is revealed)

## Hosting on GitHub Pages

1. Push this repository to GitHub
2. Go to Settings → Pages
3. Select "main" branch and root folder
4. Save - your site will be live at `https://[username].github.io/travelers-japanese/`

## Adding More Phrases

Edit `phrases.js` and add new phrase objects to the `PHRASES` array:

```javascript
{
    id: "unique-id",
    category: "Category Name",
    english: "English phrase",
    japanese: "日本語フレーズ",
    romaji: "Nihongo furēzu",
    phonetic: "nee-hohn-goh foo-reh-zoo",
    frequency: 3,
    literal: "Optional literal translation"
}
```

### Field Descriptions

- `phonetic`: English pronunciation guide using hyphenated syllables
- `frequency`: How common/important the phrase is (1-5 scale):
  - **5 = Essential**: Hello, thank you, please, yes, no
  - **4 = Very Common**: Basic restaurant/shopping phrases
  - **3 = Common**: Transportation, accommodation basics
  - **2 = Useful**: More specific situations
  - **1 = Situational**: Emergencies, rare scenarios

## Categories

- Greetings
- Essential Phrases
- Restaurants & Food
- Transportation
- Shopping
- Accommodation
- Directions
- Emergencies
- Numbers
- Common Questions