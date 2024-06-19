import NewBlogDetails from "@/components/templates/NewBlogDetails";
import { useRouter } from "next/router";

function Blog({ data }) {
  const router = useRouter();
  const { blogId } = router.query;

  return (
    <div>
      <NewBlogDetails data={data} />
    </div>
  );
}

export default Blog;

export async function getServerSideProps(context) {
  const { blogId } = context.params;

  const res = await fetch(`http://localhost:3001/api/blog/data/${blogId}`, {
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
    },
  });
  const data = await res.json();
  return { props: { data } };
}

// export async function getStaticPaths() {
//   const res = await fetch("http://localhost:3001/api/blog/data/", {
//     headers: {
//       "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
//     },
//   });
//   const { data } = await res.json();
//   const paths = data.map((item) => ({
//     params: { blogId: String(item._id) },
//   }));
//   return {
//     paths,
//     fallback: false,
//   };
// }
