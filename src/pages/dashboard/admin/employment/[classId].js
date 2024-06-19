import React from "react";
import { useRouter } from "next/router";
import EditEmployment from "@/components/templates/dashboard/admin/employment/EditEmployment";

function page() {
  const router = useRouter();
  const { emplymentId } = router.query
  return <EditEmployment emplymentId={emplymentId} />;
}

export default page;
