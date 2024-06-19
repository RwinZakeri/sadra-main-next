import React from "react";
import EventDetail from "@/components/templates/EventDetail";

function Events({ data }) {
  return (
    <div>
      <EventDetail data={data} />
    </div>
  );
}

export default Events;

export async function getServerSideProps(context) {
  const { eventId } = context.params;

  const res = await fetch(`http://localhost:3001/api/events/data/${eventId}`, {
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

// export async function getStaticPaths() {
//   const res = await fetch("http://localhost:3001/api/events/data", {
//     headers: {
//       "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
//     },
//   });
//   const { data } = await res.json();
//   const paths = data.map((item) => ({ params: { eventId: String(item.id) } }));
//   return {
//     paths,
//     fallback: false,
//   };
// }
