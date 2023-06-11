import {
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { ImSearch } from "react-icons/im";

const SearchBar = ({
  filter = () => {},
  value,
  onChange,
  isLoading = false,
}) => {
  return (
    <InputGroup>
      <InputRightElement
        onClick={filter}
        cursor="pointer"
        pt={2}
        pr={5}
        children={
          isLoading ? <Spinner size="sm" /> : <ImSearch fontSize="20px" />
        }
      />
      <Input
        size="lg"
        rounded="xl"
        type="text"
        boxShadow="2xl"
        value={value}
        onChange={onChange}
        placeholder="Search patient by full name or phone"
        bg={useColorModeValue("white", "gray.800")}
      />
    </InputGroup>
  );
};

export default SearchBar;
