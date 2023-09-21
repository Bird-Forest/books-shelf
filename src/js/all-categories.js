import axios, { all } from 'axios';
import { getTopBooks } from './axsios';
import { createCategory } from './render-category.js';

// const bookShelf = document.querySelector('.book-shelf');
// bookShelf.style.display = 'none';

const allCategories = document.querySelector('.render');
allCategories.addEventListener('click', showCategory);

export function getTopBooksPage() {
  getTopBooks()
    .then(data => {
      console.log(data);
      createAllCategories(data);
    })
    .catch(err => console.log(err));
}

function createAllCategories(data) {
  allCategories.innerHTML = '';
  const markupAll = `<div>
  <h1 class="title-category">Best Sellers <span class="last-word">Books</span></h1>
  ${data
    .map(({ books, list_name }) => {
      return `
      <h2 class="caption"> ${list_name} </h2>
      <ul class="wrap limit">${books
        .map(({ list_name, book_image, title, author, _id }) => {
          return `
          <li class='list book-card' id = "${_id}" data-book="book-box">
          <div id = "${_id}" class='book-img'>
          <img id = "${_id}" aria - label="${list_name}" src="${book_image}" alt="${title}" loading="lazy" class="cover" onerror="this.style.visibility = 'hidden'"/>
          <p id = "${_id}" class='quick-view'>quick view</p>
          </div>
          <div id = "${_id}" class="book-info">
          <p id = "${_id}" aria - label="${title}" class="title">${title}</p>
          <p id = "${_id}" aria - label="${author}" class="author">${author}</p>
          </div>
          </li>`;
        })
        .join('')}
      </ul>
      <button class="btn-category" type="button" name="${list_name}">see more</button>`;
    })
    .join('')}</div>`;

  allCategories.insertAdjacentHTML('beforeend', markupAll);
}

export async function showCategory(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }
  console.dir(evt.target.name);
  let selectedCategory = evt.target.name;
  console.log(selectedCategory);

  try {
    const response = await axios.get(
      `https://books-backend.p.goit.global/books/category?category=${selectedCategory}`
    );
    const data = response.data;
    console.log(data);
    let arr = data;
    console.log(arr);

    createCategory(selectedCategory, arr);
  } catch (error) {
    console.error(error);
  }
}
