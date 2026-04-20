/**
 * app.js – Farmer Scheme Assistant (Multi-Page)
 * Per-page logic: language toggle, scheme matching, chatbot, modal,
 * Tamil/English voice (STT + TTS with Google TTS fallback), MongoDB API
 */

// ── API BASE URL (change this for production deployment) ─────────────────────
const API_BASE = 'https://farmerschemeassistant-1.onrender.com';

// ── STATE ─────────────────────────────────────────────────────────────────────
let currentLang = localStorage.getItem('fsa_lang') || 'en';
let savedProfile = null;
let availableVoices = [];

try {
    const raw = localStorage.getItem('fsa_profile');
    if (raw) savedProfile = JSON.parse(raw);
} catch (_) { }

// ── DETECT CURRENT PAGE ──────────────────────────────────────────────────────
const PAGE = (() => {
    const path = window.location.pathname;
    if (path.includes('profile')) return 'profile';
    if (path.includes('schemes')) return 'schemes';
    if (path.includes('chatbot')) return 'chatbot';
    if (path.includes('login')) return 'login';
    return 'unknown';
})();

// ── AUTH CHECK (all pages except login) ──────────────────────────────────────
if (PAGE !== 'login') {
    fetch(API_BASE + '/api/me', { credentials: 'include' })
        .then(r => r.json())
        .then(data => {
            if (!data.success) window.location.href = '/login.html';
        })
        .catch(() => { window.location.href = '/login.html'; });
}

// ── VOICE HELPERS ─────────────────────────────────────────────────────────────
let voicesReady = false;

function loadVoices() {
    availableVoices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
    if (availableVoices.length > 0) voicesReady = true;
}

function getTamilVoice() {
    return availableVoices.find(v => v.lang === 'ta-IN' && v.name.includes('Google'))
        || availableVoices.find(v => v.lang === 'ta-IN')
        || availableVoices.find(v => v.lang.startsWith('ta'))
        || null;
}

function getEnglishVoice() {
    return availableVoices.find(v => v.lang === 'en-IN' && v.name.includes('Google'))
        || availableVoices.find(v => v.lang === 'en-IN')
        || availableVoices.find(v => v.lang.startsWith('en'))
        || null;
}

if ('speechSynthesis' in window) {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
}

// ── SPEAK TEXT (with Google TTS fallback for Tamil) ───────────────────────────
function speakText(text, lang) {
    const plainText = text.replace(/<[^>]+>/g, '').replace(/\*\*(.*?)\*\*/g, '$1');

    if (lang === 'ta') {
        // Try Google Translate TTS for Tamil (more reliable)
        speakWithGoogleTTS(plainText, 'ta');
    } else {
        // English - use native SpeechSynthesis
        speakWithNative(plainText, 'en-IN');
    }
}

