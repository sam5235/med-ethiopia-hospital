import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import readingTime from "reading-time";
import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { v4 } from "uuid";

import { auth, db, storage } from "../config/firebase";

export const getBlogs = async () => {
  const blogs = [];
  const ourQ = query(
    collection(db, "blogs"),
    where("publisher", "==", auth.currentUser.uid)
  );
  const querySnapshot = await getDocs(ourQ);
  querySnapshot.forEach((doc) => {
    blogs.push({ ...doc.data(), id: doc.id });
  });

  return blogs;
};

export const uploadImage = async (image) => {
  if (!image || !image.type?.match('image.*')) {
    return image.preview;
  }
  const imageRef = ref(storage, `blog/${image.name + v4()}`);
  const snapshot = await uploadBytes(imageRef, image);
  return await getDownloadURL(snapshot.ref);
};

export const uploadImageWithProgress = async (image, onSuccess, onProgress) => {
  const imageRef = ref(storage, `blog/${image.name + v4()}`);
  const uploadTask = uploadBytesResumable(imageRef, image);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onProgress(progress);
    },
    (error) => { },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        onSuccess(downloadURL);
      });
    }
  );
};

export const publishBlog = async (blog, onFinish) => {
  const img = blog.files[0];
  delete blog["files"];

  const data = {
    ...blog,
    publisher: auth.currentUser.uid,
    status: "pending",
    length: readingTime(JSON.stringify(blog.content)),
    datePublished: new Date().toISOString(),
  };

  uploadImage(img)
    .then((url) => {
      addDoc(collection(db, "blogs"), { ...data, coverImage: url }).then(
        (snapshot) => {
          console.log({ snapshot });
          onFinish();
        }
      );
    })
    .catch();
};

export const updateBlog = async (blog, onFinish) => {
  const img = blog.files[0];
  delete blog["files"];
  delete blog["edit"];

  const data = {
    ...blog,
    dateUpdated: new Date().toISOString(),
  };

  uploadImage(img)
    .then((url) => {
      setDoc(doc(db, "blogs", blog.id), { ...data, coverImage: url }, { merge: true }).then(
        () => {
          onFinish();
        }
      );
    })
    .catch();
};

