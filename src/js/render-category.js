import axios from 'axios';
import { getTopBooksPage } from './all-categories';

const allCategories = document.querySelector('.render');
const select = document.querySelector('.categories');
console.log(select);
select.addEventListener('click', getSelectedCategory);

getTopBooksPage();

export async function getSelectedCategory(evt) {
  if (evt.target.nodeName !== 'LI') {
    return;
  }
  let selectedCategory = evt.target.textContent;
  console.log(selectedCategory);
  changeColor(selectedCategory);

  try {
    const response = await axios.get(
      `https://books-backend.p.goit.global/books/category?category=${selectedCategory}`
    );
    const data = response.data;
    let arr = data;

    if (selectedCategory == 'All categories') {
      select.firstChild.style.color = '#4F2EE8';
      select.firstChild.style.textTransform = 'uppercase';
      getTopBooksPage();
    } else if (selectedCategory !== 'All categories') {
      createCategory(selectedCategory, arr);
    } else if (arr == []) {
      errorMessage();
    }
  } catch (error) {
    console.error(error);
  }
}

function changeColor(selectedCategory) {
  select.firstChild.style.color = '#111111';
  select.firstChild.style.textTransform = 'none';

  for (var i = 0; i < select.children.length; i++) {
    if (select.children[i].textContent == selectedCategory) {
      select.children[i].style.color = '#4F2EE8';
      select.children[i].style.textTransform = 'uppercase';
      select.children[i].style.fontWeight = 700;
    } else {
      select.children[i].style.color = '#111111';
      select.children[i].style.textTransform = 'none';
      select.children[i].style.fontWeight = 400;
    }
  }
}

export function createCategory(selectedCategory, arr) {
  allCategories.innerHTML = '';
  let lastWord = selectedCategory.split(' ').pop();
  let newText = selectedCategory.replace(
    lastWord,
    "<span class='last-word'>" + lastWord + '</span>'
  );
  const markup = `
  <ul class="wrap">
  <h1 class="title-category">${newText}</h1>${arr
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
  </ul>`;

  allCategories.insertAdjacentHTML('beforeend', markup);
}

function errorMessage() {
  const err = document.createElement('h2');
  err.classList.add('err-title');
  err.textContent =
    'Sorry, there are no books matching your search query. Please try again.';
  allCategories.insertAdjacentElement('beforeend', err);
  err.style.display = 'block';
}
