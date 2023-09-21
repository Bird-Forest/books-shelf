const btnShopList = document.querySelector('.btn-shopping-list');
btnShopList.addEventListener('click', onShoppingList);

const btnHome = document.querySelector('.btn-home');
btnHome.addEventListener('click', onCategories);

const supUkr = document.querySelector('.support');
const select = document.querySelector('.categories');
const allCategories = document.querySelector('.render');
const bookShelf = document.querySelector('.book-shelf');

function onShoppingList(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }
  bookShelf.classList.remove('is-hidden');
  console.log(evt.target.name);
  console.dir(bookShelf);
  if (evt.target.name === 'shopping-list' && bookShelf.scrollWidth >= 996) {
    // bookShelf.style.display = 'block';
    // supUkr.classList.remove('is-hidden');
    supUkr.style.display = 'block';
    select.style.display = 'none';
    allCategories.style.display = 'none';
  } else {
    supUkr.style.display = 'none';
    select.style.display = 'none';
    allCategories.style.display = 'none';
  }
}
function onCategories(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }
  if (evt.target.name === 'home') {
    console.log(evt.target.name);
    supUkr.style.display = 'block';
    select.style.display = 'block';
    allCategories.style.display = 'block';

    // bookShelf.style.display = 'none';
    bookShelf.classList.add('is-hidden');
  }
}
