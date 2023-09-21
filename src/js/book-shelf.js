import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const btnShopList = document.querySelector('.btn-shopping-list');
btnShopList.addEventListener('click', showShoppingList);

const bookShelf = document.querySelector('.book-shelf');
bookShelf.addEventListener('click', deleteBookFromLS);

const bookList = document.querySelector('.book-list');

const boxPagination = document.querySelector('#pagination');

let counterItem;
let perPage = 3;
let page = 1;
const options = {
  totalItems: Object.keys(localStorage).length,
  itemsPerPage: 3,
  visiblePages: 3,
  page: 1,
  centerAlign: true,
  usageStatistics: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};
const pagination = new Pagination(boxPagination, options);

function showShoppingList() {
  let arr = Object.keys(localStorage);
  if (arr.length === 0) {
    createShoppingListError();
  } else {
    createShoppingList();
  }
}

pagination.on('afterMove', createShoppingList);

function createShoppingList() {
  let arr = Object.keys(localStorage);
  pagination.setTotalItems(arr.length);
  options.totalItems = arr.length;
  if (Object.keys(localStorage).length < 3) {
    boxPagination.style.display = 'none';
  } else {
    boxPagination.style.display = 'block';
    //Знаходить індекс з якого елементу почати відображати книги в масиві
    let createItems = (pagination.getCurrentPage() - 1) * 3;
    //Отримує масив книг які потрібно відобразити на поточній сторінці (3 елемнти завжди)
    // createItems - індекс початку
    // createItems + 3 - індекс (плюс три елементи від початку)
    arr = arr.slice(createItems, createItems + 3);
  }
  bookList.innerHTML = '';
  const shopList = `
  <div class="shop-wrap">
    ${arr
      .map(key => {
        let item = JSON.parse(localStorage.getItem(key));
        return `
        <div id="${item.indx}" class="shop-card">
  <button id="${item.indx}" name="delete" class="shop-btn-delete" type="button">
  </button>
  <img class="shop-img" src="${item.img}" alt="${
          item.title
        }" onerror="this.style.visibility = 'hidden'"/>
  <div class="shop-info">
  <p aria - label="${item.title}" class="shop-title ">${item.title}</p>
  <p aria - label="${item.description}" class="shop-description">${
          item.description || 'Description commit impossible'
        }</p>
  <p aria - label="${item.author}" class="shop-author">${item.author}</p>
  <ul class="shop-resources">
  ${item.shops
    .map(({ name, url }) => {
      if (name === 'Amazon' || name === 'Apple Books' || name === 'Bookshop')
        return `
    <li class="shop" name="${name}">
      <a aria - label="${name}" href="${url}"
        ></a>
    </li>
    `;
    })
    .join('')}
  </ul>
  </div>
  </div>
  `;
      })
      .join('')}</div>`;

  bookList.insertAdjacentHTML('beforeend', shopList);
  //   arr = arr.slice(createItems, createItems + 3);

  //   let shopwrap = document.querySelector('.shop-wrap');
  //   shopwrap?.remove();
  // }
  // pagination.reset(lastPage);
  pagination.on('afterMove', event => {
    const currentPage = event.page;
    console.log(currentPage);
  });
}

function createShoppingListError() {
  bookList.innerHTML = '';
  const errorMessage = `
  <div class="error-wrap">
  <p class="error-text">This page is empty, add some books and proceed to order.</p>
  <svg class="icon-error"></svg>
  </div>
  `;
  bookList.insertAdjacentHTML('beforeend', errorMessage);
}
function deleteBookFromLS(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }
  evt.target.name === 'delete';
  let key = evt.target.id;
  localStorage.removeItem(key);

  let shopwrap = document.querySelector('.shop-wrap');
  shopwrap?.remove();

  pagination.reset(Object.keys(localStorage).length);
  showShoppingList();
}
