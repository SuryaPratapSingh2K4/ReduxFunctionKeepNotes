import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import PostList from './pages/PostList';
import PostDetails from './pages/PostDetails';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Page Not Found</div>,
    children: [
      { path: '/', element: <Home /> },
      { path: '/posts', element: <PostList /> },
      { path: '/posts/:id', element: <PostDetails /> },
      { path: '/create', element: <CreatePost /> },
      { path: '/edit/:id', element: <EditPost /> },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);