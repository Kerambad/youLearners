import { useEffect, useState } from 'react';
import axios from 'axios';
import { Mark } from '../models/Mark';

export default function useManageMarks() {
  const [marks, setMarks] = useState([])


  useEffect(() => {
    fetchAllMarks();
  }, [])

  const fetchAllMarks = () => { 
    axios.get("/api/bookmarks")
    .then((response) => response.data)
    .then((data) => setMarks(data))
    .catch((error) => console.log(error))
   }

   const addNewMark = (newMark: Mark) => {
    axios.post("/api/bookmarks", newMark)
      .then((response) => response.data)
      .then(() => fetchAllMarks())
      .catch((error) => console.log(error))
  }
  const removeMarkById = (markId: string) => {
    axios.delete("/api/bookmarks/" + markId)
      .then(() => fetchAllMarks())
      .catch((error) => console.log(error))
  }
  const updateMark = (markId: string,newMark: Mark) => {
    axios.put("/api/bookmarks/" + markId, newMark)
      .then(() => fetchAllMarks())
      .catch((error) => console.log(error))
  }

  return {marks, addNewMark, removeMarkById, updateMark}
}