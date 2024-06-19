import React from "react";
import EditSuccess from "@/components/templates/dashboard/admin/success/EditSuccess";
import { useRouter } from "next/router";
function page({ params }) {
  const router = useRouter();
  const { successId } = router.query;
  return <EditSuccess successId={successId} />;
}

export default page;
