import React from "react";
import EmploymentForm from "@/components/templates/EmploymentForm";
import { useRouter } from "next/router";
function EmploymentDetail({ data }) {
  const router = useRouter();
  const { query } = useRouter();

  return (
    <div>
      <EmploymentForm employementId={query.employementId} data={data} />
    </div>
  );
}

export default EmploymentDetail;

export async function getServerSideProps(context) {
  const { employementId } = context.params;

  const res = await fetch(
    `http://localhost:3001/api/employment/data/${employementId}`,
    {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
      },
    }
  );
  const { data } = await res.json();
  return { props: { data } };
}

// export async function getStaticPaths() {
//   const res = await fetch("http://localhost:3001/api/employment/data", {
//     headers: {
//       "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
//     },
//   });
//   const { data } = await res.json();
//   const paths = data.map((item) => ({
//     params: { employementId: String(item._id) },
//   }));
//   return {
//     paths,
//     fallback: false,
//   };
// }
