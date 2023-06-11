import {
  doc,
  addDoc,
  collection,
  updateDoc,
  arrayUnion,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";

const parseRecord = async (data) => {
  const getHospitalName = await getDoc(
    doc(db, "health_centers", data.data().hospital)
  );
  const getPatient = await getDoc(doc(db, "patients", data.data().patientId));
  return {
    ...data.data(),
    _hospital: getHospitalName.data(),
    _patient: getPatient.data(),
  };
};

export const getRecords = async (patientId) => {
  const records = [];
  const ourQ = query(
    collection(db, "records"),
    where("patientId", "==", patientId)
  );
  const querySnapshot = await getDocs(ourQ);
  for (const data of querySnapshot.docs) {
    records.push(await parseRecord(data));
  }
  return records;
};

export const addRecord = async (record, onFinish, onFail) => {
  console.log(record);
  addDoc(collection(db, "records"), {
    ...record,
    createdAt: new Date(),
    hospital: auth.currentUser.uid,
  })
    .then(async () => {
      const docref = doc(db, "patients", record.patientId);
      await updateDoc(docref, { hospitals: arrayUnion(auth.currentUser.uid) });
      onFinish();
    })
    .catch((err) => {
      onFail();
      console.error(err);
    });
};
