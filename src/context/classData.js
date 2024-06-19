import React, { useContext } from "react";
import { createContext } from "react";

export const ClassDataContext = createContext();

function ClassData({ children }) {
  return (
    <ClassDataContext.Provider value={props.data}>
      {props.children}
    </ClassDataContext.Provider>
  );
}

export default ClassData;

export async function getStaticProps() {
  const res = await fetch("http://localhost:3001/api/classes/data", {
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
    },
  });
  const { data } = await res.json();

  return {
    props: {
      data,
    },
  };
}

export const useGlobalContext = () => useContext(ClassDataContext);
