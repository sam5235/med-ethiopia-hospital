import {
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  Icon,
  Image,
  Input,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiArticleLine, RiAddFill, RiSearch2Line } from "react-icons/ri";
import { HiPencil } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import { getBlogs } from "../firebase/blogServices";
import { EMPTY_BLOG } from "../utils";
import { query } from "firebase/firestore";

const PostTable = ({ setBlogToEdit, setFiles }) => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState();
  const [query, setQuery] = useState("");

  const fetchBlogs = async () => {
    const data = await getBlogs();
    data && setLoading(false);
    setBlogs(data);
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      query === "" || blog.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <Box>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        borderBottomColor="gray.100"
        pb={2}
        mb={4}
        borderBottom="1px solid lightgray"
      >
        <Flex alignItems="center">
          <Icon fontSize="6xl" as={RiArticleLine} color="blue.500" />
          <Box>
            <Text fontSize="xl">Posts</Text>
            <Text
              fontSize="xs"
              color="gray.500"
            >{`All ${user.displayName} Blog Posts`}</Text>
          </Box>
        </Flex>

        <Flex alignItems="center">
          {selectedBlog && (
            <Button
              variant="solid"
              colorScheme="brand"
              rounded="3xl"
              p="2"
              mx={2}
              onClick={() => {
                setFiles([
                  {
                    name: selectedBlog.coverImage,
                    preview: selectedBlog.coverImage,
                  },
                ]);
                setBlogToEdit({ ...selectedBlog, edit: true });
              }}
            >
              <Icon as={HiPencil} fontSize="xl" color="white" />
            </Button>
          )}
          <Button
            variant="solid"
            colorScheme="brand"
            rounded="3xl"
            p="2"
            onClick={() => setBlogToEdit(EMPTY_BLOG)}
          >
            <Icon as={RiAddFill} fontSize="xl" color="white" />
          </Button>
          <Input
            placeholder="Search..."
            colorScheme="brand"
            bg={useColorModeValue("white", "gray.900")}
            mx={2}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rounded="3xl"
          />
          <Button variant="solid" colorScheme="brand" rounded="3xl" p="2">
            <Icon as={RiSearch2Line} fontSize="xl" color="white" />
          </Button>
        </Flex>
      </Flex>

      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th />
              <Th>Title & Description</Th>
              <Th isNumeric>Length</Th>
              <Th isNumeric>Category</Th>
              <Th isNumeric>Published</Th>
              <Th isNumeric>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredBlogs.map((blog, key) => (
              <Tr key={key}>
                <Td>
                  <Checkbox
                    w={"20px"}
                    isChecked={selectedBlog && selectedBlog.id === blog.id}
                    onChange={() => {
                      setSelectedBlog(
                        selectedBlog && selectedBlog.id === blog.id
                          ? null
                          : blog
                      );
                    }}
                  />
                </Td>
                <Td>
                  <Flex alignItems="center">
                    <Image w="50px" src={blog.coverImage} />
                    <Box ml={2} maxW="150px">
                      <Text isTruncated>{blog.title}</Text>
                      <Text fontSize="x-small" color="gray.500" isTruncated>
                        {blog.description}
                      </Text>
                    </Box>
                  </Flex>
                </Td>
                <Td isNumeric>
                  <Text fontSize="sm">{blog.length.text}</Text>
                </Td>
                <Td>
                  <Stack maxW="150px" direction="row">
                    {blog.categories.map((category, key) => (
                      <Badge key={key} colorScheme="blue" fontSize="0.7em">
                        {category.label}
                      </Badge>
                    ))}
                  </Stack>
                </Td>
                <Td>
                  <Text fontSize="sm">
                    {new Date(blog.datePublished).toDateString()}
                  </Text>
                </Td>
                <Td>
                  <Badge
                    colorScheme={
                      blog.status === "approved"
                        ? "green"
                        : blog.status === "rejected"
                        ? "red"
                        : "orange"
                    }
                    fontSize="0.7em"
                    textTransform="capitalize"
                  >
                    {blog.status}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {loading && (
        <Flex w="100%" justifyContent="center" my={5}>
          <Spinner color="blue.400" size="lg" />
        </Flex>
      )}
    </Box>
  );
};

export default PostTable;
