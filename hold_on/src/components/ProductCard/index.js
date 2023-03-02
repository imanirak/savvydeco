import React from 'react'

import { Card, CardFooter,Button,Divider,ButtonGroup,Heading,CardBody, Image, Text, Stack } from "@chakra-ui/react";

const ProductCard = ({ product }) => {
  // const { name, image, price, rating, numReviews } = product;

  return (
    <Card maxW='sm' boxShadow='none' bg={'Savvybrown.0'} color={'black'}>
          <CardBody border={'none'} >
            <Image
              src={product.image} boxSize='sm'objectFit={'contain'} bg={'Savvybrown.0'}
            />
            <Stack mt='6' spacing='3'>
              <Heading size='md' maxW="300px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" >{product.title}</Heading>
              <Text maxW="300px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                {product.description}
              </Text>
              <Text color='black' fontSize='2xl'>
                ${product.price}
              </Text>
            </Stack>
          </CardBody>
          
          <CardFooter>
            <ButtonGroup spacing='2'>
              <Button variant='ghost' border={'1px solid black'} color='black'>
                Add to cart
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
  );
};

export default ProductCard;
