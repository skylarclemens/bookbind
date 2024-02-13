import { create } from 'zustand';
import { UserBook } from './definitions';
import { User } from '@supabase/supabase-js';

interface Store {
  books: UserBook[],
  initializeBooks: (books: UserBook[]) => void,
  addBook: (book: UserBook) => void,
  addBooks: (books: UserBook[]) => void,
  updateBook: (book: UserBook) => void,
  removeBook: (book: UserBook) => void,
  removeAllBooks: () => void
}

interface UserStore {
  user?: User,
  setUser: (user: User) => void,
  removeUser: () => void,
}

export const useStore = create<Store>((set) => ({
  books: [],
  initializeBooks: (books: UserBook[]) => set(() => ({ books: books })),
  addBook: (book: UserBook) => set((state) => ({ books: [...state.books, book] })),
  addBooks: (books: UserBook[]) => set((state) => ({ books: [...state.books, ...books]})),
  updateBook: (book: UserBook) => set((state) => ({ books: state.books.map((curr) => curr.id === book.id ? book : curr)})),
  removeBook: (book: UserBook) => set((state) => ({ books: state.books.filter((curr) => curr.book_id !== book.book_id)})),
  removeAllBooks: () => set({ books: [] }),
}))

export const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  setUser: (user: User) => set(() => ({ user: user })),
  removeUser: () => set(() => ({ user: undefined })),
}))