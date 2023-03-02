import { useState } from "react";
import {
  Box,
  Flex,
  Spacer,
  Image,
  Button,
  IconButton,
  Drawer,
  Link,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  
} from "@chakra-ui/react";

// import { CloseIcon,HamburgerIcon } from '@chakra-ui/icons'


const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile, setIsMobile] = useState(false);

  const toggleMobile = () => {
    setIsMobile(!isMobile);
  };

  return (
    <Box px="6" bg={'Savvybrown.0'}  >
      <Flex alignItems="center" py="3" >
        <Box>
          <Link to="/">
            <Image src="images/favicon.png" alt="Logo" boxSize="40px" objectFit="contain" />
          </Link>
        </Box>
        <Spacer />
        {isMobile ? (
          <>
            <IconButton
              aria-label="Toggle navigation"
              // icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              onClick={toggleMobile}
            />
            <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Navigation</DrawerHeader>
                <DrawerBody>
                  <Box>
                    <Link to="/">Home</Link>
                    <Button bg="black" color='white'>
                      Log In with Google
                    </Button>
                  </Box>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        ) : (
          <Box>
            <Link to="/">Home</Link>
            <Button ml="4" bg="black" color='white'>
              Log In with Google
            </Button>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default NavBar;