import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { getBMIValue } from "../redux/bmi/bmi.action";
import { useNavigate } from "react-router-dom";
import { authLogout } from "../redux/auth/auth.action";

let init = {
  weight: "",
  height: "",
};

export default function BmiForm() {
  const [Mesurement, setMesurement] = useState(init);
  const { loading } = useSelector((store) => store.bmi);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let token = Cookies.get("token");

  let handleChange = (e) => {
    let { name, value } = e.target;
    setMesurement({ ...Mesurement, [name]: value });
  };

  let handleSubmit = (e) => {
    e.preventDefault();

    dispatch(getBMIValue(Mesurement, token))
      .then((res) => {
        if (res === "jwt expired") {
          Cookies.remove("token");
          Cookies.remove("name");
          dispatch(authLogout());
          alert("session timeout relogin again");
          navigate("/login");
          return;
        }
        setMesurement(init);
      })
      .catch((err) => {
        alert(err);
        return;
      });
  };

  let { height, weight } = Mesurement;
  return (
    <Box
      w={{ base: "90%", sm: "90%", md: "70%", lg: "35%" }}
      m="auto"
      border={"1px solid black"}
      mt="30px"
      p="20px"
    >
      <Text fontSize={"3xl"} fontWeight={"bold"} align={"center"}>
        Check Your BMI
      </Text>
      <form onSubmit={handleSubmit}>
        <VStack gap="15px">
          <FormControl>
            <FormLabel>Weight in kg</FormLabel>
            <Input
              type="number"
              name="weight"
              placeholder="Enter Your weight in kg"
              value={weight}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>height in meter (m)</FormLabel>
            <Input
              type="number"
              name="height"
              placeholder="Enter Your weight in meter"
              value={height}
              onChange={handleChange}
            />
          </FormControl>
          <Input
            type="submit"
            color="#FFFFFF"
            bg="#4299e1"
            disabled={loading}
            value={loading ? "...loading" : "Submit"}
            cursor={"pointer"}
          />
        </VStack>
      </form>
    </Box>
  );
}
