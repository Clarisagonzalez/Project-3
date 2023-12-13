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
import MyDonations from './pages/MyDonations.jsx';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import SingleUser from './pages/SingleUser';
import UpdateUser from './pages/UpdateUser';
import CreateProject from './pages/CreateProject';
import Comments from './pages/CommentsPerProject';
import Donate from './pages/Donate';
import AboutUs from './components/AboutUs.jsx';
import HowToDonate from './components/HowToDonate.jsx';
import HowToCampaign from './components/HowToCampaign.jsx';
import MyComments from './pages/MyComments.jsx';

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
        path: '/users/:id',
        element: <SingleUser />
      },{
        path: '/update',
        element: <UpdateUser />
      },{
        path: '/create_project',
        element: <CreateProject />
      },{
        path: '/donations',
        element: <MyDonations />
      },{
        path: '/:id/comments',
        element: <Comments />
      },{
        path: '/donate',
        element: <Donate />
      },{
        path: '/about',
        element: <AboutUs />
      },{
        path: '/howtodonate',
        element: <HowToDonate />
      },{
        path: '/howtocampaign',
        element: <HowToCampaign/>
      },{
        path: '/comments',
        element: <MyComments />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
