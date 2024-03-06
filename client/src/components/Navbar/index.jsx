import { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
  Link,
  useDisclosure,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue

} from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import { FiPackage } from 'react-icons/fi'
import { Logo } from '../../components/Logo'
// import { Cart } from "../../components/Cart";
import React from "react";
import { CartItem } from '../../components/CartItem'
  import { cartData } from './_data'

export const NavBar = () => {
  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <Box
      as="section"
    >
      <Box as="nav" bg="bg-surface" boxShadow="sm">
        <Container
          py={{
            base: '4',
            lg: '5',
          }}
          maxW={'100vw'}
        >
      <Drawer

        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
  
  size="md"
  /*`trapFocus` and `blockScrollOnMount` are only switched off so that the preview works properly. */ 
  blockScrollOnMount={
    false
  }
  trapFocus={false}
>
  <DrawerOverlay />
  <DrawerContent bg={useColorModeValue('white', 'gray.800')} overflowY="auto">
    <DrawerCloseButton
      size="lg"
      right={{
        base: '4',
        md: '8',
      }}
      top="4"
      bg="inherit"
      onClick={onClose}
    />
    <Stack
      padding={{
        base: '6',
        md: '10',
      }}
      height="full"
      spacing="8"
      overflowY="auto"
    >
      <Heading size="md">Shopping Cart ({cartData.length} items)</Heading>
      <Stack
        spacing={{
          base: '8',
          md: '10',
        }}
      >
        {cartData.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </Stack>
    </Stack>
    <Stack
      borderTopWidth="1px"
      px={{
        base: '6',
        md: '10',
      }}
      py="4"
      spacing="5"
    >
      <Stack>
        <HStack fontSize="xl" fontWeight="semibold">
          <Text flex="1">Subtotal:</Text>
          <Text>£597.00</Text>
        </HStack>
        <HStack spacing="2" color={useColorModeValue('gray.600', 'gray.400')}>
          <Icon as={FiPackage} />
          <Text>Shipping + taxes calculated at checkout</Text>
        </HStack>
      </Stack>
      <Button colorScheme="blue" size="lg" fontSize="md">
        Checkout
      </Button>
    </Stack>
  </DrawerContent>
</Drawer>
        
      
          <HStack spacing="10" justify="space-between">
            <Link href='/'>
            <Logo />
            </Link>
            {isDesktop ? (
              <Flex justify="space-between" flex="1">
                <ButtonGroup variant="link" spacing="8">
                  <Button variant='link' spacing='8'>
                    <Link href='/new_product'>New Product Page</Link>
                  </Button>
                  <Button variant='link' spacing='8'>
                    <Link href='/product_id'> Product ID Page</Link>
                  </Button>
                </ButtonGroup>
                <HStack spacing="3">
                  <Button 
                  variant="primary"
                  ref={btnRef}
                  onClick={onOpen}
                  >Cart</Button>
                </HStack>
              </Flex>
            ) : (
              <IconButton
                variant="ghost"
                icon={<FiMenu fontSize="1.25rem" />}
                aria-label="Open Menu"
                  ref={btnRef}
                  onClick={onOpen}
              />
            )}
          </HStack>
        </Container>
      </Box>
    </Box>
  )
}

export default NavBar;