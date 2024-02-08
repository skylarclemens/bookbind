import { create } from 'zustand';
import { Book } from './definitions';

interface Store {
  books: Book[],
  addBook: (book: Book) => void,
  removeBook: (book: Book) => void,
  removeAllBooks: () => void
}

export const useStore = create<Store>((set) => ({
  books: [],
  addBook: (book: Book) => set((state) => ({ books: [...state.books, book] })),
  removeBook: (book: Book) => set((state) => ({ books: state.books.filter((curr) => curr.id !== book.id)})),
  removeAllBooks: () => set({ books: [] })
}))