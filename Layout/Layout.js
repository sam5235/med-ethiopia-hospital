import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Box, useColorModeValue } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Box>
      <Navbar />
      <Box pt="56px">
        <Sidebar>{children}</Sidebar>
      </Box>
    </Box>
  );
};
export default Layout;
