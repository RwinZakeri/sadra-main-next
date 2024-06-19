import React from "react";
// import ClassDetailPage from "@/components/templates/ClassDetailPage";
import dynamic from "next/dynamic";

const ClassDetailPageHy = dynamic(
  () => import("@/components/templates/ClassDetailPage"),
  { suspense: true, ssr: false }
);

function ClassDetail({ data }) {
  return (
    <div>
      <ClassDetailPageHy data={data} />
      {/* <h1>hello</h1> */}
    </div>
  );
}

export default ClassDetail;

export async function getServerSideProps(context) {
  const { classId } = context.params;

  const res = await fetch(`http://localhost:3001/api/classes/data/${classId}`, {
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
    },
  });
  const { data } = await res.json();
  return { props: { data } };
}

// export async function getStaticPaths() {
//   const res = await fetch("http://localhost:3001/api/classes/data", {
//     headers: {
//       "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
//     },
//   });
//   const { data } = await res.json();
//   const paths = data.map((item) => ({
//     params: { classId: item.id },
//   }));
//   return {
//     paths,
//     fallback: false,
//   };
// }
