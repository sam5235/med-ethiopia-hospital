import { useState } from "react";
import {
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
} from "@chakra-ui/react";
import TimeSlot from "./TimeSlot";
import { createAppointment } from "../../firebase/appointmentService";
import { auth } from "../../config/firebase";

const AppointmentForm = ({ onClose = () => {}, onFinishAdd }) => {
  const [maxPatients, setMaxPatients] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);

  const handleOnClose = () => {
    setSelectedDate("");
    setMaxPatients("");
    setIsLoading(false);
    setTimeSlot([]);
    onClose();
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleOnAdd = async () => {
    setIsLoading(true);
    for (const index in timeSlot) {
      const appnt = {
        startTime: timeSlot[index].slice(0, 8),
        endTime: timeSlot[index].slice(11, 19),
        maxPatients,
        selectedDate,
      };

      createAppointment(appnt).then(() => {
        onFinishAdd({
          start_time: appnt.startTime,
          end_time: appnt.endTime,
          max_patients: appnt.maxPatients,
          date: appnt.selectedDate,
          patientsId: [],
          hospitalId: auth.currentUser.uid,
        });
      });
    }
    handleOnClose();
  };

  const isAddingDisabled =
    !selectedDate || !maxPatients || timeSlot.length === 0;

  return (
    <Card boxShadow="2xl" mt={5}>
      <CardBody>
        <Image src="/book.png" maxW="350" mx="auto" />
        <Heading textAlign="center" fontSize="xl" pt={0} mt={0} mb={6}>
          Fill Next Appointment
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
          setSelectedTimeSlots={setTimeSlot}
          selectedTimeSlots={timeSlot}
        />

        <Flex mt={10} justifyContent={"flex-end"}>
          <Button mr="2" disabled={isLoading} onClick={handleOnClose}>
            Clear
          </Button>
          <Button
            colorScheme="brand"
            isLoading={isLoading}
            isDisabled={isAddingDisabled}
            onClick={handleOnAdd}
          >
            Add Schedule
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default AppointmentForm;
