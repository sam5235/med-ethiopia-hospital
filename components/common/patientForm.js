import {
  FormControl,
  Input,
  FormLabel,
  Grid,
  GridItem,
  Box,
  Button,
  Heading,
  useColorModeValue,
  useToast,
  Flex,
  Image,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { RegisterPatient } from "../../firebase/patientServices";
import PasswordInput from "../Passwordinput";
import { useDispatch } from "react-redux";
import { MdOutlineSick } from "react-icons/md";
import { addPatient as addSinglePatient } from "../../redux/actions";

const PatientForm = ({ onClose = () => {} }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addPatient = (p) => {
    if (p !== undefined) {
      dispatch(addSinglePatient(p));
      onClose();
    }
  };

  const toast = useToast();

  const handleOnClose = (patient) => {
    addPatient && addPatient(patient);
    setIsLoading(false);
    toast({
      title: "Registered Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setName("");
    setAddress("");
    setAge("");
    setEmail("");
    setHeight("");
    setPhone("");
    setPassword("");
    setWeight("");
    setSex("");
    onClose();
  };
  const onFail = () => {
    setIsLoading(false);
    toast({
      title: "Registration Fails",
      description: "Please fill again",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    onClose();
  };
  const handleOnAdd = () => {
    const List = {
      name,
      address,
      phone,
      age,
      sex,
      weight,
      height,
      email,
      password,
      history: [],
    };
    setIsLoading(true);
    RegisterPatient(List, handleOnClose, onFail);
  };
  return (
    <Box
      boxShadow="2xl"
      bg={useColorModeValue("white", "gray.800")}
      position="sticky"
      top="80px"
      rounded="lg"
      p={6}
    >
      <Flex mb={3} alignItems="center" direction="column">
        <Image src="/patient.png" maxW="250" mx="auto" />
        <Heading size="md">Patient Registration</Heading>
      </Flex>

      <FormControl mb={3}>
        <FormLabel fontSize="sm">Full Name</FormLabel>
        <Input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
        />
      </FormControl>

      <FormControl mb={3}>
        <FormLabel fontSize="sm">Email</FormLabel>
        <Input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
        />
      </FormControl>

      <FormControl mb={3}>
        <FormLabel fontSize="sm">Password</FormLabel>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>

      <FormControl mb={3}>
        <FormLabel fontSize="sm">Phone</FormLabel>
        <Input
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          type="number"
        />
      </FormControl>

      <FormControl mb={3}>
        <FormLabel fontSize="sm">Address</FormLabel>
        <Input
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          type="text"
        />
      </FormControl>

      <Grid templateColumns="repeat(8, 1fr)" gap={4} mb={3}>
        <GridItem colSpan={4}>
          <FormControl mb={3}>
            <FormLabel fontSize="sm">Age</FormLabel>
            <Input
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
              type="number"
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl mb={3}>
            <FormLabel fontSize="sm">Sex</FormLabel>
            <Select
              value={sex}
              onChange={(e) => {
                setSex(e.target.value);
              }}
            >
              <option value="male">Male</option>
              <option value="female">Male</option>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl mb={3}>
            <FormLabel fontSize="sm">Height(cm)</FormLabel>
            <Input
              value={height}
              onChange={(e) => {
                setHeight(e.target.value);
              }}
              type="number"
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl mb={3}>
            <FormLabel fontSize="sm">Weight(g)</FormLabel>
            <Input
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
              }}
              type="number"
            />
          </FormControl>
        </GridItem>
      </Grid>
      <Button
        isLoading={isLoading}
        onClick={handleOnAdd}
        width="100%"
        colorScheme="brand"
      >
        Register
      </Button>
    </Box>
  );
};
export default PatientForm;
