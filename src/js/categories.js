import { getBooksCategory } from './axsios.js';
import { getSelectedCategory } from './render-category.js';

const select = document.querySelector('.categories');
select.addEventListener('click', getSelectedCategory);

creatListCategoryes();

export function creatListCategoryes() {
  getBooksCategory()
    .then(data => {
      let categories = [];
      categories = data;
      // creatListCategoryes(categories);
      const first = document.createElement('li');
      first.textContent = 'All categories';
      first.classList.add('first');
      select.prepend(first);

      for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        let item = document.createElement('li');
        item.textContent = `${category.list_name}`;
        item.setAttribute('name', `${category.list_name}`);
        item.classList.add('select-text');
        select.insertAdjacentElement('beforeend', item);
      }
    })
    .catch(err => console.log(err));
}
