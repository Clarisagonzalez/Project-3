import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import {Home} from './pages/Home';
import SingleProject from './pages/SingleProject';
import NotFound from './pages/NotFound';
import LoginForm from './pages/LoginForm';
import SignUp from './pages/Sign-Up';
import Projects from './pages/Projects';
import {Donation} from './pages/Donation';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true, 
        element: <Home />
      }, {
        path: '/login',
        element: <LoginForm />
      }, {
        path: '/signup',
        element: <SignUp />
      }, {
        path: '/donation',
        element: <Donation />
      }, {
        path: '/projects',
        element: <Projects />
      }, {
        path: '/projects/:id',
        element: <SingleProject />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
