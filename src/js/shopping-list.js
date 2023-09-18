const btnShopList = document.querySelector('.btn-shopping-list');
btnShopList.addEventListener('click', showShoppingList);
const navigation = document.querySelector('.navigation');

const allCategories = document.querySelector('.render');

function showShoppingList() {
  allCategories.innerHTML = '';
  navigation.style.display = 'none';

  let arr = Object.keys(localStorage);

  const shopList = `<h1 class="title-category">Shopping <span class="last-word">List</span></h1>
  <div class="shop-wrap">
    ${arr
      .map(key => {
        let item = JSON.parse(localStorage.getItem(key));
        return `
        <div class="shop-card">
  <button name="delete" class="shop-btn-delete" type="button">
  <svg class="icon-trash"></svg>
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
