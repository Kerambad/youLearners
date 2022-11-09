import { useEffect, useState } from 'react';
import axios from 'axios';
import { Mark } from '../models/Mark';

export default function useManageMarks() {

  const [marks, setMarks] = useState([])
  const [sections, setSections] = useState([])

  useEffect(() => {
    fetchAllMarks();
  }, [])

  const fetchAllMarks = () => {
    console.log("fetch!");
    axios.get("/api/bookmarks")
      .then((response) => response.data)
      .then((data) => setMarks(data))
      .catch((error) => console.log(error))

    axios.get("/api/sections")
      .then((response) => response.data)
      .then((data) => setSections(data))
      .catch((error) => console.log(error))
  }


  const addNewMark = (newMark: Mark) => {
    if (!newMark.endTime) {
      axios.post("/api/bookmarks", newMark)
        .then((response) => response.data)
        .then(() => fetchAllMarks())
        .catch((error) => console.log(error))
    }
    else {
      axios.post("/api/sections", newMark)
        .then((response) => response.data)
        .then(() => fetchAllMarks())
        .catch((error) => console.log(error))
    }
  }

  const removeMarkById = (markId: string, isSection: boolean) => {
    if (isSection) {
      console.log("call delete Axios section");
      axios.delete("/api/sections/" + markId)
        .then(() => fetchAllMarks())
        .catch((error) => console.log(error))
    }
    else {
      console.log("call delete Axios book");
      axios.delete("/api/bookmarks/" + markId)
        .then(() => fetchAllMarks())
        .catch((error) => console.log(error))
    }
  }

  const updateMark = (markId: string, newMark: Mark) => {
    if (newMark.endTime) {
      axios.put("/api/sections/" + markId, newMark)
        .then(() => fetchAllMarks())
        .catch((error) => console.log(error))
    }
    else {
      axios.put("/api/bookmarks/" + markId, newMark)
        .then(() => fetchAllMarks())
        .catch((error) => console.log(error))
    }

  }

  return { marks: marks.concat(sections), addNewMark, removeMarkById, updateMark }
}