import {Profiler, React,useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import ProductPage from './Pages/ProductPage'
import NewProductPage from './Pages/NewProductPage';

// import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient() // Instance of QueryClient



function App() {

  return (<>
      <QueryClientProvider client={queryClient}>

  <BrowserRouter>
      <Routes>
        <Route exact path='/' element ={<Home/>}/>
        <Route exact path='/profile' element ={<Profile/>}/>
        <Route exact path='/product_id' element ={<ProductPage/>}/>
        <Route exact path='/new_product' element ={<NewProductPage/>}/>

      </Routes>
  </BrowserRouter>
  </QueryClientProvider>
  </>
  );
}

export default App;
