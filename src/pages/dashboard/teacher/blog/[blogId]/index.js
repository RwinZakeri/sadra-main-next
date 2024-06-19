import React from "react";
import EditBlog from "@/components/templates/dashboard/teacher/blogs/blogId/EditBlog";
import { useRouter } from "next/router";
function page() {
  const router = useRouter();
  const { blogId } = router.query;

  return <EditBlog blogId={blogId} />;
}

export default page;
