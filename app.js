/**
 * Traveler's Japanese - Flashcard App
 * Main application logic
 */

// Storage key for localStorage
const STORAGE_KEY = 'travelers-japanese-stats';

// App state
let currentCard = null;
let cardRevealed = false;
let selectedCategory = 'all';
let stats = {};

// DOM Elements
const flashcard = document.getElementById('flashcard');
const phraseEnglish = document.getElementById('phrase-english');
const phraseJapanese = document.getElementById('phrase-japanese');
const phraseRomaji = document.getElementById('phrase-romaji');
const phrasePhonetic = document.getElementById('phrase-phonetic');
const phraseLiteral = document.getElementById('phrase-literal');
const answerButtons = document.getElementById('answer-buttons');
const btnRight = document.getElementById('btn-right');
const btnWrong = document.getElementById('btn-wrong');
const currentStats = document.getElementById('current-stats');
const categorySelect = document.getElementById('category-select');
const audioBtn = document.getElementById('audio-btn');
const frequencyBadge = document.getElementById('frequency-badge');

// Speech synthesis
let speechSynthesis = window.speechSynthesis;
let japaneseVoice = null;

// Tab elements
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Initialize the app
function init() {
    loadStats();
    populateCategorySelect();
    setupEventListeners();
    initVoices();
    showNextCard();
    updateStatsTab();
    updateCategoriesTab();
}

// Initialize speech synthesis voices
function initVoices() {
    function loadVoices() {
        const voices = speechSynthesis.getVoices();
        // Try to find a Japanese voice
        japaneseVoice = voices.find(v => v.lang.startsWith('ja')) || null;
    }

    loadVoices();
    // Chrome loads voices asynchronously
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
    }
}

// Audio element for pre-generated audio files
let currentAudio = null;

// Sanitize romaji to match audio filename: lowercase, spaces to hyphens, remove special chars
function getAudioFilename(romaji) {
    return romaji.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
}

// Speak the current phrase in Japanese (tries pre-generated audio first, falls back to Web Speech API)
function speakPhrase() {
    if (!currentCard) return;

    // Stop any currently playing audio
    stopAudio();

    // Visual feedback
    audioBtn.classList.add('speaking');

    // Try pre-generated audio file first (named by romaji)
    const audioPath = `assets/audio/${getAudioFilename(currentCard.romaji)}.mp3`;
    currentAudio = new Audio(audioPath);

    currentAudio.onended = () => {
        audioBtn.classList.remove('speaking');
        currentAudio = null;
    };

    currentAudio.onerror = () => {
        // Fall back to Web Speech API if audio file doesn't exist
        currentAudio = null;
        speakWithSynthesis();
    };

    currentAudio.play().catch(() => {
        // Fall back to Web Speech API if playback fails
        currentAudio = null;
        speakWithSynthesis();
    });
}

// Stop any currently playing audio
function stopAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    if (speechSynthesis) {
        speechSynthesis.cancel();
    }
    audioBtn.classList.remove('speaking');
}

// Fallback: use Web Speech API
function speakWithSynthesis() {
    if (!speechSynthesis) {
        audioBtn.classList.remove('speaking');
        return;
    }

    const utterance = new SpeechSynthesisUtterance(currentCard.japanese);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8;

    if (japaneseVoice) {
        utterance.voice = japaneseVoice;
    }

    utterance.onend = () => {
        audioBtn.classList.remove('speaking');
    };
    utterance.onerror = () => {
        audioBtn.classList.remove('speaking');
    };

    speechSynthesis.speak(utterance);
}

// Load stats from localStorage
function loadStats() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            stats = JSON.parse(saved);
        }
    } catch (e) {
        console.error('Error loading stats:', e);
        stats = {};
    }

    // Initialize stats for any new phrases
    PHRASES.forEach(phrase => {
        if (!stats[phrase.id]) {
            stats[phrase.id] = { right: 0, wrong: 0 };
        }
    });
}

// Save stats to localStorage
function saveStats() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch (e) {
        console.error('Error saving stats:', e);
    }
}

