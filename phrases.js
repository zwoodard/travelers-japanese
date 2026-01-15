/**
 * Japanese Travel Phrases Database
 *
 * To add more phrases, simply add objects to the PHRASES array below.
 * Each phrase should have:
 *   - id: unique identifier (string)
 *   - category: category name for filtering (string)
 *   - english: English phrase (string)
 *   - japanese: Japanese text (string)
 *   - romaji: Romanized pronunciation (string)
 *   - phonetic: English phonetic guide (string) - how to pronounce it
 *   - frequency: How common/important (1-5, where 5 = most essential)
 *   - literal: Optional literal translation (string, can be empty)
 *
 * Frequency scale:
 *   5 = Essential (hello, thank you, please, yes, no)
 *   4 = Very common (basic restaurant, shopping, directions)
 *   3 = Common (transportation, accommodation basics)
 *   2 = Useful (more specific situations)
 *   1 = Situational (emergencies, rare scenarios)
 */

const PHRASES = [
    // === GREETINGS ===
    {
        id: "greeting-1",
        category: "Greetings",
        english: "Hello / Good afternoon",
        japanese: "こんにちは",
        romaji: "Konnichiwa",
        phonetic: "kohn-nee-chee-wah",
        frequency: 5,
        literal: ""
    },
    {
        id: "greeting-2",
        category: "Greetings",
        english: "Good morning",
        japanese: "おはようございます",
        romaji: "Ohayou gozaimasu",
        phonetic: "oh-hah-yoh goh-zah-ee-mahss",
        frequency: 5,
        literal: ""
    },
    {
        id: "greeting-3",
        category: "Greetings",
        english: "Good evening",
        japanese: "こんばんは",
        romaji: "Konbanwa",
        phonetic: "kohn-bahn-wah",
        frequency: 4,
        literal: ""
    },
    {
        id: "greeting-4",
        category: "Greetings",
        english: "Goodbye",
        japanese: "さようなら",
        romaji: "Sayounara",
        phonetic: "sah-yoh-nah-rah",
        frequency: 5,
        literal: ""
    },
    {
        id: "greeting-5",
        category: "Greetings",
        english: "See you later (casual)",
        japanese: "じゃあね",
        romaji: "Jaa ne",
        phonetic: "jah-ah neh",
        frequency: 3,
        literal: ""
    },
    {
        id: "greeting-6",
        category: "Greetings",
        english: "Nice to meet you",
        japanese: "はじめまして",
        romaji: "Hajimemashite",
        phonetic: "hah-jee-meh-mah-sh-teh",
        frequency: 4,
        literal: "For the first time"
    },

    // === ESSENTIAL PHRASES ===
    {
        id: "essential-1",
        category: "Essential Phrases",
        english: "Thank you",
        japanese: "ありがとうございます",
        romaji: "Arigatou gozaimasu",
        phonetic: "ah-ree-gah-toh goh-zah-ee-mahss",
        frequency: 5,
        literal: ""
    },
    {
        id: "essential-2",
        category: "Essential Phrases",
        english: "Thank you (casual)",
        japanese: "ありがとう",
        romaji: "Arigatou",
        phonetic: "ah-ree-gah-toh",
        frequency: 5,
        literal: ""
    },
    {
        id: "essential-3",
        category: "Essential Phrases",
        english: "Excuse me / Sorry",
        japanese: "すみません",
        romaji: "Sumimasen",
        phonetic: "soo-mee-mah-sen",
        frequency: 5,
        literal: ""
    },
    {
        id: "essential-4",
        category: "Essential Phrases",
        english: "I'm sorry (apology)",
        japanese: "ごめんなさい",
        romaji: "Gomen nasai",
        phonetic: "goh-men nah-sah-ee",
        frequency: 4,
        literal: ""
    },
    {
        id: "essential-5",
        category: "Essential Phrases",
        english: "Yes",
        japanese: "はい",
        romaji: "Hai",
        phonetic: "hah-ee",
        frequency: 5,
        literal: ""
    },
    {
        id: "essential-6",
        category: "Essential Phrases",
        english: "No",
        japanese: "いいえ",
        romaji: "Iie",
        phonetic: "ee-eh",
        frequency: 5,
        literal: ""
    },
    {
        id: "essential-7",
        category: "Essential Phrases",
        english: "Please (when asking)",
        japanese: "お願いします",
        romaji: "Onegaishimasu",
        phonetic: "oh-neh-gah-ee-shee-mahss",
        frequency: 5,
        literal: "I humbly request"
    },
    {
        id: "essential-8",
        category: "Essential Phrases",
        english: "You're welcome / Don't mention it",
        japanese: "どういたしまして",
        romaji: "Dou itashimashite",
        phonetic: "doh ee-tah-shee-mah-sh-teh",
        frequency: 3,
        literal: ""
    },

    // === RESTAURANTS & FOOD ===
    {
        id: "food-1",
        category: "Restaurants & Food",
        english: "I'll have this, please (pointing)",
        japanese: "これをください",
        romaji: "Kore wo kudasai",
        phonetic: "koh-reh oh koo-dah-sah-ee",
        frequency: 5,
        literal: "This, please give me"
    },
    {
        id: "food-2",
        category: "Restaurants & Food",
        english: "The check, please",
        japanese: "お会計お願いします",
        romaji: "Okaikei onegaishimasu",
        phonetic: "oh-kah-ee-keh oh-neh-gah-ee-shee-mahss",
        frequency: 4,
        literal: ""
    },
    {
        id: "food-3",
        category: "Restaurants & Food",
        english: "It was delicious!",
        japanese: "おいしかったです",
        romaji: "Oishikatta desu",
        phonetic: "oy-shee-kah-tah dess",
        frequency: 4,
        literal: ""
    },
    {
        id: "food-4",
        category: "Restaurants & Food",
        english: "Let's eat! (before meals)",
        japanese: "いただきます",
        romaji: "Itadakimasu",
        phonetic: "ee-tah-dah-kee-mahss",
        frequency: 5,
        literal: "I humbly receive"
    },
    {
        id: "food-5",
        category: "Restaurants & Food",
        english: "Thank you for the meal (after)",
        japanese: "ごちそうさまでした",
        romaji: "Gochisousama deshita",
        phonetic: "goh-chee-soh-sah-mah desh-tah",
        frequency: 4,
        literal: "It was a feast"
    },
    {
        id: "food-6",
        category: "Restaurants & Food",
        english: "Water, please",
        japanese: "お水をください",
        romaji: "Omizu wo kudasai",
        phonetic: "oh-mee-zoo oh koo-dah-sah-ee",
        frequency: 4,
        literal: ""
    },
    {
        id: "food-7",
        category: "Restaurants & Food",
        english: "Do you have an English menu?",
        japanese: "英語のメニューはありますか",
        romaji: "Eigo no menyuu wa arimasu ka",
        phonetic: "eh-goh noh men-yoo wah ah-ree-mahss kah",
        frequency: 3,
        literal: ""
    },
    {
        id: "food-8",
        category: "Restaurants & Food",
        english: "Is this spicy?",
        japanese: "これは辛いですか",
        romaji: "Kore wa karai desu ka",
        phonetic: "koh-reh wah kah-rah-ee dess kah",
        frequency: 2,
        literal: ""
    },
    {
        id: "food-9",
        category: "Restaurants & Food",
        english: "I'm vegetarian",
        japanese: "ベジタリアンです",
        romaji: "Bejitarian desu",
        phonetic: "beh-jee-tah-ree-ahn dess",
        frequency: 2,
        literal: ""
    },
    {
        id: "food-10",
        category: "Restaurants & Food",
        english: "No meat, please",
        japanese: "肉なしでお願いします",
        romaji: "Niku nashi de onegaishimasu",
        phonetic: "nee-koo nah-shee deh oh-neh-gah-ee-shee-mahss",
        frequency: 2,
        literal: ""
    },

    // === TRANSPORTATION ===
    {
        id: "transport-1",
        category: "Transportation",
        english: "Where is the station?",
        japanese: "駅はどこですか",
        romaji: "Eki wa doko desu ka",
        phonetic: "eh-kee wah doh-koh dess kah",
        frequency: 4,
        literal: ""
    },
    {
        id: "transport-2",
        category: "Transportation",
        english: "One ticket to [place], please",
        japanese: "[場所]まで一枚お願いします",
        romaji: "[Basho] made ichimai onegaishimasu",
        phonetic: "[place] mah-deh ee-chee-mah-ee oh-neh-gah-ee-shee-mahss",
        frequency: 3,
        literal: ""
    },
    {
        id: "transport-3",
        category: "Transportation",
        english: "How much is it to [place]?",
        japanese: "[場所]までいくらですか",
        romaji: "[Basho] made ikura desu ka",
        phonetic: "[place] mah-deh ee-koo-rah dess kah",
        frequency: 3,
        literal: ""
    },
    {
        id: "transport-4",
        category: "Transportation",
        english: "Does this train go to [place]?",
        japanese: "この電車は[場所]に行きますか",
        romaji: "Kono densha wa [basho] ni ikimasu ka",
        phonetic: "koh-noh den-shah wah [place] nee ee-kee-mahss kah",
        frequency: 3,
        literal: ""
    },
    {
        id: "transport-5",
        category: "Transportation",
        english: "What time does it leave?",
        japanese: "何時に出発しますか",
        romaji: "Nanji ni shuppatsu shimasu ka",
        phonetic: "nahn-jee nee shoop-pah-tsoo shee-mahss kah",
        frequency: 2,
        literal: ""
    },
    {
        id: "transport-6",
        category: "Transportation",
        english: "Where is the bus stop?",
        japanese: "バス停はどこですか",
        romaji: "Basutei wa doko desu ka",
        phonetic: "bah-soo-teh wah doh-koh dess kah",
        frequency: 3,
        literal: ""
    },
    {
        id: "transport-7",
        category: "Transportation",
        english: "I want to go to [place]",
        japanese: "[場所]に行きたいです",
        romaji: "[Basho] ni ikitai desu",
        phonetic: "[place] nee ee-kee-tah-ee dess",
        frequency: 4,
        literal: ""
    },
    {
        id: "transport-8",
        category: "Transportation",
        english: "Please stop here",
        japanese: "ここで止めてください",
        romaji: "Koko de tomete kudasai",
        phonetic: "koh-koh deh toh-meh-teh koo-dah-sah-ee",
        frequency: 3,
        literal: ""
    },

    // === SHOPPING ===
    {
        id: "shopping-1",
        category: "Shopping",
        english: "How much is this?",
        japanese: "これはいくらですか",
        romaji: "Kore wa ikura desu ka",
        phonetic: "koh-reh wah ee-koo-rah dess kah",
        frequency: 5,
        literal: ""
    },
    {
        id: "shopping-2",
        category: "Shopping",
        english: "I'll take this",
        japanese: "これをください",
        romaji: "Kore wo kudasai",
        phonetic: "koh-reh oh koo-dah-sah-ee",
        frequency: 5,
        literal: ""
    },
    {
        id: "shopping-3",
        category: "Shopping",
        english: "Do you accept credit cards?",
        japanese: "クレジットカードは使えますか",
        romaji: "Kurejitto kaado wa tsukaemasu ka",
        phonetic: "koo-reh-jee-toh kah-doh wah tsoo-kah-eh-mahss kah",
        frequency: 3,
        literal: ""
    },
    {
        id: "shopping-4",
        category: "Shopping",
        english: "Tax-free, please",
        japanese: "免税でお願いします",
        romaji: "Menzei de onegaishimasu",
        phonetic: "men-zeh deh oh-neh-gah-ee-shee-mahss",
        frequency: 2,
        literal: ""
    },
    {
        id: "shopping-5",
        category: "Shopping",
        english: "Just looking, thank you",
        japanese: "見ているだけです",
        romaji: "Miteiru dake desu",
        phonetic: "mee-teh-roo dah-keh dess",
        frequency: 3,
        literal: ""
    },
    {
        id: "shopping-6",
        category: "Shopping",
        english: "Do you have a larger size?",
        japanese: "もっと大きいサイズはありますか",
        romaji: "Motto ookii saizu wa arimasu ka",
        phonetic: "moht-toh oh-kee sah-ee-zoo wah ah-ree-mahss kah",
        frequency: 2,
        literal: ""
    },
    {
        id: "shopping-7",
        category: "Shopping",
        english: "Do you have a smaller size?",
        japanese: "もっと小さいサイズはありますか",
        romaji: "Motto chiisai saizu wa arimasu ka",
        phonetic: "moht-toh chee-sah-ee sah-ee-zoo wah ah-ree-mahss kah",
        frequency: 2,
        literal: ""
    },

    // === ACCOMMODATION ===
    {
        id: "hotel-1",
        category: "Accommodation",
        english: "I have a reservation",
        japanese: "予約があります",
        romaji: "Yoyaku ga arimasu",
        phonetic: "yoh-yah-koo gah ah-ree-mahss",
        frequency: 3,
        literal: ""
    },
    {
        id: "hotel-2",
        category: "Accommodation",
        english: "Check-in, please",
        japanese: "チェックインお願いします",
        romaji: "Chekkuin onegaishimasu",
        phonetic: "chek-koo-een oh-neh-gah-ee-shee-mahss",
        frequency: 3,
        literal: ""
    },
    {
        id: "hotel-3",
        category: "Accommodation",
        english: "Check-out, please",
        japanese: "チェックアウトお願いします",
        romaji: "Chekkuauto onegaishimasu",
        phonetic: "chek-koo-ah-oo-toh oh-neh-gah-ee-shee-mahss",
        frequency: 3,
        literal: ""
    },
    {
        id: "hotel-4",
        category: "Accommodation",
        english: "What time is check-out?",
        japanese: "チェックアウトは何時ですか",
        romaji: "Chekkuauto wa nanji desu ka",
        phonetic: "chek-koo-ah-oo-toh wah nahn-jee dess kah",
        frequency: 2,
        literal: ""
    },
    {
        id: "hotel-5",
        category: "Accommodation",
        english: "Is breakfast included?",
        japanese: "朝食は含まれていますか",
        romaji: "Choushoku wa fukumarete imasu ka",
        phonetic: "choh-shoh-koo wah foo-koo-mah-reh-teh ee-mahss kah",
        frequency: 2,
        literal: ""
    },
    {
        id: "hotel-6",
        category: "Accommodation",
        english: "What's the WiFi password?",
        japanese: "WiFiのパスワードは何ですか",
        romaji: "WiFi no pasuwaado wa nan desu ka",
        phonetic: "wah-ee-fah-ee noh pah-soo-wah-doh wah nahn dess kah",
        frequency: 3,
        literal: ""
    },

    // === DIRECTIONS & LOCATIONS ===
    {
        id: "directions-1",
        category: "Directions",
        english: "Where is the bathroom?",
        japanese: "トイレはどこですか",
        romaji: "Toire wa doko desu ka",
        phonetic: "toh-ee-reh wah doh-koh dess kah",
        frequency: 5,
        literal: ""
    },
    {
        id: "directions-2",
        category: "Directions",
        english: "Where is this place?",
        japanese: "この場所はどこですか",
        romaji: "Kono basho wa doko desu ka",
        phonetic: "koh-noh bah-shoh wah doh-koh dess kah",
        frequency: 3,
        literal: ""
    },
    {
        id: "directions-3",
        category: "Directions",
        english: "Turn right",
        japanese: "右に曲がってください",
        romaji: "Migi ni magatte kudasai",
        phonetic: "mee-gee nee mah-gah-teh koo-dah-sah-ee",
        frequency: 3,
        literal: ""
    },
    {
        id: "directions-4",
        category: "Directions",
        english: "Turn left",
        japanese: "左に曲がってください",
        romaji: "Hidari ni magatte kudasai",
        phonetic: "hee-dah-ree nee mah-gah-teh koo-dah-sah-ee",
        frequency: 3,
        literal: ""
    },
    {
        id: "directions-5",
        category: "Directions",
        english: "Go straight",
        japanese: "まっすぐ行ってください",
        romaji: "Massugu itte kudasai",
        phonetic: "mahs-soo-goo eet-teh koo-dah-sah-ee",
        frequency: 3,
        literal: ""
    },
    {
        id: "directions-6",
        category: "Directions",
        english: "Is it far?",
        japanese: "遠いですか",
        romaji: "Tooi desu ka",
        phonetic: "toh-oh-ee dess kah",
        frequency: 2,
        literal: ""
    },
    {
        id: "directions-7",
        category: "Directions",
        english: "Is it near?",
        japanese: "近いですか",
        romaji: "Chikai desu ka",
        phonetic: "chee-kah-ee dess kah",
        frequency: 2,
        literal: ""
    },

    // === EMERGENCIES ===
    {
        id: "emergency-1",
        category: "Emergencies",
        english: "Help!",
        japanese: "助けて",
        romaji: "Tasukete",
        phonetic: "tah-soo-keh-teh",
        frequency: 2,
        literal: ""
    },
    {
        id: "emergency-2",
        category: "Emergencies",
        english: "Please call an ambulance",
        japanese: "救急車を呼んでください",
        romaji: "Kyuukyuusha wo yonde kudasai",
        phonetic: "kyoo-kyoo-shah oh yohn-deh koo-dah-sah-ee",
        frequency: 1,
        literal: ""
    },
    {
        id: "emergency-3",
        category: "Emergencies",
        english: "Please call the police",
        japanese: "警察を呼んでください",
        romaji: "Keisatsu wo yonde kudasai",
        phonetic: "keh-sah-tsoo oh yohn-deh koo-dah-sah-ee",
        frequency: 1,
        literal: ""
    },
    {
        id: "emergency-4",
        category: "Emergencies",
        english: "I'm lost",
        japanese: "迷子になりました",
        romaji: "Maigo ni narimashita",
        phonetic: "mah-ee-goh nee nah-ree-mah-sh-tah",
        frequency: 2,
        literal: ""
    },
    {
        id: "emergency-5",
        category: "Emergencies",
        english: "I lost my passport",
        japanese: "パスポートをなくしました",
        romaji: "Pasupooto wo nakushimashita",
        phonetic: "pah-soo-poh-toh oh nah-koo-shee-mah-sh-tah",
        frequency: 1,
        literal: ""
    },
    {
        id: "emergency-6",
        category: "Emergencies",
        english: "I don't feel well",
        japanese: "気分が悪いです",
        romaji: "Kibun ga warui desu",
        phonetic: "kee-boon gah wah-roo-ee dess",
        frequency: 2,
        literal: ""
    },
    {
        id: "emergency-7",
        category: "Emergencies",
        english: "Where is the hospital?",
        japanese: "病院はどこですか",
        romaji: "Byouin wa doko desu ka",
        phonetic: "byoh-een wah doh-koh dess kah",
        frequency: 2,
        literal: ""
    },

    // === NUMBERS (for reference) ===
    {
        id: "number-1",
        category: "Numbers",
        english: "One",
        japanese: "一 (いち)",
        romaji: "Ichi",
        phonetic: "ee-chee",
        frequency: 4,
        literal: ""
    },
    {
        id: "number-2",
        category: "Numbers",
        english: "Two",
        japanese: "二 (に)",
        romaji: "Ni",
        phonetic: "nee",
        frequency: 4,
        literal: ""
    },
    {
        id: "number-3",
        category: "Numbers",
        english: "Three",
        japanese: "三 (さん)",
        romaji: "San",
        phonetic: "sahn",
        frequency: 4,
        literal: ""
    },
    {
        id: "number-4",
        category: "Numbers",
        english: "Four",
        japanese: "四 (よん/し)",
        romaji: "Yon / Shi",
        phonetic: "yohn / shee",
        frequency: 3,
        literal: ""
    },
    {
        id: "number-5",
        category: "Numbers",
        english: "Five",
        japanese: "五 (ご)",
        romaji: "Go",
        phonetic: "goh",
        frequency: 3,
        literal: ""
    },
    {
        id: "number-6",
        category: "Numbers",
        english: "Ten",
        japanese: "十 (じゅう)",
        romaji: "Juu",
        phonetic: "joo",
        frequency: 3,
        literal: ""
    },
    {
        id: "number-7",
        category: "Numbers",
        english: "One hundred",
        japanese: "百 (ひゃく)",
        romaji: "Hyaku",
        phonetic: "hyah-koo",
        frequency: 2,
        literal: ""
    },
    {
        id: "number-8",
        category: "Numbers",
        english: "One thousand",
        japanese: "千 (せん)",
        romaji: "Sen",
        phonetic: "sen",
        frequency: 2,
        literal: ""
    },

    // === COMMON QUESTIONS ===
    {
        id: "question-1",
        category: "Common Questions",
        english: "Do you speak English?",
        japanese: "英語を話せますか",
        romaji: "Eigo wo hanasemasu ka",
        phonetic: "eh-goh oh hah-nah-seh-mahss kah",
        frequency: 4,
        literal: ""
    },
    {
        id: "question-2",
        category: "Common Questions",
        english: "I don't understand",
        japanese: "わかりません",
        romaji: "Wakarimasen",
        phonetic: "wah-kah-ree-mah-sen",
        frequency: 5,
        literal: ""
    },
    {
        id: "question-3",
        category: "Common Questions",
        english: "I understand",
        japanese: "わかりました",
        romaji: "Wakarimashita",
        phonetic: "wah-kah-ree-mah-sh-tah",
        frequency: 4,
        literal: ""
    },
    {
        id: "question-4",
        category: "Common Questions",
        english: "Please speak slowly",
        japanese: "ゆっくり話してください",
        romaji: "Yukkuri hanashite kudasai",
        phonetic: "yook-koo-ree hah-nah-sh-teh koo-dah-sah-ee",
        frequency: 4,
        literal: ""
    },
    {
        id: "question-5",
        category: "Common Questions",
        english: "Please say that again",
        japanese: "もう一度言ってください",
        romaji: "Mou ichido itte kudasai",
        phonetic: "moh ee-chee-doh eet-teh koo-dah-sah-ee",
        frequency: 3,
        literal: ""
    },
    {
        id: "question-6",
        category: "Common Questions",
        english: "What is this?",
        japanese: "これは何ですか",
        romaji: "Kore wa nan desu ka",
        phonetic: "koh-reh wah nahn dess kah",
        frequency: 4,
        literal: ""
    },
    {
        id: "question-7",
        category: "Common Questions",
        english: "What time is it?",
        japanese: "今何時ですか",
        romaji: "Ima nanji desu ka",
        phonetic: "ee-mah nahn-jee dess kah",
        frequency: 3,
        literal: ""
    },
    {
        id: "question-8",
        category: "Common Questions",
        english: "I don't speak Japanese",
        japanese: "日本語が話せません",
        romaji: "Nihongo ga hanasemasen",
        phonetic: "nee-hohn-goh gah hah-nah-seh-mah-sen",
        frequency: 4,
        literal: ""
    },
    {
        id: "question-9",
        category: "Common Questions",
        english: "I speak a little Japanese",
        japanese: "日本語が少し話せます",
        romaji: "Nihongo ga sukoshi hanasemasu",
        phonetic: "nee-hohn-goh gah skoh-shee hah-nah-seh-mahss",
        frequency: 3,
        literal: ""
    }
];

// Get unique categories
const CATEGORIES = [...new Set(PHRASES.map(p => p.category))];

// Frequency labels for display
const FREQUENCY_LABELS = {
    5: "Essential",
    4: "Very Common",
    3: "Common",
    2: "Useful",
    1: "Situational"
};
