import {
  Text,
  Flex,
  Box,
  Center,
  useColorModeValue,
  Avatar,
  Heading,
  Image,
} from "@chakra-ui/react";
import Records from "../../components/RecordsTimeLine";
import { useRouter } from "next/router";
import { getPatientById } from "../../firebase/patientServices";
import { useEffect, useState } from "react";

const SingleRecord = () => {
  const backColor = useColorModeValue("white", "gray.900");
  const [patient, setPatient] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const id = router.query.id;

  const fetchPatient = () => {
    setIsLoading(true);
    getPatientById(id).then((res) => {
      setPatient(res);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchPatient();
  }, []);

  return (
    <Box>
      <Center pb={6}>
        <Box
          maxW={"320px"}
          w={"full"}
          boxShadow={"2xl"}
          bg={backColor}
          mt={10}
          border="1px solid"
          borderColor="gray.200"
          rounded={"lg"}
          p={6}
          textAlign={"center"}
        >
          {!isLoading && (
            <>
              <Avatar size={"xl"} src="" name={patient.name} mb={4} />
              <Heading
                fontSize={"2xl"}
                fontFamily={"body"}
                textTransform="capitalize"
              >
                {patient.name}
              </Heading>
              <Text fontWeight={600} color={"gray.500"} m2={4}>
                {patient.phone}
              </Text>
              <Text fontWeight={600} color={"gray.500"}>
                {patient.address}
              </Text>
              <Text fontWeight={400} color={"gray.600"}>
                {patient.createdAt.toDate().toDateString()}
              </Text>
              <Text fontWeight={400} color={"gray.400"}>
                {`${patient.hospitals.length} Healthcare Involvement`}
              </Text>
              <Text fontWeight={400} color={"gray.400"} mb={2}>
                {patient.email}
              </Text>
              <Box mt={4}>
                <Flex justify="space-around">
                  <Box textAlign="center" w="150">
                    <Image mx="auto" w={25} src="/weight.png" />
                    <Text fontWeight={400} fontSize="md" color={"gray.500"}>
                      Weight
                    </Text>
                    <Text fontWeight={400} fontSize="sm" color={"gray.700"}>
                      {patient.weight}Kg
                    </Text>
                  </Box>
                  <Box textAlign="center" w="150">
                    <Image mx="auto" w={25} src="/age.png" />
                    <Text fontWeight={400} fontSize="md" color={"gray.500"}>
                      Age
                    </Text>
                    <Text fontWeight={400} fontSize="sm" color={"gray.700"}>
                      {patient.age} Years
                    </Text>
                  </Box>
                  <Box textAlign="center" w="150">
                    <Image mx="auto" w={25} src="/gender.png" />
                    <Text fontWeight={400} fontSize="md" color={"gray.500"}>
                      Age
                    </Text>
                    <Text fontWeight={400} fontSize="sm" color={"gray.700"}>
                      {patient.sex}
                    </Text>
                  </Box>
                  <Box textAlign="center" w="150">
                    <Image mx="auto" w={25} src="/height.png" />
                    <Text fontWeight={400} fontSize="md" color={"gray.500"}>
                      Height
                    </Text>
                    <Text fontWeight={400} fontSize="sm" color={"gray.700"}>
                      {patient.height}cm
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </>
          )}
        </Box>
      </Center>
      {/* <Center>
        <Text color="blue.400" fontSize="3xl" as="b">
          Hospital Records
        </Text>
      </Center> */}
      <Records id={id} />
    </Box>
  );
};

export default SingleRecord;
