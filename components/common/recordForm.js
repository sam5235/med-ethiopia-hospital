import {
  background,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  Toast,
  useColorModeValue,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useState } from "react";
import { addRecord } from "../../firebase/recordService";
import datas from "../../mocks/diseases.json"
import { useDispatch, useSelector } from "react-redux";
import { addPatient as addSinglePatient } from "../../redux/actions";

const RecordForm = ({ onCancel, patient }) => {
  const dispatch = useDispatch();
  const patients = useSelector(store => store.patientsPage);

  const options = datas.map((data) => ({ label: data, value: data }))
  const [doctor, setDoctor] = useState("");
  const [diseases, setDiseases] = useState([]);
  const [persc, setPersc] = useState("");
  const [desc, setDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);

 const addPatient = (patient) => {
   if(patients.findIndex((p)=>p.id === patient.id) === -1){
        dispatch(addSinglePatient(patient));
   }

 }

  const handleOnClose = () => {
    setIsLoading(false);
    Toast({
      title: "Recorded Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    addPatient(patient);
    onCancel();
  };

  const onFail = () => {
    setIsLoading(false);
    Toast({
      title: "Registration Fails",
      description: "Please fill again",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };
  const handleOnAdd = () => {
    const record = {
      doctor,
      diseases: diseases.map(d => d.value),
      persc,
      desc,
      patientId: patient.id
    }

    setIsLoading(true);
    addRecord(record, handleOnClose, onFail);
    

  };



  return (
    <Box
      sx={{ position: "sticky", top: "100px" }}
      boxShadow="dark-lg"
      bg={useColorModeValue("white", "gray.800")}
      p={6}
    >
      <Heading mb={3} size="md">
        Recording Patient
      </Heading>
      <FormControl mb={3}>
        <FormLabel fontSize="sm">Doctor Name</FormLabel>
        <Input onChange={(e) => { setDoctor(e.target.value) }} type="text" />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel fontSize="sm">Diagnosed Diseases</FormLabel>
        <Select
          options={options}
          isMulti
          bg={useColorModeValue("white", "gray.800")}
          onChange={(e) => { setDiseases(e) }}
        />

      </FormControl>

      <FormControl mb={3}>
        <FormLabel fontSize="sm">Perscriptions</FormLabel>
        <Textarea onChange={(e) => { setPersc(e.target.value) }} />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel fontSize="sm">Description</FormLabel>
        <Textarea onChange={(e) => { setDesc(e.target.value) }} />
      </FormControl>
      <Button
        isLoading={isLoading}
        onClick={handleOnAdd}
        width="25%"
        colorScheme="brand"
        mr={5}

      >
        Recorded
      </Button>
      <Button
        // isLoading={isLoading}
        onClick={onCancel}
        width="25%"
        colorScheme="brand"
      >
        Cancel
      </Button>
    </Box>
  );
};

export default RecordForm;
