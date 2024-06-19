import React from "react";
// import EventsPage from '@/components/templates/EventPage'
import EventsPage from "@/components/templates/EventPage";

function Events({ data }) {
  return (
    <div>
      <EventsPage data={data} />
    </div>
  );
}

export default Events;

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3001/api/events/data", {
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
