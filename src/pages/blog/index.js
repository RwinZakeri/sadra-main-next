import React from "react";
import BlogPage from "@/components/templates/BlogPage";
// import { useRouter } from "next/navigation";
import { useRouter } from "next/router";

function Blog({ data }) {
  const { query } = useRouter();
  return (
    <div>
      <BlogPage data={data} query={query} />
    </div>
  );
}

export default Blog;

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3001/api/blog/data", {
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
const res = await fetch("http://localhost:3001/api/blog/data", {
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
  },
});
const data = await res.json();
console.log(data);

// export async function getStaticPaths(){
//   const res = await fetch("http://localhost:3001/api/blog/data")
//   const {data} = await res.json()
//   const paths = data.map(item => ({params : {}}))
//   return {
//     props : {
//       data
//     }
//   }
// }
