// Service Worker for Traveler's Japanese PWA
const CACHE_NAME = 'travelers-japanese-v1';

// Core app files
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/phrases.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Audio files - will be cached on first use
const AUDIO_FILES = [
  '/assets/audio/arigatou-gozaimasu.mp3',
  '/assets/audio/arigatou.mp3',
  '/assets/audio/basho-made-ichimai-onegaishimasu.mp3',
  '/assets/audio/basho-made-ikura-desu-ka.mp3',
  '/assets/audio/basho-ni-ikitai-desu.mp3',
  '/assets/audio/basutei-wa-doko-desu-ka.mp3',
  '/assets/audio/bejitarian-desu.mp3',
  '/assets/audio/byouin-wa-doko-desu-ka.mp3',
  '/assets/audio/chekkuauto-onegaishimasu.mp3',
  '/assets/audio/chekkuauto-wa-nanji-desu-ka.mp3',
  '/assets/audio/chekkuin-onegaishimasu.mp3',
  '/assets/audio/chikai-desu-ka.mp3',
  '/assets/audio/choushoku-wa-fukumarete-imasu-ka.mp3',
  '/assets/audio/dou-itashimashite.mp3',
  '/assets/audio/eigo-no-menyuu-wa-arimasu-ka.mp3',
  '/assets/audio/eigo-wo-hanasemasu-ka.mp3',
  '/assets/audio/eki-wa-doko-desu-ka.mp3',
  '/assets/audio/go.mp3',
  '/assets/audio/gochisousama-deshita.mp3',
  '/assets/audio/gomen-nasai.mp3',
  '/assets/audio/hai.mp3',
  '/assets/audio/hajimemashite.mp3',
  '/assets/audio/hidari-ni-magatte-kudasai.mp3',
  '/assets/audio/hyaku.mp3',
  '/assets/audio/ichi.mp3',
  '/assets/audio/iie.mp3',
  '/assets/audio/ima-nanji-desu-ka.mp3',
  '/assets/audio/itadakimasu.mp3',
  '/assets/audio/jaa-ne.mp3',
  '/assets/audio/juu.mp3',
  '/assets/audio/keisatsu-wo-yonde-kudasai.mp3',
  '/assets/audio/kibun-ga-warui-desu.mp3',
  '/assets/audio/koko-de-tomete-kudasai.mp3',
  '/assets/audio/konbanwa.mp3',
  '/assets/audio/konnichiwa.mp3',
  '/assets/audio/kono-basho-wa-doko-desu-ka.mp3',
  '/assets/audio/kono-densha-wa-basho-ni-ikimasu-ka.mp3',
  '/assets/audio/kore-wa-ikura-desu-ka.mp3',
  '/assets/audio/kore-wa-karai-desu-ka.mp3',
  '/assets/audio/kore-wa-nan-desu-ka.mp3',
  '/assets/audio/kore-wo-kudasai.mp3',
  '/assets/audio/kurejitto-kaado-wa-tsukaemasu-ka.mp3',
  '/assets/audio/kyuukyuusha-wo-yonde-kudasai.mp3',
  '/assets/audio/maigo-ni-narimashita.mp3',
  '/assets/audio/massugu-itte-kudasai.mp3',
  '/assets/audio/menzei-de-onegaishimasu.mp3',
  '/assets/audio/migi-ni-magatte-kudasai.mp3',
  '/assets/audio/miteiru-dake-desu.mp3',
  '/assets/audio/motto-chiisai-saizu-wa-arimasu-ka.mp3',
  '/assets/audio/motto-ookii-saizu-wa-arimasu-ka.mp3',
  '/assets/audio/mou-ichido-itte-kudasai.mp3',
  '/assets/audio/nanji-ni-shuppatsu-shimasu-ka.mp3',
  '/assets/audio/ni.mp3',
  '/assets/audio/nihongo-ga-hanasemasen.mp3',
  '/assets/audio/nihongo-ga-sukoshi-hanasemasu.mp3',
  '/assets/audio/niku-nashi-de-onegaishimasu.mp3',
  '/assets/audio/ohayou-gozaimasu.mp3',
  '/assets/audio/oishikatta-desu.mp3',
  '/assets/audio/okaikei-onegaishimasu.mp3',
  '/assets/audio/omizu-wo-kudasai.mp3',
  '/assets/audio/onegaishimasu.mp3',
  '/assets/audio/pasupooto-wo-nakushimashita.mp3',
  '/assets/audio/san.mp3',
  '/assets/audio/sayounara.mp3',
  '/assets/audio/sen.mp3',
  '/assets/audio/sumimasen.mp3',
  '/assets/audio/tasukete.mp3',
  '/assets/audio/toire-wa-doko-desu-ka.mp3',
  '/assets/audio/tooi-desu-ka.mp3',
  '/assets/audio/wakarimasen.mp3',
  '/assets/audio/wakarimashita.mp3',
  '/assets/audio/wifi-no-pasuwaado-wa-nan-desu-ka.mp3',
  '/assets/audio/yon--shi.mp3',
  '/assets/audio/yoyaku-ga-arimasu.mp3',
  '/assets/audio/yukkuri-hanashite-kudasai.mp3'
];

// Install: cache all assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching app assets...');
      return cache.addAll([...CORE_ASSETS, ...AUDIO_FILES]);
    })
  );
  // Activate immediately
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  // Take control of all pages immediately
  self.clients.claim();
});

// Fetch: serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((response) => {
        // Don't cache non-successful responses or non-GET requests
        if (!response || response.status !== 200 || event.request.method !== 'GET') {
          return response;
        }

        // Clone and cache the response
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    }).catch(() => {
      // Offline fallback for navigation requests
      if (event.request.mode === 'navigate') {
        return caches.match('/index.html');
      }
    })
  );
});
