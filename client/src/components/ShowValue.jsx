import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

// Showing BMI value on UI
export default function ShowValue() {
  const { bmi_value } = useSelector((store) => store.bmi);

  return (
    <Box
      w={{ base: "90%", sm: "90%", md: "70%", lg: "35%" }}
      m="auto"
      boxShadow={
        "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
      }
      borderRadius={"10px"}
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
