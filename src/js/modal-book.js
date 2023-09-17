import axios from 'axios';
import { getInfoBook } from './axsios.js';
// import { saveLS } from './helper.js';

const backdrop = document.querySelector('.backdrop');
console.dir(backdrop);
// const popWrap = document.querySelector('.pop-wrap');
backdrop.addEventListener('click', closeModalBook);
backdrop.addEventListener('click', addBookLocalStorage);

const allCategories = document.querySelector('.render');
allCategories.addEventListener('click', showPopUp);
// allCategories.addEventListener('click', addBookLocalStorage);

export let optedBook;

async function showPopUp(evt) {
  if (evt.target.nodeName !== 'P') {
    return;
  }
  backdrop.classList.remove('is-hidden');
  optedBook = evt.target.id;
  console.log(optedBook);

  try {
    let book = await getInfoBook();
    createPopUp(book);
  } catch (error) {
    console.error(error);
  }
}

async function addBookLocalStorage(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }
  if (evt.target.name === 'add') {
    let book = await getInfoBook();
    let key = optedBook;
    let value = JSON.stringify(book);
    document.querySelector('.pop-btn-add').textContent =
      'added to the shopping list';
    localStorage.setItem(key, value);
  }
}

function closeModalBook(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }
  console.dir(evt.target.name);
  if (evt.target.name === 'close') {
    backdrop.classList.add('is-hidden');
  }
}

function createPopUp({ author, img, shops, description, title, indx }) {
  let shopping = [];
  const stock = shops.map(({ name, url }) => {
    if (name === 'Amazon' || name === 'Apple Books' || name === 'Bookshop')
      shopping.push({ name, url });
    return shopping;
  });
  backdrop.innerHTML = '';
  layout = `
    <div class="pop-wrap">
    <button name="close" class="pop-btn-close" type="button">
        </button>
  <img class="pop-img" src="${img}" alt="${title}" onerror="this.style.visibility = 'hidden'"/>
  <div class="pop-info">
  <p aria - label="${title}" class="pop-title">${title}</p>
  <p aria - label="${author}" class="author">${author}</p>
  <p aria - label="${description}" class="pop-depiction">${
    description || 'Description commit impossible'
  }</p>
  <ul class="pop-resources">${shopping
    .map(({ name, url }) => {
      return `
    <li name="${name}">
      <a aria - label="${name}" href="${url}"
        ></a>
    </li>
    `;
    })
    .join('')}
  </ul>
  </div>
  <button name="add" class="pop-btn-add" type="submit">add to shopping list</button>
  </div>
  `;
  backdrop.insertAdjacentHTML('beforeend', layout);
}
