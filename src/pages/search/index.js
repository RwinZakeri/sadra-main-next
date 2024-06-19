import React from "react";
import SearchPage from "@/components/templates/searchPage.js";
import { useRouter } from "next/router";

function Search() {
  const router = useRouter();
  const { query } = router;
  const filters = { option: query.option, value: query.value };
  console.log(filters);
  return (
    <div>
      <SearchPage filters={filters} />
    </div>
  );
}

export default Search;
