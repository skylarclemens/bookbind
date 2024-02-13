import { Book, UserBook } from "../data/definitions";
import { supabase } from "../supabaseClient";

export const addBookToDb = async (book: Book, userId: string, status: string) => {
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

  try {
    const { data, error } = await supabase.from('books').upsert(newBook, {
      onConflict: 'google_id', ignoreDuplicates: false,
    }).select();

    if (error) throw error;

    return addUserBook(data[0].id, userId, status);
  } catch (error) {
    console.error(error);
  }
}

const addUserBook = async (bookId: string, userId: string, status: string) => {
  const newUserBook = {
    book_id: bookId,
    user_id: userId,
    status: status
  }

  const { data, error } = await supabase.from('user_book')
    .insert(newUserBook)
    .select('*, book: books(*)');

  if (error) {
    console.error(error);
    return;
  }

  if (data) return data[0];
}

export const updateBookStatusDb = async (userBook: UserBook, status: string) => {
  try {
    const { data, error } = await supabase
      .from('user_book')
      .update({ status: status })
      .eq('id', userBook.id)
      .select('*, book: books(*)');
    if (error) throw error;
    if (data) return data[0];
  } catch (error) {
    console.error(error);
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

export const getUsersBooksData = async () => {
    const { data, error } = await supabase.from('user_book')
      .select('*, book: books(*)');

    if (error) {
      console.error(error);
      return;
    }

    return data;
}