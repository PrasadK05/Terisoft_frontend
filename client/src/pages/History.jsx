import { Box, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getBMIHistory } from "../redux/bmi/bmi.action";
import { authLogout } from "../redux/auth/auth.action";
import { useNavigate } from "react-router-dom";
import BMICard from "../components/BMICard";

export default function History() {
  const { bmi_history, loading } = useSelector((store) => store.bmi);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let token = Cookies.get("token");

  useEffect(() => {
    dispatch(getBMIHistory(token))
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
      w={{ base: "90%", sm: "90%", md: "90%", lg: "90%" }}
      m="auto"
      border={"1px solid black"}
      mt="20px"
      p="20px"
    >
      <Text fontSize={"25px"} fontWeight={"bold"} align={"center"}>
        Past BMI's
      </Text>

      <Box
        w="100%"
        display={loading ? "none" : "grid"}
        mt="20px"
        gridTemplateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(1,1fr)",
          md: "repeat(2,1fr)",
          lg: "repeat(4,1fr)",
        }}
        gap={"20px"}
      >
        {bmi_history &&
          bmi_history.map((el) => {
            return (
              <BMICard value={el.bmi_value} stamp={el.createdAt} key={el._id} />
            );
          })}
      </Box>
      <Box
        w="100%"
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
