import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { BiMenu } from "react-icons/bi";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <Box
      w={"100%"}
      h="80px"
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      border={"1px solid red"}
      px="30px"
    >
      {/* For Desktop */}
      <HStack
        gap="20px"
        display={{ base: "none", sm: "none", md: "none", lg: "flex" }}
      >
        <Text fontSize={"20px"} fontWeight={"bold"}>
          BMI Calculator
        </Text>
        <Button color="#FFFFFF" bg="#4299e1">
          Previous BMI's
        </Button>
      </HStack>
      <HStack
        gap="20px"
        display={{ base: "none", sm: "none", md: "none", lg: "flex" }}
      >
        <Button color="#FFFFFF" bg="#4299e1">
          Login
        </Button>
        <Button color="#FFFFFF" bg="#ed64a6">
          Register
        </Button>
      </HStack>

      {/* For Mobile And Tablet */}
      <Text
        fontSize={"20px"}
        fontWeight={"bold"}
        display={{ base: "block", sm: "block", md: "block", lg: "none" }}
      >
        BMI Calculator
      </Text>
      <Button
        ref={btnRef}
        color="#FFFFFF"
        bg="#4299e1"
        onClick={onOpen}
        display={{ base: "block", sm: "block", md: "block", lg: "none" }}
      >
        <BiMenu />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>BMI Calculator</DrawerHeader>

          <DrawerBody>
            <VStack>
              <Button color="#FFFFFF" bg="#4299e1">
                Previous BMI's
              </Button>
              <Button color="#FFFFFF" bg="#4299e1">
                Login
              </Button>
              <Button color="#FFFFFF" bg="#ed64a6">
                Register
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
