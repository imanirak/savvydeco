import { Box, Flex, Text, Heading,Button, Image, Grid, GridItem } from '@chakra-ui/react'
import {React,useEffect,useState} from 'react'
import Navbar from '../../components/Navbar'
import ProductCard from '../../components/ProductCard'
const Home = () => {

  const [products,setProducts] = useState([])

  useEffect(()=>{
    const getData = async ()=>{
      const data = await fetch('https://fakestoreapi.com/products/')
      setProducts(await data.json())
    }
    getData()
  },[])

  useEffect(()=>{console.log(products)},[products])
  return (
    <>
    {/* NAVBAR */}
    <Box color={'black'}>

    <Navbar ></Navbar>

    {/* HERO SECTION */}
    <Flex bg={'Savvybrown.0'}>
      <Box  w={{ base: "100%", md: "50%" }}  p={200}>
        <Heading as="h1" size="2xl" mb="4">
        High-end decor at accessible prices
        </Heading>
        <Text fontSize="xl" mb="6">
        The pain itself is love, the main storage system. It is not until the hunger of any one can pull the boxes.

</Text>
        <Button bg="black" color='white' size="lg">
          Learn more
        </Button>
      </Box>
      <Box w={{ base: "100%", md: "50%" }} p={16}>
        <Image
          src='images/Hero image.png' 
          boxSize='m'
          alt="hero image"
          objectFit="cover"
        
        />
      </Box>
    </Flex>

    {/* PRODUCT GRID */}
    <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      gap={6}
      px={{ base: "4", md: "6", lg: "8" }}
      bg={'Savvybrown.0'}>
      {products.map((product,index)=>{
        return <GridItem>
                <ProductCard product={product} key={index}></ProductCard>
              </GridItem>
      })}
    </Grid>
    </Box>
    </>
  )
}

export default Home