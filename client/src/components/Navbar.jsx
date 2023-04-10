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
  useToast,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { BiMenu } from "react-icons/bi";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutProcess } from "../redux/auth/auth.action";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { data } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  let handleLog = () => {
    if (data.isAuthenticated) {
      dispatch(logoutProcess({ token: data.token }))
        .then((res) => {
          if (res) {
            toast({
              title: "Logout successfully.",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            Cookies.remove("token");
            Cookies.remove("name");
            navigate("/login");
          } else {
            toast({
              title: "Something went wrong, try later.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        })
        .catch((err) => {
          toast({
            title: "Something went wrong, try later.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    } else {
      navigate("/login");
    }
  };

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
        <Link to={"/history"}>
          <Button color="#FFFFFF" bg="#4299e1">
            Previous BMI's
          </Button>
        </Link>
      </HStack>
      <HStack
        gap="20px"
        display={{ base: "none", sm: "none", md: "none", lg: "flex" }}
      >
        <Button color="#FFFFFF" bg="#4299e1" onClick={handleLog}>
          {data.isAuthenticated ? "Logout" : "Login"}
        </Button>
        <Button color="#FFFFFF" bg="#ed64a6">
          {data.isAuthenticated ? data.name : "Register"}
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
              <Button color="#FFFFFF" bg="#4299e1" onClick={handleLog}>
                {data.isAuthenticated ? "Logout" : "Login"}
              </Button>
              <Button color="#FFFFFF" bg="#ed64a6">
                {data.isAuthenticated ? data.name : "Register"}
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
