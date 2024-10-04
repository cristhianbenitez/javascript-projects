const inputField = document.getElementById('input');
const form = document.querySelector('form');
const voiceSelect = document.querySelector('#voice-select');
const languageSelect = document.querySelector('#language-select');
const rateSelect = document.querySelector('#rate-select');
const nameInput = document.querySelector('#name');

const synth = window.speechSynthesis || window.webkitSpeechSynthesis;
const defaultLanguage = 'en-US';
const defaultName = 'Albert';

let voices = [];
let selectedLanguage = localStorage.getItem('language') || defaultLanguage;
let selectedVoice = localStorage.getItem('voice') || defaultName;
let selectedRate = localStorage.getItem('rate') || '0.5x';

let languages = [];
synth.onvoiceschanged = () => {
  voices = synth.getVoices().filter((voice) => voice.lang === selectedLanguage);
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
  languageSelect.value = selectedLanguage;
  voiceSelect.value = selectedVoice;
  rateSelect.querySelector(`input[value="${selectedRate}"]`).checked = true;
  nameInput.value = selectedVoice;
  console.log(voices);
  languageSelect.dispatchEvent(new Event('change'));
};

languageSelect.addEventListener('change', (e) => {
  const lang = e.target.value;
  selectedLanguage = lang;
  localStorage.setItem('language', lang);
  voiceSelect.innerHTML = '';
  languages
    .find(([l]) => l === lang)[1]
    .forEach((voice) => {
      const option = document.createElement('option');
      option.textContent = voice.name;
      option.value = voice.name;
      voiceSelect.appendChild(option);
    });
  voiceSelect.value = selectedVoice;
});

// Add options for rate selection
const rates = [0.5, 0.75, 1, 1.5];
rates.forEach((rate) => {
  const label = document.createElement('label');
  const input = document.createElement('input');
  input.type = 'radio';
  input.name = 'speed';
  input.value = `${rate}x`;
  input.checked = rate === Number(selectedRate.replace('x', ''));
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
  const voiceName = nameInput.value || defaultName;
  const rate = Number(rateSelect.querySelector('input:checked').value.replace('x', ''));
  selectedVoice = voiceName;
  selectedRate = `${rate}x`;
  localStorage.setItem('voice', selectedVoice);
  localStorage.setItem('rate', selectedRate);
  speakText(text, voiceName, rate);
});
