const wordContainer = document.querySelector('.game__word-container');
const trackerContainer = document.querySelector('.game__trackers');
const inputContainer = document.querySelector('.game__input-container');
const input = document.querySelector('.game__input');
const resetBtn = document.querySelector('.game__button--reset');
const randomBtn = document.querySelector('.game__button--random');
const word = document.getElementById('word');
const attemptsEl = document.querySelectorAll('.game__trackers__tries__dot');

const mistakes = document.getElementById('mistakes');
const tries = document.getElementById('tries');

let selectedWord = '';
let selectedWordLetters = '';
let guessedLetters = [];
let isGameWon = false;
let isGameLost = false;
let attempts = 0;
let wrongLetters = '';

async function getRandomWord() {
  const api = 'https://random-word-api.vercel.app/api?words=1&length=6';

  try {
    const response = await fetch(api);
    const data = await response.json();
    return data[0].toLowerCase();
  } catch (error) {
    console.error('Error fetching random word:', error);
    throw error;
  }
}

function shuffleString(str) {
  let characters = str.split('');
  for (let i = characters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [characters[i], characters[j]] = [characters[j], characters[i]];
  }
  return characters.join('');
}

function createWordLetters() {
  inputContainer.innerHTML = '';
  selectedWordLetters.forEach(() => {
    const letterElement = document.createElement('input');
    letterElement.classList.add('game__input__letter');
    letterElement.maxLength = 1;
    inputContainer.appendChild(letterElement);
  });
}

function checkIfLettersMatch(letter, index) {
  // has to check if the letter is in the word and if the order is correct
  const lettersInput = document.querySelectorAll('.game__input__letter');
  const letterValue = letter.value.toLowerCase();
  if (letterValue === selectedWord[index]) {
    guessedLetters[index] = letterValue;
    console.log(guessedLetters);
    lettersInput[index].classList.add('correct');
  } else {
    guessedLetters[index] = letterValue;
    wrongLetters = [...wrongLetters, letterValue];
    mistakes.textContent = wrongLetters;
    lettersInput[index].classList.add('incorrect');

    if (attempts < 5) {
      attempts++;
      attemptsEl[attempts - 1].classList.add('filled');
    }
  }
}

function setupEventListeners() {
  const letterInputs = document.querySelectorAll('.game__input__letter');

  letterInputs.forEach((letter, index) => {
    letter.addEventListener('input', () => {
      limitInputToOneChar(letter);
      checkIfLettersMatch(letter, index);
      const nextInput = letterInputs[index + 1];
      tries.textContent = attempts;

      if (attempts == 5) {
        letter.disabled = true;
        inputContainer.classList.add('disabled');
      }
      if (nextInput) {
        nextInput.focus();
      }

      checkLetters(letterInputs);
    });

    letter.addEventListener('keyup', (e) => {
      if (e.key === 'Backspace' && letter.value.length === 0) {
        const prevInput = letterInputs[index - 1];
        letter.classList.remove('incorrect', 'correct');
        if (attempts == 5) {
          letter.disabled = true;
        }
        if (prevInput) {
          prevInput.classList.remove('incorrect', 'correct');
          prevInput.focus();
          prevInput.value = ''; // Clear the previous input
        }
      }
    });
  });
}

function limitInputToOneChar(letter) {
  if (letter.value.length > letter.maxLength) {
    letter.value = letter.value.slice(0, letter.maxLength);
  }
}

function checkLetters(letterInputs) {
  const inputString = Array.from(letterInputs)
    .map((input) => input.value)
    .join('');

  if (inputString === selectedWord) {
    console.log('Match found!');
    letterInputs.forEach((input) => (input.disabled = true));
    alert('You won!');
    // You can add your success logic here
  } else if (inputString.length === selectedWord.length) {
    console.log('No match. Try again.');
    // You can add your failure logic here
  }
}

async function initializeGame() {
  try {
    resetGame();
    selectedWord = await getRandomWord();
    word.textContent = shuffleString(selectedWord);
    selectedWordLetters = selectedWord.split('');
    createWordLetters();
    setupEventListeners();
  } catch (error) {
    console.error('Error initializing game:', error);
  }
}

async function resetGame() {
  const letterInputs = document.querySelectorAll('.game__input__letter');
  letterInputs.forEach((input) => {
    input.value = '';
    input.disabled = false;
    input.classList.remove('correct', 'incorrect');
  });
  attempts = 0;
  wrongLetters = '';
  mistakes.textContent = wrongLetters;
  tries.textContent = attempts;
  attemptsEl.forEach((element) => element.classList.remove('filled'));
  inputContainer.classList.remove('disabled');
  guessedLetters = [];
  isGameWon = false;
  isGameLost = false;
}

resetBtn.addEventListener('click', resetGame);
randomBtn.addEventListener('click', initializeGame);

// Initial game setup
document.addEventListener('DOMContentLoaded', initializeGame);
