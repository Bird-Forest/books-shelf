export const layoutCards = `<li class='list book-card' id="${_id}" data-book="book-box">
    <div id="${_id}" class='book-img'>
    <img id="${_id}" aria - label="${list_name}" src="${book_image}" alt="${title}" loading="lazy" class="cover" onerror="this.style.visibility = 'hidden'"/>
    <p id="${_id}" class='quick-view'>quick view</p>
    </div>
    <div id="${_id}" class="book-info">
    <p id="${_id}" aria - label="${title}" class="title">${title}</p>
    <p id="${_id}" aria - label="${author}" class="author">${author}</p>
    </div >
    </li >`;

// export function layoutCards(arr) {
//   return arr
//     .map(({ list_name, book_image, title, author, _id }) => {
//       `<li class='list book-card' id="${_id}" data-book="book-box">
//     <div id="${_id}" class='book-img'>
//     <img id="${_id}" aria - label="${list_name}" src="${book_image}" alt="${title}" loading="lazy" class="cover" onerror="this.style.visibility = 'hidden'"/>
//     <p id="${_id}" class='quick-view'>quick view</p>
//     </div>
//     <div id="${_id}" class="book-info">
//     <p id="${_id}" aria - label="${title}" class="title">${title}</p>
//     <p id="${_id}" aria - label="${author}" class="author">${author}</p>
//     </div >
//     </li >`;
//     })
//     .join('');
// }

// `< li class='list book-card' id = "${_id}" data - book="book-box" >
//     <div id = "${_id}" class='book-img'>
//     <img id = "${_id}" aria - label="${list_name}" src="${book_image}" alt="${title}" loading="lazy" class="cover" onerror="this.style.visibility = 'hidden'"/>
//     <p id = "${_id}" class='quick-view'>quick view</p>
//     </div>
//     <div id = "${_id}" class="book-info">
//     <p id = "${_id}" aria - label="${title}" class="title">${title}</p>
//     <p id = "${_id}" aria - label="${author}" class="author">${author}</p>
//     </div>
//     </>`;

// const obj = { list_name, book_image, title, author, _id };

// export function creatCategory(selectedCategory, arr) {
//   let text = selectedCategory;
//   let lastWord = text.split(' ').pop();
//   let newText = text.replace(
//     lastWord,
//     "<span class='last-word'>" + lastWord + '</span>'
//   );
//   const layouCategory = `<h1 class="title-category">${newText}</h1><ul class="wrap">${arr
//     .map(({ list_name, book_image, title, author, _id }) => {
//       return layoutCard;
//     })
//     .join('')}
//   </ul>`;
//   allCategories.insertAdjacentHTML('beforeend', layouCategory);
// }
