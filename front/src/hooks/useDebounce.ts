import React, { useState, useEffect } from "react";
// import { useDebounce } from "use-debounce";

export default function useDebounce(value: string, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value);

  


  useEffect(()=>{
    const handler = setTimeout(() => {
    setDebounceValue(value);
  },delay);
  },[value])

  return debounceValue;
}
