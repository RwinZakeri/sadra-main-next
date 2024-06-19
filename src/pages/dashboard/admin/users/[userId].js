import React from "react";
import EditUser from "@/components/templates/dashboard/admin/users/EditUser";

import { useRouter } from "next/router";

function page() {
  const router = useRouter();

  const { userId } = router.query;
  return <EditUser userId={userId} />;
}

export default page;
