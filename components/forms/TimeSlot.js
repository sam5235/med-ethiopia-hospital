import { Box, Flex, FormLabel, Switch, Text } from "@chakra-ui/react";

const TimeSlotSelector = ({
  selectedTimeSlots,
  setSelectedTimeSlots,
  isSingle = false,
}) => {
  const handleTimeSlotChange = (event) => {
    const { value, checked } = event.target;

    let newTimeSlot = [];
    if (checked) {
      newTimeSlot = isSingle ? [value] : [...selectedTimeSlots, value];
    } else {
      newTimeSlot = isSingle
        ? []
        : selectedTimeSlots.filter((slot) => slot !== value);
    }
    setSelectedTimeSlots(newTimeSlot);
  };

  return (
    <Box my={3}>
      <FormLabel mb={0}>Select Time slot(s):</FormLabel>
      <Text fontSize="xs" color="gray.400">
        Select suitable date for accepting patient
      </Text>

      <Flex mt={3} w="fit-content" direction="column" gap={3}>
        <Switch
          id="time2"
          value="08:00 AM - 10:00 AM"
          isChecked={selectedTimeSlots.includes("08:00 AM - 10:00 AM")}
          onChange={handleTimeSlotChange}
        >
          08:00 AM - 10:00 AM
        </Switch>

        <Switch
          id="time2"
          value="10:00 AM - 12:00 PM"
          isChecked={selectedTimeSlots.includes("10:00 AM - 12:00 PM")}
          onChange={handleTimeSlotChange}
        >
          10:00 AM - 12:00 PM
        </Switch>

        <Switch
          id="time2"
          value="12:00 PM - 02:00 PM"
          isChecked={selectedTimeSlots.includes("12:00 PM - 02:00 PM")}
          onChange={handleTimeSlotChange}
        >
          12:00 PM - 02:00 PM
        </Switch>

        <Switch
          id="time2"
          value="02:00 PM - 04:00 PM"
          isChecked={selectedTimeSlots.includes("02:00 PM - 04:00 PM")}
          onChange={handleTimeSlotChange}
        >
          02:00 PM - 04:00 PM
        </Switch>

        <Switch
          id="time2"
          value="04:00 PM - 06:00 PM"
          isChecked={selectedTimeSlots.includes("04:00 PM - 06:00 PM")}
          onChange={handleTimeSlotChange}
        >
          04:00 PM - 06:00 PM
        </Switch>
      </Flex>
    </Box>
  );
};

export default TimeSlotSelector;
