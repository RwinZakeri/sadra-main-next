import React from "react";
import Link from "next/link";
// Component
// Mui
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
// fetch data
export async function fetchData() {
  const res = await fetch("http://localhost:3001/api/events/data", {
    cache: "no-store",
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
    },
  });
  const json = await res.json();
  if (!json) {
    throw Error("error while fetch data");
  }
  return json;
}

const EventCardHyrationErr = dynamic(() => import("./EventCard"), {
  ssr: false,
});

function EventData({ data }) {
  if (!data.length) {
    return (
      <div className="skeltionContainer">
        <Stack spacing={1}>
          {/* For variant="text", adjust the height via font-size */}
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
          {/* For variant="text", adjust the height via font-size */}
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
          {/* For variant="text", adjust the height via font-size */}
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
          {/* For variant="text", adjust the height via font-size */}
        </Stack>
      </div>
    );
  }
  return (
    <div>
      <div style={{ paddingRight: "6%" }} className="event_card_info">
        {data?.map(
          (item) =>
            item && (
              <Link key={item.id} href={`/events/${item.id}`}>
                <EventCardHyrationErr key={item.id} {...item} />
              </Link>
            )
        )}
      </div>
    </div>
  );
}

export default EventData;
