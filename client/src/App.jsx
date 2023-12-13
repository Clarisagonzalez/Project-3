import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink,} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import  NavBar  from './components/Nav';
import Footer from './components/Footer';
import Header from './components/Header';


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
      <Outlet/>
       <Footer />
    </ApolloProvider>
  );
}

export default App;
