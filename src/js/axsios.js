import axios from 'axios';
import { creatListCategoryes } from './helper.js';
// Request Top-books ===============================================
export async function getTopBooks() {
  const URL_BEST = 'https://books-backend.p.goit.global/books/top-books';

  try {
    const response = await axios.get(URL_BEST);
    const data = response.data;

    // console.log('Top books:', data);
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
}
// ===================================================================
// Request categories ================================================
export async function getBooksCategory() {
  try {
    const response = await axios.get(
      'https://books-backend.p.goit.global/books/category-list'
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}
// ====================================================================
