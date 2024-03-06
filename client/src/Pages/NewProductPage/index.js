import {
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    InputGroup,
    InputLeftAddon,
    Stack,
    StackDivider,
    Text,
    Textarea,
  } from '@chakra-ui/react'
  import { Dropzone } from '../../components/Dropzone'
import NavBar from '../../components/Navbar'
  
  export const NewProductPage = () => (
    <>
    <NavBar></NavBar>
    <Container
      py={{
        base: '4',
        md: '8',
      }}
    >
      <Stack spacing="5">
        <Stack
          spacing="4"
          direction={{
            base: 'column',
            sm: 'row',
          }}
          justify="space-between"
        >
          <Box>
            <Text fontSize="lg" fontWeight="medium">
              New Product
            </Text>
            <Text color="muted" fontSize="sm">
              Tell others who you are
            </Text>
          </Box>
          <Button variant="primary" alignSelf="start">
            Save
          </Button>
        </Stack>
        <Divider />
        <Stack spacing="5" divider={<StackDivider />}>
          <FormControl id="name">
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
              spacing={{
                base: '1.5',
                md: '8',
              }}
              justify="space-between"
            >
              <FormLabel variant="inline">Name</FormLabel>
              <Input
                maxW={{
                  md: '3xl',
                }}
                defaultValue="Christoph Winston"
              />
            </Stack>
          </FormControl>
          <FormControl id="email">
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
              spacing={{
                base: '1.5',
                md: '8',
              }}
              justify="space-between"
            >
              <FormLabel variant="inline">Email</FormLabel>
              <Input
                type="email"
                maxW={{
                  md: '3xl',
                }}
                defaultValue="chris@chakra-ui.com"
              />
            </Stack>
          </FormControl>
          <FormControl id="picture">
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
              spacing={{
                base: '1.5',
                md: '8',
              }}
              justify="space-between"
            >
              <FormLabel variant="inline">Photo</FormLabel>
              <Stack
                spacing={{
                  base: '3',
                  md: '5',
                }}
                direction={{
                  base: 'column',
                  sm: 'row',
                }}
                width="full"
                maxW={{
                  md: '3xl',
                }}
              >
                <Avatar size="lg" name="Christoph Winston" src="https://tinyurl.com/yhkm2ek8" />
                <Dropzone width="full" />
              </Stack>
            </Stack>
          </FormControl>
          <FormControl id="website">
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
              spacing={{
                base: '1.5',
                md: '8',
              }}
              justify="space-between"
            >
              <FormLabel variant="inline">Website</FormLabel>
              <InputGroup
                maxW={{
                  md: '3xl',
                }}
              >
                <InputLeftAddon>https://</InputLeftAddon>
                <Input defaultValue="www.chakra-ui.com" />
              </InputGroup>
            </Stack>
          </FormControl>
          <FormControl id="bio">
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
              spacing={{
                base: '1.5',
                md: '8',
              }}
              justify="space-between"
            >
              <Box>
                <FormLabel variant="inline">Bio</FormLabel>
                <FormHelperText mt="0" color="muted">
                  Write a short introduction about you
                </FormHelperText>
              </Box>
              <Textarea
                maxW={{
                  md: '3xl',
                }}
                rows={5}
                resize="none"
              />
            </Stack>
          </FormControl>
  
          <Flex direction="row-reverse">
            <Button variant="primary">Save</Button>
          </Flex>
        </Stack>
      </Stack>
    </Container>
    </>
  )
  export default NewProductPage