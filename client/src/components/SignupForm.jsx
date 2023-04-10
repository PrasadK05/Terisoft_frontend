import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { signupProcess } from "../redux/auth/auth.action";

let init = {
  name: "",
  email: "",
  password: "",
};

export default function SignupForm() {
  const [data, setData] = useState(init);
  const [cp, setCP] = useState("");
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const toast = useToast();
  let { name, email, password } = data;

  let handleChange = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  let handleChange2 = (e) => {
    setCP(e.target.value);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    setLoad(true);
    let reg =
      /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    if (!reg.test(data.email)) {
        toast({
            title: "Provide correct email.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
      setLoad(false);
      return;
    }
    if (data.password !== cp) {
        toast({
            title: "Password not matched.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
      setLoad(false);
      return;
    }

    signupProcess(data)
      .then((res) => {
        if (res) {
          toast({
            title: "Account created successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });          
          navigate("/login");
        } else {
          toast({
            title: "Account creation unsuccessful.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
        setData(init);
        setLoad(false);
        setCP("");
      })
      .catch((err) => {
        toast({
          title: "Account creation unsuccessful.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setData(init);
        setLoad(false);
        setCP("");
      });
  };

  return (
    <Box
      w={{ base: "90%", sm: "90%", md: "70%", lg: "35%" }}
      m="auto"
      border={"1px solid black"}
      mt="30px"
      p="20px"
    >
      <Text fontSize={"3xl"} fontWeight={"bold"} align={"center"}>
        Registration Form
      </Text>
      <form onSubmit={handleSubmit}>
        <VStack gap="15px">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              name="cPass"
              placeholder="Confirm Password"
              onChange={handleChange2}
            />
          </FormControl>
          <Input
            type="submit"
            color="#FFFFFF"
            bg="#4299e1"
            disabled={load}
            value={load ? "...loading" : "Submit"}
            cursor={"pointer"}
          />
        </VStack>
      </form>
      <Text mt="10px">
        Already have an account?{" "}
        <Link to="/login">
          <Text color="#4299e1">Login</Text>
        </Link>
      </Text>
    </Box>
  );
}
