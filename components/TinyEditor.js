import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useColorMode } from "@chakra-ui/react";
import { uploadImage } from "../firebase/blogServices";
import { EDITOR_PLUGIN, EDITOR_TOOLBAR } from "../utils";

const BlogEditor = ({ theme, onEditorChange, editorRef, content }) => {
  const images_upload_handler = (blobInfo) => {
    return uploadImage(blobInfo.blob());
  };
  return (
    <Editor
      tinymceScriptSrc={"/tinymce/js/tinymce/tinymce.min.js"}
      onInit={(evt, editor) => (editorRef.current = editor)}
      value={content}
      init={{
        selector: "div",
        menubar: false,
        skin: theme === "dark" ? "oxide-dark" : "oxide",
        content_css: theme === "dark" ? "dark" : "default",
        height: "100%",
        plugins: EDITOR_PLUGIN,
        // statusbar: false,
        toolbar: EDITOR_TOOLBAR,
        images_upload_handler,
      }}
      onEditorChange={onEditorChange}
    />
  );
};

const TinyEditor = ({ blog, setBlog }) => {
  const { colorMode } = useColorMode();
  const editorRef = useRef(null);

  const content = blog.content;

  const setContent = (content) => {
    setBlog((b) => ({ ...b, content }));
  };

  const onEditorChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.getContent());
    }
  };

  if (colorMode === "light") {
    return (
      <BlogEditor
        key={"light-editor"}
        theme="light"
        content={content}
        editorRef={editorRef}
        onEditorChange={onEditorChange}
      />
    );
  }

  return (
    <BlogEditor
      key={"dark-editor"}
      theme="dark"
      content={content}
      editorRef={editorRef}
      onEditorChange={onEditorChange}
    />
  );
};

export default TinyEditor;
