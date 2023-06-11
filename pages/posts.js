import { useState } from "react";
import {
  Card,
  CardBody,
  Grid,
  GridItem,
  useColorModeValue,
} from "@chakra-ui/react";

import PostTable from "../components/PostTable";
import BlogForm from "../components/forms/BlogForm";
import TinyEditor from "../components/TinyEditor";

const PostsPage = () => {
  const [blog, setBlog] = useState({});
  const [files, setFiles] = useState([]);

  return (
    <Grid
      templateColumns="repeat(12, 1fr)"
      height="calc(100vh - 100px)"
      p={5}
      gap={3}
    >
      <GridItem colSpan={4}>
        <Card
          bg={useColorModeValue("white", "gray.800")}
          boxShadow="xl"
          position="sticky"
          top="80px"
        >
          <CardBody>
            <BlogForm
              blog={blog}
              setBlog={setBlog}
              files={files}
              setFiles={setFiles}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem colSpan={8}>
        {blog.title !== undefined ? (
          <TinyEditor blog={blog} setBlog={setBlog} />
        ) : (
          <PostTable setBlogToEdit={setBlog} setFiles={setFiles} />
        )}
      </GridItem>
    </Grid>
  );
};

export default PostsPage;
