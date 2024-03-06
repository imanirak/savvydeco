import { Box, Button, Flex, Heading, HStack, Img, Stack, Text } from '@chakra-ui/react'
import { HiChevronRight } from 'react-icons/hi'
import heroImage from '../../images/couch_img_1.png';

export const Hero = () => {
  return (
    <Box bg="gray.800" as="section" minH="140px" position="relative">
      <Box py="32" position="relative" zIndex={1}>
        <Box
          maxW={{
            base: 'xl',
            md: '7xl',
          }}
          mx="auto"
          px={{
            base: '6',
            md: '8',
          }}
          color="white"
        >
          <Box maxW="xl">
            <Heading as="h1" size="3xl" fontWeight="extrabold">
            Your dream furniture,
 at your dream prices.            </Heading>
            <Text
              fontSize={{
                md: '2xl',
              }}
              mt="4"
              maxW="lg"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Text>
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
              mt="10"
              spacing="4"
            >
              <Button
                as="a"
                href="#"
                colorScheme="blue"
                px="8"
                rounded="full"
                size="lg"
                fontSize="md"
                fontWeight="bold"
              >
Shop Now              </Button>
              <HStack
                as="a"
                transition="background 0.2s"
                justify={{
                  base: 'center',
                  md: 'flex-start',
                }}
                href="#"
                color="white"
                rounded="full"
                fontWeight="bold"
                px="6"
                py="3"
                _hover={{
                  bg: 'whiteAlpha.300',
                }}
              >
                <span>List an item to sell</span>
                <HiChevronRight />
              </HStack>
            </Stack>
          </Box>
        </Box>
      </Box>
      <Flex
        id="image-wrapper"
        position="absolute"
        insetX="0"
        insetY="0"
        w="full"
        h="full"
        overflow="hidden"
        align="center"
      >
        <Box position="relative" w="full" h="full">
          <Img
            src={heroImage}
            alt="Main Image"
            w="full"
            h="full"
            objectFit="cover"
            objectPosition="top bottom"
            position="absolute"
          />
          {/* <Box position="absolute" w="full" h="full" bg="blackAlpha.600" /> */}
        </Box>
      </Flex>
    </Box>
  )
}

export default Hero