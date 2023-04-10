import { Text, Box, VStack } from "@chakra-ui/react";
import React from "react";

export default function BMICard({ value, stamp }) {
  stamp = stamp.split("T");
  let date = stamp[0].split("-").reverse().join("-");
  let time = stamp[1].split(":");
  return (
    <Box p="15px" border="1px solid red">
      <VStack gap={"5px"}>
        <Text fontSize={"30px"} fontWeight={"bold"}>
          {value} kg/m2
        </Text>
        <Text>last checked date: {date}</Text>
        <Text>
          last checked time: {time[0]}hr : {time[1]}min
        </Text>
      </VStack>
    </Box>
  );
}
