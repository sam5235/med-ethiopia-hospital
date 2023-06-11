import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import TimeSlot from "../forms/TimeSlot";
import { updateAppointment } from "../../firebase/appointmentService";

const AppointmentModal = ({ onClose = () => {}, appt, onFinishUpdate }) => {
  const toast = useToast();
  const [maxPatients, setMaxPatients] = useState(appt.max_patients);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(appt.date);
  const [timeSlots, setTimeSlots] = useState([
    appt.start_time + " - " + appt.end_time,
  ]);

  const notify = () => {
    toast({
      status: "success",
      title: "Operation Sucess!",
      description: "Appoitment schedule updated!",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleOnClose = () => {
    setSelectedDate("");
    setMaxPatients("");
    setIsLoading("");
    setTimeSlots([]);
    setIsLoading(false);
    onClose();
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleOnUpdate = async () => {
    setIsLoading(true);

    updateAppointment(
      {
        ...appt,
        max_patients: maxPatients,
        date: selectedDate,
        start_time: timeSlots[0].slice(0, 8),
        end_time: timeSlots[0].slice(11, 19),
      },
      (appt) => {
        handleOnClose();
        notify();
        onFinishUpdate(appt);
      }
    );
  };

  const isUpdatingDisabled =
    !selectedDate || !maxPatients || timeSlots.length === 0;

  return (
    <Box p={5}>
      <Image src="/book.png" maxW="350" mx="auto" />
      <Heading textAlign="center" fontSize="xl" pt={0} mt={0} mb={6}>
        Update Appointment
      </Heading>
      <FormControl>
        <FormLabel>Max Patient</FormLabel>
        <Input
          placeholder="Maximum number of patient"
          value={maxPatients}
          type="number"
          onChange={(e) => setMaxPatients(e.target.value)}
        />
        <Text mt={1} fontSize="xs" color="gray.400">
          What patient are you planing to accept at selected time slot
        </Text>
      </FormControl>
      <FormControl mt={4}>
        <FormLabel as="b">Select a Date</FormLabel>

        <Input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <Text mt={1} fontSize="xs" color="gray.400">
          Select suitable date for accepting patient
        </Text>
      </FormControl>

      <TimeSlot
        setSelectedTimeSlots={setTimeSlots}
        selectedTimeSlots={timeSlots}
        isSingle
      />

      <Flex mt={5} justifyContent={"flex-end"}>
        <Button
          colorScheme="brand"
          isLoading={isLoading}
          isDisabled={isUpdatingDisabled}
          onClick={handleOnUpdate}
        >
          Update
        </Button>
      </Flex>
    </Box>
  );
};

export default AppointmentModal;
