import React from "react";
import EmploymentPage from "@/components/templates/Employement";

function Employment({ data }) {
  return (
    <>
      <EmploymentPage data={data} />
    </>
  );
}

export default Employment;

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3001/api/employment/data`, {
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
    },
  });
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