// Get weighted random card (prioritize cards with more wrong answers and higher frequency)
function getWeightedRandomCard() {
    const availablePhrases = selectedCategory === 'all'
        ? PHRASES
        : PHRASES.filter(p => p.category === selectedCategory);

    if (availablePhrases.length === 0) return null;

    // Calculate weights based on:
    // 1. Performance (cards you struggle with get higher weight)
    // 2. Frequency (more common phrases get higher weight)
    const weights = availablePhrases.map(phrase => {
        const cardStats = stats[phrase.id] || { right: 0, wrong: 0 };
        const total = cardStats.right + cardStats.wrong;
        const frequency = phrase.frequency || 3; // Default to 3 if not set

        let performanceWeight;

        if (total === 0) {
            // Never seen - high priority, scaled by frequency
            performanceWeight = 10;
        } else {
            // Calculate success rate
            const successRate = cardStats.right / total;

            // Mastered cards (>80% success with at least 3 attempts) get very low weight
            if (successRate > 0.8 && total >= 3) {
                performanceWeight = 1;
            } else {
                // Learning cards get higher weight based on failure rate
                performanceWeight = Math.max(1, Math.round(10 * (1 - successRate) + cardStats.wrong));
            }
        }

        // Multiply by frequency to prioritize common phrases
        // Frequency 5 = x2.0, Frequency 1 = x0.6
        const frequencyMultiplier = 0.4 + (frequency * 0.32);
        return performanceWeight * frequencyMultiplier;
    });

    // Weighted random selection
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < availablePhrases.length; i++) {
        random -= weights[i];
        if (random <= 0) {
            return availablePhrases[i];
        }
    }

    // Fallback
    return availablePhrases[Math.floor(Math.random() * availablePhrases.length)];
}

// Show the next card
function showNextCard() {
    currentCard = getWeightedRandomCard();
    cardRevealed = false;

    if (!currentCard) {
        phraseEnglish.textContent = 'No cards available';
        phraseJapanese.textContent = '';
        phraseRomaji.textContent = '';
        phrasePhonetic.textContent = '';
        phraseLiteral.textContent = '';
        frequencyBadge.textContent = '';
        frequencyBadge.className = 'frequency-badge';
        answerButtons.style.display = 'none';
        return;
    }

    // Reset card state
    flashcard.classList.remove('flipped');
    answerButtons.style.display = 'none';

    // Update card content
    phraseEnglish.textContent = currentCard.english;
    phraseJapanese.textContent = currentCard.japanese;
    phraseRomaji.textContent = currentCard.romaji;
    phrasePhonetic.textContent = currentCard.phonetic || '';
    phraseLiteral.textContent = currentCard.literal ? `(${currentCard.literal})` : '';

    // Update frequency badge
    const freq = currentCard.frequency || 3;
    frequencyBadge.textContent = FREQUENCY_LABELS[freq] || 'Common';
    frequencyBadge.className = 'frequency-badge freq-' + freq;

    // Update current card stats display
    const cardStats = stats[currentCard.id] || { right: 0, wrong: 0 };
    if (cardStats.right > 0 || cardStats.wrong > 0) {
        currentStats.textContent = `This card: ${cardStats.right} right, ${cardStats.wrong} wrong`;
    } else {
        currentStats.textContent = 'New card!';
    }
}

// Flip the card to reveal Japanese
function flipCard() {
    if (!currentCard || cardRevealed) return;

    flashcard.classList.add('flipped');
    cardRevealed = true;
    answerButtons.style.display = 'flex';
}

// Record answer and show next card
function recordAnswer(correct) {
    if (!currentCard) return;

    if (correct) {
        stats[currentCard.id].right++;
    } else {
        stats[currentCard.id].wrong++;
    }

    saveStats();
    updateStatsTab();
    showNextCard();
}

// Populate category dropdown
function populateCategorySelect() {
    categorySelect.textContent = '';
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All Categories';
    categorySelect.appendChild(allOption);

    CATEGORIES.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
    });
}

// Create a stats item element safely using DOM methods
function createStatsItem(phrase, cardStats, total, successRate, isMastered) {
    const item = document.createElement('div');
    item.className = `stats-item ${isMastered ? 'mastered' : ''}`;

    const phraseDiv = document.createElement('div');
    phraseDiv.className = 'stats-item-phrase';

    const englishSpan = document.createElement('span');
    englishSpan.className = 'stats-english';
    englishSpan.textContent = phrase.english;

    const categorySpan = document.createElement('span');
    categorySpan.className = 'stats-category';
    categorySpan.textContent = phrase.category;

    phraseDiv.appendChild(englishSpan);
    phraseDiv.appendChild(categorySpan);

    const numbersDiv = document.createElement('div');
    numbersDiv.className = 'stats-item-numbers';

    const rightSpan = document.createElement('span');
    rightSpan.className = 'stats-right';
    rightSpan.textContent = `${cardStats.right} ✓`;

    const wrongSpan = document.createElement('span');
    wrongSpan.className = 'stats-wrong';
    wrongSpan.textContent = `${cardStats.wrong} ✗`;

    const rateSpan = document.createElement('span');
    rateSpan.className = 'stats-rate';
    rateSpan.textContent = `${successRate}%`;

    numbersDiv.appendChild(rightSpan);
    numbersDiv.appendChild(wrongSpan);
    numbersDiv.appendChild(rateSpan);

    item.appendChild(phraseDiv);
    item.appendChild(numbersDiv);

    return item;
}

