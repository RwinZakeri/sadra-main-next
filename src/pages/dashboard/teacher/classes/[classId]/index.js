import React from "react";
// import EditClass from "./EditClass";
import EditClass from "@/components/templates/dashboard/admin/classes/[classId]/EditClass";
import { useRouter } from "next/router";
function page() {
  const router = useRouter();
  const { classId } = router.query;

  return <EditClass classId={classId} />;
}

export default page;
