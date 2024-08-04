import HomePage from "@/components/templates/HomePage";
function Home({ data }) {
  return (
    <>
      <HomePage data={data} />
    </>
  );
}
export default Home;
export async function getStaticProps() {
  try {
    const res = await fetch("http://localhost:3001/api/classes/data", {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
      },
    });
    const { data } = await res.json();
    return {
      props: { data },
    };
  } catch (error) {
    // console.log(error.message);
  }
}