// Update stats tab content
function updateStatsTab() {
    const totalCards = PHRASES.length;
    let masteredCount = 0;
    let learningCount = 0;

    PHRASES.forEach(phrase => {
        const cardStats = stats[phrase.id] || { right: 0, wrong: 0 };
        const total = cardStats.right + cardStats.wrong;

        if (total >= 3 && (cardStats.right / total) > 0.8) {
            masteredCount++;
        } else if (total > 0) {
            learningCount++;
        }
    });

    document.getElementById('total-cards').textContent = totalCards;
    document.getElementById('mastered-cards').textContent = masteredCount;
    document.getElementById('learning-cards').textContent = learningCount;

    // Update detailed stats list
    const statsList = document.getElementById('stats-list');
    statsList.textContent = '';

    let hasStats = false;
    PHRASES.forEach(phrase => {
        const cardStats = stats[phrase.id] || { right: 0, wrong: 0 };
        const total = cardStats.right + cardStats.wrong;

        if (total === 0) return; // Only show cards that have been practiced

        hasStats = true;
        const successRate = total > 0 ? Math.round((cardStats.right / total) * 100) : 0;
        const isMastered = total >= 3 && successRate > 80;

        const item = createStatsItem(phrase, cardStats, total, successRate, isMastered);
        statsList.appendChild(item);
    });

    if (!hasStats) {
        const noStatsMsg = document.createElement('p');
        noStatsMsg.className = 'no-stats';
        noStatsMsg.textContent = 'Start practicing to see your stats here!';
        statsList.appendChild(noStatsMsg);
    }
}

// Create a category item element safely
function createCategoryItem(category, phraseCount) {
    const item = document.createElement('div');
    item.className = 'category-item';

    const h3 = document.createElement('h3');
    h3.textContent = category;

    const p = document.createElement('p');
    p.textContent = `${phraseCount} phrases`;

    item.appendChild(h3);
    item.appendChild(p);

    item.addEventListener('click', () => {
        selectedCategory = category;
        categorySelect.value = category;
        switchTab('flashcards');
        showNextCard();
    });

    return item;
}

// Update categories tab
function updateCategoriesTab() {
    const categoriesList = document.getElementById('categories-list');
    categoriesList.textContent = '';

    CATEGORIES.forEach(category => {
        const phrases = PHRASES.filter(p => p.category === category);
        const item = createCategoryItem(category, phrases.length);
        categoriesList.appendChild(item);
    });
}

// Switch tabs
function switchTab(tabId) {
    tabBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    tabContents.forEach(content => {
        content.classList.toggle('active', content.id === tabId);
    });
}

// Reset all stats
function resetStats() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        stats = {};
        PHRASES.forEach(phrase => {
            stats[phrase.id] = { right: 0, wrong: 0 };
        });
        saveStats();
        updateStatsTab();
        showNextCard();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Flashcard click (but not on audio button)
    flashcard.addEventListener('click', (e) => {
        if (e.target.closest('.audio-btn')) return;
        flipCard();
    });

    // Audio button
    audioBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        speakPhrase();
    });

    // Answer buttons
    btnRight.addEventListener('click', () => recordAnswer(true));
    btnWrong.addEventListener('click', () => recordAnswer(false));

    // Category select
    categorySelect.addEventListener('change', (e) => {
        selectedCategory = e.target.value;
        showNextCard();
    });

    // Tab buttons
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Reset stats button
    document.getElementById('reset-stats').addEventListener('click', resetStats);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

        switch(e.key) {
            case ' ':
            case 'Enter':
                e.preventDefault();
                if (!cardRevealed) {
                    flipCard();
                } else {
                    // Space/Enter on revealed card shows next card (skip)
                    showNextCard();
                }
                break;
            case 'ArrowRight':
            case 'j':
                if (cardRevealed) {
                    recordAnswer(true);
                }
                break;
            case 'ArrowLeft':
            case 'k':
                if (cardRevealed) {
                    recordAnswer(false);
                }
                break;
            case 's':
            case 'S':
                // Play audio anytime
                speakPhrase();
                break;
            case 'n':
            case 'N':
                // Skip to next card without recording
                showNextCard();
                break;
        }
    });
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
