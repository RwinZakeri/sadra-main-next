import React from "react";
import StudentSuccessPage from "@/components/templates/StudentSuccessPage";

function StudentSuccess({ data }) {
  return (
    <div>
      <StudentSuccessPage data={data} />
    </div>
  );
}

export default StudentSuccess;

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3001/api/student-success/data`, {
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
