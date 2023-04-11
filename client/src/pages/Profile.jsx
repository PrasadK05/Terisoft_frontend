import { Box, Spinner, Text, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/profile/profile.action";
import { authLogout } from "../redux/auth/auth.action";
import { useNavigate } from "react-router-dom";
let fonts = { base: "14px", sm: "14px", md: "20px", lg: "20px" };

export default function Profile() {
  const { user, loading } = useSelector((store) => store.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let token = Cookies.get("token");

  useEffect(() => {
    dispatch(getProfile(token))
      .then((res) => {
        if (res === "jwt expired") {
          Cookies.remove("token");
          Cookies.remove("name");
          dispatch(authLogout());
          alert("session timeout relogin again");
          navigate("/login");
          return;
        }
      })
      .catch((err) => {
        alert(err);
        return;
      });
  }, []);
  return (
    <Box
      w={{ base: "90%", sm: "90%", md: "70%", lg: "40%" }}
      m="auto"
      boxShadow={
        "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
      }
      borderRadius={"10px"}
      mt="20px"
      p="20px"
    >
      <Text fontSize={"25px"} fontWeight={"bold"} align={"center"}>
        Profile
      </Text>
      <VStack gap={"8px"} mt="15px" display={loading ? "none" : "block"}>
        <Text fontSize={fonts} fontWeight={"bold"} align={"center"}>
          Name: {user.name}
        </Text>
        <Text fontSize={fonts} fontWeight={"bold"} align={"center"}>
          Email: {user.email}
        </Text>
      </VStack>
      <Box
        w="100%"
        h="70vh"
        display={loading ? "flex" : "none"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    </Box>
  );
}
