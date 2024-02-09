import { create } from 'zustand';
import { Book } from './definitions';
import { User } from '@supabase/supabase-js';

interface Store {
  books: Book[],
  addBook: (book: Book) => void,
  removeBook: (book: Book) => void,
  removeAllBooks: () => void
}

interface UserStore {
  user?: User,
  setUser: (user: User) => void,
  removeUser: () => void,
}

export const useStore = create<Store>((set) => ({
  books: [],
  addBook: (book: Book) => set((state) => ({ books: [...state.books, book] })),
  removeBook: (book: Book) => set((state) => ({ books: state.books.filter((curr) => curr.id !== book.id)})),
  removeAllBooks: () => set({ books: [] }),
}))

export const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  setUser: (user: User) => set(() => ({ user: user })),
  removeUser: () => set(() => ({ user: undefined })),
}))