import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import SingleProject from './pages/SingleProject';
import NotFound from './pages/NotFound';
import LoginForm from './pages/LoginForm';
import SignUp from './pages/Sign-Up';
import Projects from './pages/Projects';
import Donations from './pages/Donations';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import SingleUser from './pages/SingleUser';
import UpdateUser from './pages/UpdateUser';
import CreateProject from './pages/CreateProject';
import Comments from './pages/CommentsPerProject';
import Donate from './pages/Donate';

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
      },{
        path: '/projects',
        element: <Projects />
      }, {
        path: '/projects/:id',
        element: <SingleProject />
      }, {
        path: '/dashboard',
        element: <Dashboard />
      },{
        path: '/users',
        element: <Users />
      },{
        path: '/users/:userId',
        element: <SingleUser />
      },{
        path: '/update',
        element: <UpdateUser />
      },{
        path: '/create_project',
        element: <CreateProject />
      },{
        path: '/donations',
        element: <Donations />
      },{
        path: '/:id/comments',
        element: <Comments />
      },{
        path: '/:id/donate',
        element: <Donate />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
