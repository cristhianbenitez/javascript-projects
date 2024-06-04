const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const tagsElement = document.getElementById('tags');
const newQuoteBtn = document.getElementById('new-quote');
const copyQuoteBtn = document.getElementById('copy-quote');

const API = 'https://api.api-ninjas.com/v1/quotes';

const API_KEY = 'dP++w4B++e0bdAMTTatTow==GvcYjdeWcZIoAHWs';

const addTags = (tags) => {
  while (tagsElement.firstChild) {
    tagsElement.removeChild(tagsElement.firstChild);
  }
  tags.forEach((tag) => {
    const tagElement = document.createElement('span');
    tagElement.classList.add('tag');
    tagElement.innerText = tag;
    tagsElement.appendChild(tagElement);
  });
};

async function getQuote() {
  const response = await fetch(API, {
    headers: {
      'X-Api-Key': API_KEY
    }
  });
  const data = await response.json();
  console.log(data);

  quoteElement.innerText = `“${data[0].quote}”`;
  authorElement.innerText = data[0].author;

  addTags([data[0].category]);
}

getQuote();

newQuoteBtn.addEventListener('click', getQuote);

copyQuoteBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(
    `"${quoteElement.innerText}" - ${authorElement.innerText}`
  );
});
