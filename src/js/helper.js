export function saveLS(value) {
  try {
    const valueLS = {
      author: value.author,
      img: value.img,
      shops: value.shops,
      description: value.description,
      title: value.title,
      indx: value.indx,
    };
    let key = valueLS.indx;
    localStorage.setItem(key, JSON.stringify(valueLS));
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

export function loadLS(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

// export function saveLS(key, value) {
//   try {
//     const serializedState = JSON.stringify(value);
//     localStorage.setItem(key, serializedState);
//   } catch (error) {
//     console.error('Set state error: ', error.message);
//   }
// }

// export default {
//   save,
//   load,
// };
