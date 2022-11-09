import { useEffect, useState } from 'react';
import axios from 'axios';
import { Mark } from '../models/Mark';

export default function useManageMarks() {

  const [marks, setMarks] = useState([])
  const [sections, setSections] = useState([])
  const [errorMessages, setErrorMessages] = useState<string[]>([])
  

  useEffect(() => {
    fetchAllMarks();
  }, [])

  const fetchAllMarks = () => {
    axios.get("/api/bookmarks")
      .then((response) => response.data)
      .then((data) => setMarks(data))
      .catch(errors => setErrorMessages((old) => old.concat(["Server: " + errors.response.data])))

    axios.get("/api/sections")
      .then((response) => response.data)
      .then((data) => setSections(data))
      .catch(errors => setErrorMessages((old) => old.concat(["Server: " + errors.response.data])))
  }


  const addNewMark = (newMark: Mark) => {
    if (!newMark.endTime) {
      axios.post("/api/bookmarks", newMark)
        .then((response) => response.data)
        .then(() => fetchAllMarks())
        .catch(errors => setErrorMessages((old) => old.concat(["Server: " + errors.response.data])))
    }
    else {
      axios.post("/api/sections", newMark)
        .then((response) => response.data)
        .then(() => fetchAllMarks())
        .catch(errors => setErrorMessages((old) => old.concat(["Server: " + errors.response.data])))
    }
  }

  const removeMarkById = (markId: string, isSection: boolean) => {
    if (isSection) {
      axios.delete("/api/sections/" + markId)
        .then(() => fetchAllMarks())
        .catch(errors => setErrorMessages((old) => old.concat(["Server: " + errors.response.data])))
    }
    else {
      axios.delete("/api/bookmarks/" + markId)
        .then(() => fetchAllMarks())
        .catch(errors => setErrorMessages((old) => old.concat(["Server: " + errors.response.data])))
    }
  }

  const updateMark = (markId: string, newMark: Mark) => {
    if (newMark.endTime) {
      axios.put("/api/sections/" + markId, newMark)
        .then(() => fetchAllMarks())
        .catch(errors => setErrorMessages((old) => old.concat(["Server: " + errors.response.data])))
    }
    else {
      axios.put("/api/bookmarks/" + markId, newMark)
        .then(() => fetchAllMarks())
        .catch(errors => setErrorMessages((old) => old.concat(["Server: " + errors.response.data])))
    }

  }

  return { marks: marks.concat(sections), addNewMark, removeMarkById, updateMark, errorMessages, setErrorMessages }
}