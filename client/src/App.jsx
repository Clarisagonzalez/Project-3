import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Routes, Route } from 'react-router-dom'; 
import { ApolloClient, InMemoryCache, createHttpLink,} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import 'bootstrap/dist/css/bootstrap.min.css';
import  NavBar  from './components/Nav';
import Footer from './components/Footer';
import Header from './components/Header';
import AboutUs from './components/AboutUs';
import {Home} from './pages/Home';
import LoginForm from './pages/LoginForm';
import SignUp from './pages/Sign-Up';
import Projects from './pages/Projects';
import {Donation} from './pages/Donation';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import SingleUser from './pages/SingleUser';



const httpLink = createHttpLink({
   uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
       <Header />
       <NavBar />
       <Routes>
         <Route path="/about" element={<AboutUs />} />
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<LoginForm />} />
         <Route path="/signup" element={<SignUp />} />
         <Route path="/donation" element={<Donation />} />
         <Route path="/projects" element={<Projects />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/users/:userId" element={<SingleUser />} />
         <Route path="/users" element={<Users />} />

       </Routes>
       <Footer />
    </ApolloProvider>
  );
}

export default App;
