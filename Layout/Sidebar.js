import { Flex, Button, Container, Icon, Tooltip } from "@chakra-ui/react";
import {
  GoHome,
  GoOrganization,
  GoFileMedia,
  GoCalendar,
} from "react-icons/go";

import { useRouter } from "next/router";

const linkButtons = [
  // { name: "Home", icon: <Icon as={GoHome} color="blue.500" />, href: "/" },
  {
    name: "Patients",
    icon: <Icon as={GoOrganization} color="blue.500" />,
    href: "/patients",
  },
  {
    name: "Posts",
    icon: <Icon color="blue.500" as={GoFileMedia} />,
    href: "/posts",
  },
  {
    name: "Appointments",
    icon: <Icon as={GoCalendar} color="blue.500" />,
    href: "/appointments",
  },
];

const Sidebar = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <Flex>
      <Flex
        direction="column"
        alignItems="center"
        position="fixed"
        boxShadow="2xl"
        height="100%"
        width="70px"
        pt={5}
      >
        {linkButtons.map((link, index) => (
          <Tooltip key={index} placement="right" hasArrow label={link.name}>
            <Button
              m={2}
              fontSize="2xl"
              variant={pathname === link.href ? "outline" : "solid"}
              borderColor={pathname === link.href && "blue.400"}
              p={2}
              onClick={() => router.push(link.href)}
            >
              {link.icon}
            </Button>
          </Tooltip>
        ))}
      </Flex>

      <Container pl={70} maxW={1500}>
        {children}
      </Container>
    </Flex>
  );
};
export default Sidebar;
