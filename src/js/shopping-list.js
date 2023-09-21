import { Value } from 'sass';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const btnShopList = document.querySelector('.btn-shopping-list');
btnShopList.addEventListener('click', showShoppingList);

const supUkr = document.querySelector('.support');
const select = document.querySelector('.categories');
const allCategories = document.querySelector('.render');

allCategories.addEventListener('click', deleteBookFromLS);
const shopWrap = document.querySelector('.shop-wrap');
// shopWrap.addEventListener('click', deleteBookFromLS);

const boxPagination = document.querySelector('#pagination');

let counterItem = Object.keys(localStorage).length;
let perPage = 3;

const options = {
  totalItems: counterItem,
  itemsPerPage: perPage,
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
pagination.on('afterMove', onShowPageShopping);

function showShoppingList(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }
  let arr = Object.keys(localStorage);
  if (arr == []) {
    createShoppingListError();
  }
  if (
    evt.target.name === 'shopping-list' &&
    allCategories.clientWidth >= 1036
  ) {
    select.style.display = 'none';
    supUkr.style.display = 'block';
  } else {
    select.style.display = 'none';
    supUkr.style.display = 'none';
  }
  onShowPageShopping();
}

function createShoppingList(arr) {
  if (counterItem < 3) {
    boxPagination.style.display = 'none';
  } else {
    boxPagination.style.display = 'block';
  }

  allCategories.innerHTML = '';

  const shopList = `<h1 class="title-category">Shopping <span class="last-word">List</span></h1>
  <div class="shop-wrap">
    ${arr
      .map(key => {
        let item = JSON.parse(localStorage.getItem(key));
        return `
        <div class="shop-card">
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

  allCategories.insertAdjacentHTML('beforeend', shopList);
}

function createShoppingListError() {
  const errorMessage = `<h1 class="title-category">Shopping <span class="last-word">List</span></h1>
  <div class="error-wrap">
  <p class="error-text">This page is empty, add some books and proceed to order.</p>
  <svg class="icon-error"></svg>
  </div>
  `;
  allCategories.insertAdjacentHTML('beforeend', errorMessage);
}

function deleteBookFromLS(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }
  let getKey = [];
  evt.target.name === 'delete';
  console.log('evt', evt);
  let key = evt.target.indx;
  console.log(key);
}

function onShowPageShopping() {
  let arr = Object.keys(localStorage);
  console.log('arr', arr);
  if (arr.length >= 3) {
    let createItems = (pagination.getCurrentPage() - 1) * 3;
    createShoppingList(arr.slice(createItems, createItems + 3));
  } else {
    createShoppingList(arr);
  }
}

// =================================================================

pagination.on('afterMove', createShoppingList);

function createShoppingList() {
  let arr = Object.keys(localStorage);
  if (Object.keys(localStorage).length < 3) {
    boxPagination.style.display = 'none';
  } else {
    boxPagination.style.display = 'block';
    let createItems = (pagination.getCurrentPage() - 1) * 3;
    arr = arr.slice(createItems, createItems + 3);

    let shopwrap = document.querySelector('.shop-wrap');
    shopwrap?.remove();
  }

  // pagination.setTotalItems(arr.length);
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
  createShoppingList();
}
