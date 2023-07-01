import {
  Flex,
  Box,
  Image,
  Button,
  Container,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  useColorMode,
  Avatar,
  Icon,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import { MdOutlineSick } from "react-icons/md";
import { IoMdLogOut, IoMdSettings } from "react-icons/io";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

import { useAuth } from "../context/AuthContext";
import PatientForm from "../components/common/patientForm";
import AddRecords from "../components/modals/AddRecordModal";
import { useEffect, useState } from "react";
import { getMyProfileData } from "../firebase/profileServices";

const Navbar = () => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, logout } = useAuth();
  const {
    isOpen: isForm,
    onOpen: openForm,
    onClose: closeForm,
  } = useDisclosure();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchMyData = () => {
      getMyProfileData().then((data) => {
        setUserData(data);
      });
    };

    fetchMyData();
  }, [user]);

  return (
    <Box
      bgGradient="linear(to-r, blue.500, blue.400)"
      // bg={useColorModeValue("brand.400", "gray.800")}
      position="fixed"
      width="100%"
      zIndex={2}
      py={1}
    >
      <Container maxW={1500}>
        <Flex h={12} justifyContent="space-between" alignItems="center" px={3}>
          <Flex>
            <Image src="/logo.png" width="40px" />
            <Box ml={2}>
              <Text
                fontSize="1xl"
                as="b"
                textTransform="uppercase"
                color="white"
              >
                Meditopia H. Portal
              </Text>
              <Text fontSize="xs" color="white">
                {userData.displayName}
              </Text>
            </Box>
          </Flex>
          <Flex alignItems="center" gap={4} width={450}>
            <Button
              leftIcon={<MdOutlineSick />}
              bg="white"
              color="brand.400"
              size={"sm"}
              variant="ghost"
              onClick={openForm}
            >
              Add Patient
            </Button>

            <Modal isOpen={isForm} onClose={closeForm}>
              <ModalOverlay />
              <ModalContent>
                <PatientForm onClose={closeForm} />
              </ModalContent>
            </Modal>

            <AddRecords />

            <Icon boxSize={6} onClick={toggleColorMode} cursor="pointer" mx="2">
              {colorMode === "light" ? <MoonIcon color="white" /> : <SunIcon />}
            </Icon>
            <Menu>
              <MenuButton>
                <Avatar name={userData.name} size={"sm"} />
              </MenuButton>

              <MenuList
                display="flex"
                flexDirection="column"
                alignItems={"center"}
              >
                <Box>
                  {/* <Image src={user?.photoURL} width="200px" /> */}
                  <Divider />
                </Box>

                <MenuItem
                  onClick={() => router.push("/settings")}
                  icon={<IoMdSettings />}
                >
                  Settings
                </MenuItem>
                <MenuItem icon={<IoMdLogOut />} onClick={logout}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
