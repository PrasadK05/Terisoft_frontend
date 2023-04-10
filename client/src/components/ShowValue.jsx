import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function ShowValue() {
  const { bmi_value } = useSelector((store) => store.bmi);

  return (
    <Box
      w={{ base: "90%", sm: "90%", md: "70%", lg: "35%" }}
      m="auto"
      border={"1px solid black"}
      mt="20px"
      p="20px"
      display={bmi_value === "" ? "none" : "block"}
    >
      <Text fontSize={"22px"} fontWeight={"bold"}>
        Your BMI: {bmi_value} kg/m2
      </Text>
    </Box>
  );
}
