import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import RecordCard from "./RecordCard";
import { getRecords } from "../firebase/recordService";
import { useEffect, useState } from "react";

const Records = ({ id }) => {
  const [records, setRecords] = useState([]);
  const fetchRecords = async (idS) => {
    const records = await getRecords(id);
    setRecords(records);
  };
  useEffect(() => {
    fetchRecords();
  }, []);
  return (
    <VerticalTimeline>
      {records.map((record, index) => (
        <RecordCard key={index} record={record} />
      ))}
    </VerticalTimeline>
  );
};

export default Records;
