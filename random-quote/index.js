const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const tagsElement = document.getElementById('tags');
const newQuoteBtn = document.getElementById('new-quote');
const copyQuoteBtn = document.getElementById('copy-quote');

const API = 'https://api.quotable.io/random';

async function getQuote() {
  const response = await fetch(API);
  const data = await response.json();
  console.log(data);

  quoteElement.innerText = data.content;
  authorElement.innerText = data.author;

  data.tags.forEach((tag) => {
    const tagElement = document.createElement('span');
    tagElement.classList.add('tag');
    tagElement.innerText = tag;
    tagsElement.appendChild(tagElement);
  });
}

getQuote();

newQuoteBtn.addEventListener('click', getQuote);

copyQuoteBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(
    `"${quoteElement.innerText}" - ${authorElement.innerText}`
  );
});
