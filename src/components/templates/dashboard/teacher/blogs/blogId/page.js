import React from "react";
import EditBlog from "./EditBlog";

function page({ params }) {
  const { blogId } = params;

  return <EditBlog blogId={blogId} />;
}

export default page;
