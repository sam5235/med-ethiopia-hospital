import {
  Avatar,
  Box,
  Button,
  Flex,
  Modal,
  Heading,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { GiHospitalCross } from "react-icons/gi";
import { filterAllPatients } from "../../firebase/patientServices";
import RecordForm from "../common/recordForm";
import SearchBar from "../common/searchBar";

const AddRecords = () => {
  const {
    isOpen: isSearch,
    onOpen: openSearch,
    onClose: closeSearch,
  } = useDisclosure();
  const [patients, setPatients] = useState([]);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const handleChange = async (e) => {
    const current = e.target.value;
    setValue(current);
    if (current.length > 2) {
      setIsLoading(true);
      const List = await filterAllPatients(current);
      setPatients(List);
      console.log(patients);
      if (List) {
        setIsLoading(false);
      }
    }
    if (current === "") setPatients([]);
  };

  const onPatientSelect = (patient) => {
    setSelected(patient);
  };

  const cancelPatient = () => {
    setSelected(null);
    setValue("");
    setPatients([]);
    closeSearch();
  };

  return (
    <Box>
      <Button
        leftIcon={<GiHospitalCross />}
        bg="white"
        color="brand.400"
        variant="solid"
        size={"sm"}
        onClick={openSearch}
      >
        Add new Record
      </Button>
      <Modal isOpen={isSearch} onClose={cancelPatient}>
        <ModalOverlay />
        <ModalContent>
          {selected !== null && (
            <RecordForm patient={selected} onCancel={cancelPatient} />
          )}
          {selected === null && (
            <SearchBar onChange={handleChange} isLoading={isLoading} />
          )}
          {patients.length > 0 && selected === null && (
            <Box p={3} mt={3} width="100%" maxH="300px" overflowY="scroll">
              {patients.map((data, index) => (
                <Flex
                  onClick={() => {
                    onPatientSelect(data); //patient picked
                  }}
                  borderBottom="1px solid gray"
                  mb={2}
                  key={index}
                >
                  <Avatar size="md" mb={3} src="" name={data.name} />
                  <Box ml={3}>
                    <Heading mb={1} size="sm">
                      {data.name}
                    </Heading>
                    <Heading size="xs">{data.phone}</Heading>
                  </Box>
                </Flex>
              ))}
            </Box>
          )}
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default AddRecords;