function speakWithGoogleTTS(text, langCode) {
    // Google Translate TTS — works for Tamil without needing installed voices
    const chunks = splitTextForGoogleTTS(text, 200);
    let audioQueue = [];

    chunks.forEach((chunk, index) => {
        const encodedText = encodeURIComponent(chunk);
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=${langCode}&client=tw-ob&idx=${index}&total=${chunks.length}`;
        audioQueue.push(url);
    });

    playAudioQueue(audioQueue, 0);
}

function splitTextForGoogleTTS(text, maxLen) {
    const chunks = [];
    let remaining = text;
    while (remaining.length > 0) {
        if (remaining.length <= maxLen) {
            chunks.push(remaining);
            break;
        }
        // Find last sentence/phrase break before maxLen
        let breakPoint = remaining.lastIndexOf('।', maxLen);
        if (breakPoint < 0) breakPoint = remaining.lastIndexOf('.', maxLen);
        if (breakPoint < 0) breakPoint = remaining.lastIndexOf(',', maxLen);
        if (breakPoint < 0) breakPoint = remaining.lastIndexOf(' ', maxLen);
        if (breakPoint < 0) breakPoint = maxLen;
        chunks.push(remaining.substring(0, breakPoint + 1).trim());
        remaining = remaining.substring(breakPoint + 1).trim();
    }
    return chunks.filter(c => c.length > 0);
}

function playAudioQueue(urls, index) {
    if (index >= urls.length) return;
    const audio = new Audio(urls[index]);
    audio.onended = () => playAudioQueue(urls, index + 1);
    audio.onerror = () => {
        // Fallback to native if Google TTS fails
        console.warn('Google TTS failed, falling back to native SpeechSynthesis');
        const text = decodeURIComponent(urls[index].split('&q=')[1]?.split('&tl=')[0] || '');
        speakWithNative(text, 'ta-IN');
    };
    audio.play().catch(() => {
        // Audio play blocked — fallback to native
        speakWithNative('', 'ta-IN');
    });
}

function speakWithNative(text, langTag) {
    if (!('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = langTag;
    utter.rate = 0.9;
    utter.pitch = 1;

    if (langTag.startsWith('ta')) {
        const v = getTamilVoice();
        if (v) utter.voice = v;
    } else {
        const v = getEnglishVoice();
        if (v) utter.voice = v;
    }

    window.speechSynthesis.speak(utter);
}

// ── DETECT TAMIL SCRIPT ──────────────────────────────────────────────────────
function isTamilText(text) {
    // Tamil Unicode range: 0B80-0BFF
    const tamilChars = text.match(/[\u0B80-\u0BFF]/g);
    return tamilChars && tamilChars.length > text.length * 0.2;
}

// ── INIT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(currentLang);
    initPage();
    bindCommonEvents();
});

// ── LANGUAGE ──────────────────────────────────────────────────────────────────
function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('fsa_lang', lang);

    const isTa = lang === 'ta';
    document.documentElement.setAttribute('lang', lang);

    const langLabel = document.getElementById('langLabel');
    if (langLabel) langLabel.textContent = isTa ? 'English' : 'தமிழ்';

    // Translate all [data-en] / [data-ta] elements
    document.querySelectorAll('[data-en]').forEach(el => {
        const text = isTa ? el.getAttribute('data-ta') : el.getAttribute('data-en');
        if (text) el.textContent = text;
    });

    // Quick chat buttons
    document.querySelectorAll('.quick-btn').forEach(btn => {
        const text = isTa ? btn.getAttribute('data-ta') : btn.getAttribute('data-en');
        if (text) btn.textContent = text;
    });

    // Chat welcome bubble
    const welcomeBubble = document.querySelector('#chatWindow .chat-bubble');
    if (welcomeBubble) {
        welcomeBubble.textContent = isTa
            ? welcomeBubble.getAttribute('data-ta')
            : welcomeBubble.getAttribute('data-en');
    }

    // Update chat placeholder
    const chatInput = document.getElementById('chatInput');
    if (chatInput) chatInput.placeholder = TRANSLATIONS[lang].chatPlaceholder;

    // Re-render schemes if on schemes page
    if (PAGE === 'schemes') {
        loadAndRenderSchemes();
    }
}

// ── COMMON EVENTS ─────────────────────────────────────────────────────────────
function bindCommonEvents() {
    // Language toggle
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            applyLanguage(currentLang === 'en' ? 'ta' : 'en');
        });
    }

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await fetch(API_BASE + '/api/logout', { credentials: 'include' });
            localStorage.removeItem('fsa_user');
            localStorage.removeItem('fsa_profile');
            localStorage.removeItem('fsa_schemes');
            window.location.href = '/login.html';
        });
    }
}

// ── PER-PAGE INIT ─────────────────────────────────────────────────────────────
function initPage() {
    switch (PAGE) {
        case 'profile':
            initProfilePage();
            break;
        case 'schemes':
            initSchemesPage();
            break;
        case 'chatbot':
            initChatbotPage();
            break;
    }
}

// ══════════════════════════════════════════════════════════════════════════════
// PROFILE PAGE
// ══════════════════════════════════════════════════════════════════════════════
function initProfilePage() {
    if (savedProfile) restoreProfile(savedProfile);

    // Form submit
    document.getElementById('farmerForm').addEventListener('submit', async e => {
        e.preventDefault();
        const profile = readProfile();
        if (!validateProfile(profile)) return;

        localStorage.setItem('fsa_profile', JSON.stringify(profile));
        const matched = matchSchemes(profile);

        // Save matched scheme IDs for the schemes page
        localStorage.setItem('fsa_schemes', JSON.stringify(matched.map(s => s.id)));
        localStorage.setItem('fsa_matched_data', JSON.stringify(matched));

        // Save to MongoDB
        await saveFarmerToMongoDB(profile, matched.map(s => s.id));

        // Navigate to schemes page
        window.location.href = '/schemes.html';
    });

    // Clear form
    document.getElementById('clearForm').addEventListener('click', () => {
        document.getElementById('farmerForm').reset();
        clearErrors();
        localStorage.removeItem('fsa_profile');
        localStorage.removeItem('fsa_schemes');
        localStorage.removeItem('fsa_matched_data');
    });
}

function readProfile() {
    return {
        name: document.getElementById('farmerName').value.trim(),
        age: parseInt(document.getElementById('farmerAge').value) || 0,
        state: document.getElementById('farmerState').value,
        district: document.getElementById('farmerDistrict').value.trim(),
        land: parseFloat(document.getElementById('farmerLand').value) || 0,
        crop: document.getElementById('farmerCrop').value,
        income: parseInt(document.getElementById('farmerIncome').value) || 0,
        category: document.getElementById('farmerCategory').value
    };
}

function validateProfile(p) {
    clearErrors();
    let valid = true;
    if (!p.name) { showError('nameError', 'Please enter your name.'); valid = false; }
    if (!p.age || p.age < 18) { showError('ageError', 'Enter a valid age (18+).'); valid = false; }
    if (!p.state) { showError('stateError', 'Please select your state.'); valid = false; }
    if (!p.land || p.land <= 0) { showError('landError', 'Enter a valid land size.'); valid = false; }
    if (!p.crop) { showError('cropError', 'Please select a crop.'); valid = false; }
    if (p.income === undefined || p.income < 0) { showError('incomeError', 'Enter a valid income.'); valid = false; }
    return valid;
}

function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
}

function clearErrors() {
    ['nameError', 'ageError', 'stateError', 'landError', 'cropError', 'incomeError']
        .forEach(id => { const el = document.getElementById(id); if (el) el.textContent = ''; });
}

function restoreProfile(p) {
    if (!p) return;
    setVal('farmerName', p.name);
    setVal('farmerAge', p.age);
    setVal('farmerState', p.state);
    setVal('farmerDistrict', p.district);
    setVal('farmerLand', p.land);
    setVal('farmerCrop', p.crop);
    setVal('farmerIncome', p.income);
    setVal('farmerCategory', p.category);
}

function setVal(id, val) {
    const el = document.getElementById(id);
    if (el && val !== undefined && val !== null) el.value = val;
}

async function saveFarmerToMongoDB(profile, matchedSchemeIds) {
    try {
        const res = await fetch(API_BASE + '/api/farmers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ ...profile, matchedSchemes: matchedSchemeIds })
        });
        const data = await res.json();
        if (data.success) {
            console.log('✅ Farmer saved to MongoDB:', data.farmer._id);
        }
    } catch (err) {
        console.warn('⚠️ MongoDB save failed, data saved locally.', err.message);
    }
}

// ── SCHEME MATCHING ───────────────────────────────────────────────────────────
function matchSchemes(profile) {
    return SCHEMES.filter(scheme => {
        return scheme.match.some(rule => evaluateRule(rule, profile));
    }).map(scheme => ({
        ...scheme,
        score: calcScore(scheme, profile)
    })).sort((a, b) => b.score - a.score);
}

function evaluateRule(rule, p) {
    if (rule === 'always') return true;
    try {
        const income = p.income, land = p.land, crop = p.crop,
            state = p.state, age = p.age, category = p.category;
        return eval(rule);
    } catch (_) { return false; }
}

function calcScore(scheme, p) {
    let score = 50;
    if (p.income < 100000) score += 20;
    else if (p.income < 200000) score += 15;
    else if (p.income < 300000) score += 10;
    if (p.land < 1) score += 15;
    else if (p.land < 2) score += 10;
    else if (p.land < 5) score += 5;
    if (p.category === 'SC' || p.category === 'ST') score += 10;
    if (scheme.id === 'pm-kisan') score += 5;
    return Math.min(score, 99);
}

// ══════════════════════════════════════════════════════════════════════════════
// SCHEMES PAGE
// ══════════════════════════════════════════════════════════════════════════════
function initSchemesPage() {
    loadAndRenderSchemes();

    // Modal close
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) {
        modalOverlay.addEventListener('click', e => {
            if (e.target === modalOverlay) closeModal();
        });
    }
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal();
    });
}

function loadAndRenderSchemes() {
    const profile = savedProfile;
    if (!profile) {
        document.getElementById('noSchemes').style.display = 'block';
        return;
    }

    const matched = matchSchemes(profile);
    if (matched.length > 0) {
        document.getElementById('noSchemes').style.display = 'none';
        renderSchemes(matched, profile.name);
    } else {
        document.getElementById('noSchemes').style.display = 'block';
    }
}

function renderSchemes(schemes, farmerName) {
    const isTa = currentLang === 'ta';
    const T = TRANSLATIONS[currentLang];

    document.getElementById('resultName').textContent = ` ${farmerName}`;
    const matchCountEl = document.getElementById('matchCount');
    const grid = document.getElementById('schemesGrid');

    grid.innerHTML = '';
    matchCountEl.textContent = T.matchFound(schemes.length);

    schemes.forEach((scheme, idx) => {
        const title = isTa ? scheme.titleTa : scheme.title;
        const desc = isTa ? scheme.descTa : scheme.desc;
        const ministry = isTa ? scheme.ministryTa : scheme.ministry;
        const benefit = isTa ? scheme.benefitTa : scheme.benefit;
        const tags = isTa ? scheme.tagsTa || scheme.tags : scheme.tags;

        const tagsHTML = tags.map((tag, i) =>
            `<span class="scheme-tag ${scheme.tagClass[i] || ''}">${tag}</span>`
        ).join('');

        const card = document.createElement('div');
        card.className = 'scheme-card';
        card.style.animationDelay = `${idx * 0.08}s`;
        card.setAttribute('role', 'article');
        card.innerHTML = `
      <div class="scheme-card-header">
        <span class="scheme-emoji">${scheme.emoji}</span>
        <div>
          <div class="scheme-title">${title}</div>
          <div class="scheme-ministry">${ministry}</div>
        </div>
      </div>
      <p class="scheme-desc">${desc}</p>
      <div class="scheme-tags">${tagsHTML}</div>
      <div class="scheme-benefit">✅ ${benefit}</div>
      <div class="scheme-card-footer">
        <span class="scheme-match-badge">${T.matchScore(scheme.score)}</span>
        <button class="scheme-details-btn" data-id="${scheme.id}" aria-label="View details for ${title}">
          ${T.viewDetails}
        </button>
      </div>
    `;
        card.querySelector('.scheme-details-btn').addEventListener('click', e => {
            e.stopPropagation();
            showModal(scheme.id);
        });
        card.addEventListener('click', () => showModal(scheme.id));
        grid.appendChild(card);
    });
}

function showModal(schemeId) {
    const scheme = SCHEMES.find(s => s.id === schemeId);
    if (!scheme) return;

    const isTa = currentLang === 'ta';
    const T = TRANSLATIONS[currentLang];
    const title = isTa ? scheme.titleTa : scheme.title;
    const ministry = isTa ? scheme.ministryTa : scheme.ministry;
    const steps = isTa ? (scheme.stepsTa || scheme.steps) : scheme.steps;
    const docs = isTa ? (scheme.docsTa || scheme.docs) : scheme.docs;
    const benefit = isTa ? scheme.benefitTa : scheme.benefit;

    const stepsHTML = steps.map(s => `<li>${s}</li>`).join('');
    const docsHTML = docs.map(d => `<li>${d}</li>`).join('');

    document.getElementById('modalContent').innerHTML = `
    <div style="font-size:2.5rem; margin-bottom:0.75rem;">${scheme.emoji}</div>
    <h2 class="modal-scheme-title">${title}</h2>
    <p class="modal-ministry">${ministry}</p>
    <div style="background:var(--green-pale); border-radius:var(--radius-sm); padding:0.75rem 1rem; font-size:0.9rem; font-weight:600; color:var(--green-deep); margin-bottom:1rem;">
      ✅ ${benefit}
    </div>
    <div class="modal-steps">
      <div class="modal-section-title">${T.modalSteps}</div>
      <ol>${stepsHTML}</ol>
    </div>
    <div class="modal-docs">
      <div class="modal-section-title">${T.modalDocs}</div>
      <ul>${docsHTML}</ul>
    </div>
    <a href="${scheme.website}" target="_blank" rel="noopener noreferrer" class="modal-website">
      ${T.modalVisit} ↗
    </a>
  `;

    document.getElementById('modalOverlay').classList.remove('hidden');
    document.getElementById('schemeModal').focus();
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) overlay.classList.add('hidden');
    document.body.style.overflow = '';
}

// ══════════════════════════════════════════════════════════════════════════════
// CHATBOT PAGE
// ══════════════════════════════════════════════════════════════════════════════
function initChatbotPage() {
    // Send button
    document.getElementById('sendBtn').addEventListener('click', sendChat);
    document.getElementById('chatInput').addEventListener('keydown', e => {
        if (e.key === 'Enter') sendChat();
    });

    // Quick buttons
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const q = currentLang === 'ta'
                ? (btn.getAttribute('data-ta') || btn.getAttribute('data-query'))
                : btn.getAttribute('data-query');
            document.getElementById('chatInput').value = q;
            sendChat();
        });
    });

    // Voice input (STT)
    const micBtn = document.getElementById('micBtn');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (micBtn && SpeechRecognition) {
        micBtn.addEventListener('click', () => {
            const recognition = new SpeechRecognition();
            recognition.lang = currentLang === 'ta' ? 'ta-IN' : 'en-IN';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;
            recognition.continuous = false;

            micBtn.classList.add('listening');
            recognition.start();

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('chatInput').value = transcript;
                micBtn.classList.remove('listening');
                sendChat();
            };
            recognition.onerror = () => micBtn.classList.remove('listening');
            recognition.onend = () => micBtn.classList.remove('listening');
        });
    } else if (micBtn) {
        micBtn.style.display = 'none';
    }
}

function sendChat() {
    const input = document.getElementById('chatInput');
    const query = input.value.trim();
    if (!query) return;

    addChatMsg(query, 'user');
    input.value = '';

    const typingId = showTyping();

    setTimeout(() => {
        removeTyping(typingId);
        const reply = getChatResponse(query);
        addChatMsg(reply, 'bot');
    }, 700 + Math.random() * 500);
}

function getChatResponse(query) {
    const queryLower = query.toLowerCase();
    const userWantsTamil = isTamilText(query) || currentLang === 'ta';

    for (const faq of FAQ) {
        if (faq.keywords.some(kw => queryLower.includes(kw.toLowerCase()))) {
            return userWantsTamil ? (faq.responseTa || faq.response) : faq.response;
        }
    }

    // Default reply in appropriate language
    return userWantsTamil
        ? TRANSLATIONS.ta.defaultReply
        : TRANSLATIONS.en.defaultReply;
}

function addChatMsg(text, sender) {
    const win = document.getElementById('chatWindow');
    const div = document.createElement('div');
    div.className = `chat-msg ${sender === 'bot' ? 'bot-msg' : 'user-msg'}`;

    const avatar = sender === 'bot' ? `<div class="chat-avatar">🌾</div>` : '';

    const formatted = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br/>');

    div.innerHTML = `${avatar}<div class="chat-bubble">${formatted}</div>`;
    win.appendChild(div);
    win.scrollTop = win.scrollHeight;

    // TTS for bot replies
    if (sender === 'bot') {
        const plainText = text.replace(/<[^>]+>/g, '').replace(/\*\*(.*?)\*\*/g, '$1');
        // Detect if the response is in Tamil
        const isTamil = isTamilText(plainText) || currentLang === 'ta';
        speakText(plainText, isTamil ? 'ta' : 'en');
    }
}

function showTyping() {
    const id = 'typing-' + Date.now();
    const win = document.getElementById('chatWindow');
    const div = document.createElement('div');
    div.className = 'chat-msg bot-msg';
    div.id = id;
    div.innerHTML = `
    <div class="chat-avatar">🌾</div>
    <div class="chat-bubble">
      <div class="typing-dots"><span></span><span></span><span></span></div>
    </div>`;
    win.appendChild(div);
    win.scrollTop = win.scrollHeight;
    return id;
}

function removeTyping(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}
