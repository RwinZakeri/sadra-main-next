import React from "react";

// Component
import ClassCard from "./ClassCard";
import Card from "@mui/material/Card";
import Skeleton from "@mui/material/Skeleton";
import Divider from "@mui/material/Divider";
// Link
import Link from "next/link";
// Fetch data
export async function fetchData() {
  const res = await fetch("http://localhost:3001/api/classes/data", {
    cache: "no-store",
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY,
    },
  });
  const json = await res.json();
  if (!json) {
    throw Error("Couldn't fetch data");
  }
  return json;
}
function ClassesData({ category , data }) {

  if (!data) {
    return (
      <Card>
        <Skeleton variant="rectangular" width="100%" height={120} />
        <br />
        <hr />
        <Divider orientation="vertical" flexItem />
        <Skeleton variant="rectangular" width="100%" height={120} />
        <Divider orientation="vertical" flexItem />
        <br />
        <hr />
        <Skeleton variant="rectangular" width="100%" height={120} />
        <Divider orientation="vertical" flexItem />
        <br />
        <hr />
        <Skeleton variant="rectangular" width="100%" height={120} />
        <Divider orientation="vertical" flexItem />
        <br />
        <hr />
        <Skeleton variant="rectangular" width="100%" height={120} />
        <Divider orientation="vertical" flexItem />
        <br />
        <hr />
        <Skeleton variant="rectangular" width="100%" height={120} />
      </Card>
    );
  }
  return (
    <>
      {category ? (
        category == "all" ? (
          <div className="CardBoxContainer">
            {data?.map(
              (item) =>
                item.isShown && (
                  <Link key={item.id} href={`/classes/${item.id}`}>
                    <ClassCard key={item.id} {...item} />
                  </Link>
                )
            )}
          </div>
        ) : (
          <div className="CardBoxContainer">
            {data?.filter((item) => item.category === category || false)
              .length ? (
              data
                .filter((item) => item.category == category)
                .slice(0, 7)
                .map(
                  (item) =>
                    item.isShown && (
                      <Link key={item.id} href={`/classes/${item.id}`}>
                        <ClassCard key={item.id} {...item} />
                      </Link>
                    )
                )
            ) : (
              <h1>دوره ای با این کتگوری وجود ندارد</h1>
            )}
          </div>
        )
      ) : (
        <div className="CardBoxContainer">
          {data?.map(
            (item) =>
              item.isShown && (
                <Link key={item.id} href={`/classes/${item.id}`}>
                  <ClassCard key={item.id} {...item} />
                </Link>
              )
          )}
        </div>
      )}
    </>
  );
}

export default ClassesData;

