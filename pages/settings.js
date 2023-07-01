import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getMyProfileData, updateProfile } from "../firebase/profileServices";

export default function HealthcareProfileEdit() {
  const { user } = useAuth();
  const toast = useToast();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOnUpdate = () => {
    const profile = {
      name,
      address,
    };
    setIsLoading(true);
    updateProfile(profile).then(() => {
      toast({
        title: "Operation Success!",
        description: "Profile Updated Successfuly",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
    });
  };

  useEffect(() => {
    const fetchMyData = () => {
      setIsLoading(true);
      getMyProfileData().then((data) => {
        setName(data.name);
        setEmail(data.email || user.email);
        setAddress(data.address);
        setIsLoading(false);
      });
    };

    if (user !== null) {
      fetchMyData();
    }
  }, [user]);

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Hospiital Profile Edit
        </Heading>
        <FormControl id="userName">
          <Center>
            <Avatar size="xl" name={name} />
          </Center>
        </FormControl>
        <FormControl mb={1} isRequired>
          <FormLabel fontSize="sm">Full Name</FormLabel>
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
          />
        </FormControl>

        <FormControl mb={1} isRequired>
          <FormLabel fontSize="sm">Email</FormLabel>
          <Input
            value={email}
            isDisabled
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
          />
        </FormControl>

        {/* <FormControl mb={1} isRequired>
          <FormLabel fontSize="sm">Phone</FormLabel>
          <Input
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            type="number"
          />
        </FormControl> */}

        <FormControl mb={20} isRequired>
          <FormLabel fontSize="sm">Address</FormLabel>
          <Input
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            type="text"
          />
        </FormControl>

        <Stack pt={5} spacing={6} direction={["column", "row"]}>
          <Button
            bg={"red.400"}
            color={"white"}
            w="full"
            isDisabled={isLoading}
            _hover={{
              bg: "red.500",
            }}
          >
            Cancel
          </Button>
          <Button
            colorScheme="brand"
            w="full"
            isDisabled={isLoading}
            isLoading={isLoading}
            onClick={handleOnUpdate}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
