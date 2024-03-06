import { Box, Flex, Text, Heading,Button, Image, Grid, GridItem } from '@chakra-ui/react'
import {React,useEffect,useState} from 'react'
import Navbar from '../../components/Navbar'
import ProductCard from '../../components/ProductCard'
import ProductGrid from '../../components/ProductGrid'
import { getAllProducts } from '../../api/products.service';
import heroImage from '../../images/Heroimage.png';
import axios from 'axios'
import Hero from '../../components/Hero'
import { request, gql } from "graphql-request";
import { useQuery } from "react-query";

const endpoint = "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clf8qr9qd0amx01ur7qrmdk26/master";

const QUERY = gql `{
  products {
    name
    id
    price
    images {
      productImages {
        images {
          url
        }
      }
    }
  }
}`


const Home = () => {
  
  const { data, isLoading, error } = useQuery("launches", () => {
    return request(endpoint, QUERY);
  });
  
  if (isLoading) return "Loading...";
  if (error) return <pre>{error.message}</pre>
  // useEffect(()=>{console.log("here are data: ",data)},[data])

  return (
    <>
    {/* NAVBAR */}

    <Navbar ></Navbar>

    {/* HERO */}
    <Hero></Hero>
    {/* PRODUCT GRID */}
    <ProductGrid products={data.products}></ProductGrid>
    {/* <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      gap={6}
      px={{ base: "4", md: "6", lg: "8" }}
      bg={'Savvybrown.0'}>
      {products.map((product,index)=>{
        return <GridItem>
                <ProductCard product={product} key={index}></ProductCard>
              </GridItem>
      })}
    </Grid> */}
    {/* PRODUCT GRID */}
    
    </>
  )
}

export default Home