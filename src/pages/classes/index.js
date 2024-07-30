import React from "react";
import ClassesPage from "@/components/templates/ClassesPage";
import { useRouter } from "next/router";
function Classes({ data }) {
  const router = useRouter();
  const { query } = router;
  return (
    <div>
      <ClassesPage data={data} category={query.category} />
    </div>
  );
}

export default Classes;

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3001/api/classes/data`, {
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
