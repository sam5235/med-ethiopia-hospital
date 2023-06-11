import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useState } from "react";
import { publishBlog, updateBlog } from "../../firebase/blogServices";

import ImageDrop from "../ImageDrop";

const options = ["Discovery", "Service", "Diseases"].map((data) => ({
  label: data,
  value: data,
}));

const BlogForm = ({ blog, setBlog, files, setFiles }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = () => {
    setFiles([]);
    setBlog({});
    setIsLoading(false);
  };

  const onPubish = async () => {
    setIsLoading(true);
    if (blog.edit) {
      await updateBlog({ ...blog, files }, onFinish);
    } else {
      await publishBlog({ ...blog, files }, onFinish);
    }
  };

  const setTitle = (title) => {
    setBlog((b) => ({ ...b, title }));
  };

  const setDescription = (description) => {
    setBlog((b) => ({ ...b, description }));
  };

  const setCategories = (categories) => {
    setBlog((b) => ({ ...b, categories }));
  };

  const validateContent = (content) => {
    if (!content) {
      return false;
    }
    return Boolean(Object.keys(content).length > 1);
  };

  const publishDisabled =
    !Boolean(files.length > 0) || !validateContent(blog.content);

  return (
    <Box>
      <ImageDrop files={files} setFiles={setFiles} />

      <Box mt={4} mb={4}>
        <label>Title</label>
        <Input
          mt={2}
          value={blog.title || ""}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Text mt={1} fontSize="xs" color="gray.400">
          Add title for your article
        </Text>
      </Box>

      <Box mt={2} mb={4}>
        <label>Description</label>
        <Textarea
          mt={2}
          value={blog.description || ""}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Text mt={1} fontSize="xs" color="gray.400">
          Tell a little about the blog for your readers
        </Text>
      </Box>

      <Box mt={2} mb={4}>
        <label>Catergory</label>
        <Box mt={2}>
          <Select
            options={options}
            isMulti
            placeholder="Add category"
            value={blog.categories || []}
            onChange={setCategories}
          />
        </Box>
        <Text mt={1} fontSize="xs" color="gray.400">
          Add category (up to 3) so readers know what is your article about
        </Text>
      </Box>

      {blog.content && (
        <Flex justifyContent="end">
          <Button mr={4} onClick={onFinish}>
            Cancel
          </Button>
          <Button
            isDisabled={publishDisabled}
            colorScheme="brand"
            onClick={onPubish}
          >
            {blog.edit ? "Publish Edit" : "Publish"}
          </Button>
        </Flex>
      )}

      <Modal isOpen={isLoading} isCentered>
        <ModalOverlay />
        <ModalContent w="fit-content">
          <ModalHeader textAlign="center">Publishing Article</ModalHeader>
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <Spinner mb={5} size="lg" />
            <Text fontSize="sm" color="gray.600" mb={4}>
              Please wait until blog is published!
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BlogForm;
