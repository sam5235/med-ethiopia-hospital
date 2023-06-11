import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);



const getDate = (date, hr, m) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hr,
    m,
    0
  );
};

const getEvent = (date, start, end, id) => {
  // console.log({ date, start, end, id });
  const time = {
    "08:00 AM": getDate(date, 8, 0),
    "10:00 AM": getDate(date, 10, 0),
    "12:00 PM": getDate(date, 12, 0),
    "02:00 PM": getDate(date, 14, 0),
    "04:00 PM": getDate(date, 16, 0),
    "06:00 PM": getDate(date, 18, 0),
  };
  return {
    id,
    title: `${start} - ${end}`,
    start: time[start],
    end: time[end],
  };
};

const Calandar = ({ appointments = [] }) => {
  const bgColor = useColorModeValue("#fff", "gray.800");
  const eventsData = appointments.map((appt, id) => {
    return getEvent(new Date(appt.date), appt.start_time, appt.end_time, id);
  });

  console.log({ eventsData });

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title)
      setEventsData([
        ...eventsData,
        {
          start,
          end,
          title,
        },
      ]);
  };
  return (
    <Flex mt={5} h="full">
      <Box className="App" w="full" h="full">
        <Calendar
          views={["day", "agenda", "work_week", "month"]}
          selectable
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={eventsData}
          style={{
            height: "100%",
            background: bgColor,
            padding: 20,
            borderRadius: 10,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            width: "100%",
          }}
          onSelectEvent={(event) => alert(event.title)}
          onSelectSlot={handleSelect}
        />
      </Box>
    </Flex>
  );
};

export default Calandar;
