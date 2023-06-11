import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import {
  doc,
  setDoc,
  getDocs,
  where,
  collection,
  query,
  getDoc,
} from "firebase/firestore";
import { secondaryAuth, db, auth } from "../config/firebase";

const filterMyPatients = () =>
  where("hospitals", "array-contains", auth.currentUser.uid);

const parsePatient = (doc) => {
  return { ...doc.data(), id: doc.id, history: ["Typhod", "FLU", "MALARIA"] };
};

export const filterAllPatients = async (phone) => {
  const Lists = [];
  const phoneq = query(
    collection(db, "patients"),
    where("phone", ">=", phone), where('phone', "<=", phone + '\uf8ff')
  );

  const querySnapshot = await getDocs(phoneq);
  querySnapshot.forEach((doc) => {
    Lists.push(parsePatient(doc));
  });
  return Lists;
};

export const getPatientById = async (id) => {
  const patient = await getDoc(doc(db, "patients", id));
  console.log(patient.data(), id);
  return patient.data();

}

export const getPatients = async () => {
  const patients = [];
  const ourQ = query(collection(db, "patients"), filterMyPatients());
  const querySnapshot = await getDocs(ourQ);
  querySnapshot.forEach((doc) => {
    patients.push(parsePatient(doc));
  });

  return patients;
};

export const filterPatients = async (queries) => {
  const Lists = [];

  const nameq = query(
    collection(db, "patients"),
    where("name", "==", queries),
    filterMyPatients()
  );
  const phoneq = query(
    collection(db, "patients"),
    where("phone", "==", queries),
    filterMyPatients()
  );

  const querySnapshot = await getDocs(nameq);
  console.log(querySnapshot);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc);
    Lists.push(parsePatient(doc));
  });
  
  const querySnapshot2 = await getDocs(phoneq);
  querySnapshot2.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    Lists.push(parsePatient(doc));
  });

  return Lists;
};
export const RegisterPatient = async (List, onFinish, onFail) => {
  createUserWithEmailAndPassword(secondaryAuth, List.email, List.password)
    .then((cred) => {
      // creating patients document
      setDoc(doc(db, "patients", cred.user.uid), {
        ...List,
        createdAt: new Date(),
        creator: auth.currentUser.uid,
        hospitals: [auth.currentUser.uid],
      }).then(() => {
        signOut(secondaryAuth);
        onFinish({ ...List, id: cred.user.uid });
      });
    })

    .catch((error) => {
      onFail();
      console.log({ error });
    });
};
