import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import Calendar from "../components/forms/Calandar";
import AppointmentForm from "../components/forms/AppointmentForm";
import AppointmentCard from "../components/common/AppointmentCard";
import { useState } from "react";

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);

  const handleAdd = (appt) => {
    setAppointments((appts) => [...appts, appt]);
  };
  return (
    <Box>
      <Grid templateColumns="70% 30%" gap={5}>
        <GridItem>
          <Calendar appointments={appointments} />
        </GridItem>
        <GridItem>
          <AppointmentForm onFinishAdd={handleAdd} />
        </GridItem>
      </Grid>
      <AppointmentCard
        appointments={appointments}
        setAppointments={setAppointments}
      />
    </Box>
  );
};

export default AppointmentPage;
