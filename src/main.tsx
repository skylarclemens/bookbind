import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import App from './App.tsx';
import './index.css'
import './variables.css'
import BookDetails from './pages/Book/index.tsx';
import { BookResult } from './components/Search/Search.tsx';
import Home from './pages/Home/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "book/:id",
        element: <BookDetails />,
        loader: async ({ params }) => {
          const baseUrl = "https://www.googleapis.com/books/v1/volumes";
          const apiKey = import.meta.env.VITE_GOOGLE_KEY;
          return fetch(`${baseUrl}/${params.id}?key=${apiKey}`)
            .then(res => res.json())
            .then(data => {
              const bookData: BookResult = data;
              return bookData;
          });
        }
    }]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
