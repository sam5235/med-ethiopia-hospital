import {
  Avatar,
  Box,
  Flex,
  List,
  ListIcon,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import { getMultiplePatientById } from "../../firebase/patientServices";

const CalanderModal = ({ event }) => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = () => {
      setIsLoading(true);
      getMultiplePatientById(event.patientsId).then((patients) => {
        setPatients(patients);
        setIsLoading(false);
      });
    };

    fetchPatients();
  }, [event]);

  return (
    <Box>
      {isLoading && <Spinner />}
      <List spacing={3}>
        {patients.map((p, key) => {
          return (
            <ListItem key={key}>
              <Flex>
                <Box position="relative">
                  <ListIcon
                    position="absolute"
                    t="0"
                    bg="white"
                    rounded="2xl"
                    right="-2.5"
                    zIndex="2"
                    as={MdCheckCircle}
                    color="green.500"
                  />
                  <Avatar name={p.name} />{" "}
                </Box>
                <Box ml="4">
                  <Text color="gray.900" fontWeight="bold" fontSize="lg">
                    {p.name}
                  </Text>
                  <Text color="gray.600" fontSize="sm">
                    {p.phone}
                  </Text>
                </Box>
              </Flex>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default CalanderModal;
