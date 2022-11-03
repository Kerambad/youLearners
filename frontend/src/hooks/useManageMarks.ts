import { useEffect, useState } from 'react';
import axios from 'axios';

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


  return {marks}
}