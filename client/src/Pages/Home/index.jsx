import { Box, Flex, Text, Heading,Button, Image, Grid, GridItem } from '@chakra-ui/react'
import {React,useEffect,useState} from 'react'
import Navbar from '../../components/Navbar'
import ProductCard from '../../components/ProductCard'
import { getAllProducts } from '../../api/products.service';
import heroImage from '../../images/Heroimage.png';
import axios from 'axios'




const Home = () => {

  const [products,setProducts] = useState([])
  // const fetchProducts = 
  
  // async (err)=>{
  //   if (err){
  //     console.log("AAXIOS ERROR: ",err)
  //   }

  //   else{
  //     await axios.get("http://localhost:4000/api")
  //     .then((res)=>{
  //       console.log(res.data)
  //     })
  //   }
  // }
  // useEffect(()=>fetchProducts(),[])

   useEffect(() => { async function fetchMyAPI (){
      
        try {
          const allProducts = await axios.get('/api');
          console.log(allProducts)
          setProducts(allProducts.data.products)
        } catch (error) {
          console.log(error)
        }  
    }
    fetchMyAPI()
  },[])

  useEffect(()=>{console.log("here are products: ",products)},[products])
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
          src={heroImage}
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