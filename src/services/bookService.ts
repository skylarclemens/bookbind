import { Book } from "../data/definitions";
import { supabase } from "../supabaseClient";

export const addBookToDb = async (book: Book, userId: string) => {
  const newBook = {
    title: book.title,
    subtitle: book.subtitle,
    authors: book.authors,
    publisher: book.publisher,
    published_date: book.publishedDate,
    categories: book.categories,
    isbn: book.isbn,
    images: book.images,
    page_count: book.pageCount,
    book_type: book.type,
    google_id: book.id,
  }

  const { data, error } = await supabase.from('books').upsert(newBook, {
    onConflict: 'google_id', ignoreDuplicates: false,
  }).select();

  if (error) {
    console.error(error);
    return;
  }

  addUserBook(data[0].id, userId);
}

const addUserBook = async (bookId: string, userId: string) => {
  const newUserBook = {
    book_id: bookId,
    user_id: userId
  }

  const { error } = await supabase.from('user_book').insert(newUserBook).select();

  if (error) {
    console.error(error);
    return;
  }
}

export const removeBookFromDb = async (bookId: string) => {
  try {
    const { error } = await supabase
      .from('user_book')
      .delete()
      .eq('book_id', bookId);
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
}