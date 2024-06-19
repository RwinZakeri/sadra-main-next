import React from "react";
import EditClass from "@/components/templates/dashboard/teacher/classes/[classId]/EditClass";
import { useRouter } from "next/router";
function page() {
  const router = useRouter();
  const { classId } = router.query;

  return <EditClass classId={classId} />;
}

export default page;
