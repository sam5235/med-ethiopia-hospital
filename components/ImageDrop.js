import React, { useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { SlCloudUpload, SlClose } from "react-icons/sl";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
};

function ImageDrop({ files, setFiles }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <Box key={file.name} position="relative">
      <Image
        src={file.preview}
        w="100%"
        maxH={300}
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
      <Button
        onClick={() => setFiles([])}
        colorScheme="red"
        position="absolute"
        boxShadow="2xl"
        rounded="3xl"
        p={0}
        right={2}
        top={2}
      >
        <Icon as={SlClose} fontSize="lg" color="white" />
      </Button>
    </Box>
  ));

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <Box
      border={files.length ? 0 : 2}
      borderStyle="dashed"
      borderColor="gray.500"
      borderRadius={5}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      _hover={{
        borderColor: "blue.500",
        bg: useColorModeValue("blue.50", "gray.900"),
      }}
      p={files.length ? 0 : 5}
      h={250}
    >
      <Box
        {...getRootProps({ className: "dropzone" })}
        h="100%"
        cursor="pointer"
      >
        <input {...getInputProps()} />
        {thumbs.length === 0 && (
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Icon as={SlCloudUpload} fontSize="4xl" color="blue.500" mb="2" />

            <Text fontSize="xs" textAlign="center" color="gray.500">
              Drag and drop the cover image or click here User high quaity image
              to make it more inviting to readers
            </Text>
          </Flex>
        )}
      </Box>
      <Box sx={thumbsContainer}>{thumbs}</Box>
    </Box>
  );
}

export default ImageDrop;
