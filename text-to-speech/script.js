const inputField = document.getElementById('input');
const form = document.querySelector('form');
const voiceSelect = document.querySelector('#voice-select');
const languageSelect = document.querySelector('#language-select');
const rateSelect = document.querySelector('#rate-select');

const synth = window.speechSynthesis;

const defaultLanguage = 'en-US';
const defaultVoice = 'Albert';
const defaultRate = 0.5;

let voices = [];

let languages = [];
synth.onvoiceschanged = () => {
  voices = synth.getVoices();
  voiceSelect.innerHTML = '';
  languageSelect.innerHTML = '';
  languages = Array.from(
    voices.reduce((map, voice) => {
      const lang = voice.lang;
      if (!map.has(lang)) {
        map.set(lang, []);
      }
      map.get(lang).push(voice);
      return map;
    }, new Map())
  );
  languages.forEach(([lang, voices]) => {
    const langOption = document.createElement('option');
    langOption.textContent = lang;
    langOption.value = lang;
    languageSelect.appendChild(langOption);
    langOption.selected = lang === defaultLanguage;
    voices.forEach((voice) => {
      const voiceOption = document.createElement('option');
      voiceOption.textContent = voice.name;
      voiceOption.value = voice.name;
      voiceOption.selected = voice.name === defaultVoice;
      voiceSelect.appendChild(voiceOption);
    });
  });
};

// Add event listener to language selections
languageSelect.addEventListener('change', (e) => {
  const lang = e.target.value;
  localStorage.setItem('language', lang);
  voiceSelect.innerHTML = '';
  languages
    .find(([l]) => l === lang)[1]
    .forEach((voice) => {
      const voiceOption = document.createElement('option');
      voiceOption.textContent = voice.name;
      voiceOption.value = voice.name;
      voiceSelect.appendChild(voiceOption);
    });
});

// Add options for rate selection
const rates = [0.5, 0.75, 1, 1.5];
rates.forEach((rate) => {
  const label = document.createElement('label');
  const input = document.createElement('input');
  input.type = 'radio';
  input.name = 'speed';
  input.value = `${rate}x`;
  input.checked = rate === defaultRate;
  const span = document.createElement('span');
  span.textContent = `${rate}x`;
  label.appendChild(input);
  label.appendChild(span);
  rateSelect.appendChild(label);
});

// Speaks given text using the specified voice and rate.
async function speakText(text, voiceName, rate) {
  const utterance = new SpeechSynthesisUtterance(text);
  const voice = voices.find((voice) => voice.name === voiceName);
  if (voice) {
    utterance.voice = voice;
  }
  utterance.rate = rate;
  synth.speak(utterance);
}

// Add event listener to form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = inputField.value.trim();
  const voiceName = voiceSelect.value;
  const rate = Number(rateSelect.querySelector('input:checked').value.replace('x', ''));
  speakText(text, voiceName, rate);
  localStorage.setItem('voice', voiceName);
});

//
/**
 * const inputField = document.getElementById('input');
const form = document.querySelector('form');
const voiceSelect = document.querySelector('#voice-select');
const languageSelect = document.querySelector('#language-select');
const rateSelect = document.querySelector('#rate-select');

const synth = window.speechSynthesis;
const defaultLanguage = 'en-US';

let voices = [];

let languages = [];
synth.onvoiceschanged = () => {
  voices = synth.getVoices().filter((voice) => voice.lang === defaultLanguage);
  voiceSelect.innerHTML = '';
  languageSelect.innerHTML = '';
  languages = Array.from(
    voices.reduce((map, voice) => {
      const lang = voice.lang;
      if (!map.has(lang)) {
        map.set(lang, []);
      }
      map.get(lang).push(voice);
      return map;
    }, new Map())
  );
  languages.forEach(([lang, voices]) => {
    const langOption = document.createElement('option');
    langOption.textContent = lang;
    langOption.value = lang;
    languageSelect.appendChild(langOption);
    voices.forEach((voice) => {
      const option = document.createElement('option');
      option.textContent = voice.name;
      option.value = voice.name;
      voiceSelect.appendChild(option);
    });
  });
  languageSelect.value = defaultLanguage;
  languageSelect.dispatchEvent(new Event('change'));
};

languageSelect.addEventListener('change', (e) => {
  const lang = e.target.value;
  voiceSelect.innerHTML = '';
  languages
    .find(([l]) => l === lang)[1]
    .forEach((voice) => {
      const option = document.createElement('option');
      option.textContent = voice.name;
      option.value = voice.name;
      voiceSelect.appendChild(option);
    });
});

// Add options for rate selection
const rates = [0.5, 0.75, 1, 1.5];
rates.forEach((rate) => {
  const label = document.createElement('label');
  const input = document.createElement('input');
  input.type = 'radio';
  input.name = 'speed';
  input.value = `${rate}x`;
  input.checked = rate === 0.5;
  const span = document.createElement('span');
  span.textContent = `${rate}x`;
  label.appendChild(input);
  label.appendChild(span);
  rateSelect.appendChild(label);
});

async function speakText(text, voiceName, rate) {
  const utterance = new SpeechSynthesisUtterance(text);
  const voice = voices.find((voice) => voice.name === voiceName);
  if (voice) {
    utterance.voice = voice;
  }
  utterance.rate = rate;
  synth.speak(utterance);
}

// Add event listener to form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = inputField.value.trim();
  const voiceName = voiceSelect.value;
  const rate = Number(rateSelect.querySelector('input:checked').value.replace('x', ''));
  speakText(text, voiceName, rate);
});

 */
