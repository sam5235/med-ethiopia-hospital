import { StarIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Badge,
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdDateRange } from "react-icons/md";
import { FaUserNurse } from "react-icons/fa";
import { VerticalTimelineElement } from "react-vertical-timeline-component";

const RecordCard = ({ record }) => {
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      contentStyle={{
        background: useColorModeValue("#fff", "#1A202C"),
        boxShadow: "none",
        padding: 0,
        borderRaduis: "10px",
      }}
      contentArrowStyle={{
        borderRight: `7px solid ${useColorModeValue("#3086e8", "#fff")}`,
      }}
      iconStyle={{
        background: useColorModeValue("#3086e8", "#1A202C"),
        color: "#fff",
      }}
      icon={<StarIcon />}
    >
      <Box p={5} rounded="xl" boxShadow={"2xl"}>
        <Box mb={2}>
          <Flex alignItems="center">
            <Avatar mr={2} name={record._hospital.name} />
            <Box>
              <Text sx={{ marginTop: "0px !important" }}>
                {record._hospital.name}
              </Text>
              <Text
                sx={{
                  marginTop: "0px !important",
                  fontSize: "13px !important",
                  color: "gray",
                }}
              >
                {record._hospital.address}
              </Text>
            </Box>
          </Flex>
          <Flex my={4}>
            <Flex alignItems="center" flexWrap="wrap">
              {record.diseases.map((disease) => (
                <Badge mx={2} my={1} px={2} colorScheme="red">
                  {disease}
                </Badge>
              ))}
            </Flex>
          </Flex>
          <Flex mx={4} alignItems="center" mt={4}>
            <MdDateRange fontSize={30} />
            <Text
              pl={2}
              sx={{
                marginTop: "0px !important",
              }}
            >
              {record.createdAt.toDate().toDateString()}
            </Text>
          </Flex>
          <Flex mx={4} alignItems="center" mt={2}>
            <FaUserNurse fontSize={30} />
            <Text
              pl={2}
              sx={{
                marginTop: "0px !important",
              }}
            >
              {record.doctor}
            </Text>
          </Flex>

          <Accordion allowMultiple mt={4}>
            <AccordionItem>
              <h2>
                <AccordionButton rounded="md">
                  <Box as="span" flex="1" textAlign="left">
                    <Text
                      pr={2}
                      sx={{
                        marginTop: "0px !important",
                      }}
                    >
                      Perscription
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>{record.persc}</AccordionPanel>
            </AccordionItem>
            <AccordionItem style={{ paddingLeft: "" }}>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <Text
                      pr={2}
                      sx={{
                        marginTop: "0px !important",
                      }}
                    >
                      Description
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>{record.desc}</AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Box>
    </VerticalTimelineElement>
  );
};

export default RecordCard;
