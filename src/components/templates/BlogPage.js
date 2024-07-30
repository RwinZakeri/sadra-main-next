import Link from "next/link";
// MUI
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
// Components
import BlogCard from "../module/blog_module/BlogCard";
import SearchBox from "../module/SearchBox";

function BlogPage({ data, query }) {
  if (!data.data) {
    return (
      <>
        <h1 align="center">در حال دریافت اطلاعات</h1>
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
      </>
    );
  }
  //   const matchAuthorWithUser = (authorName, authorLastName) => {
  //     const matchedUser = users.find(
  //       (user) => user.name === authorName && user.lastName === authorLastName
  //     );
  //     return matchedUser;
  //   };

  // taggggggg don't touch

  const tags = data.data
    .map((item) => item.hashtags.trim())
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <>
      <div className="hero" style={{ maxWidth: "1920px", margin: "0 auto" }}>
        <div className="Data_Container_hero">
          <h1>مؤسسه صدرا</h1>
          <h2>استعدادیابی مهارت افزایی و معرفی به بازار کار</h2>
          <p>
            با شرکت در دوره‌های آموزشی صدرا، از صفر شروع کن و در مسیر یادگیری با
            بهترین متد‌های آموزشی ما همراه شو، تا ما پلی باشیم برای ورود تضمینی
            به بازار کار
          </p>
          <SearchBox firstWidth={"100%"} />
          <div className="tags" dir="rtl">
            {tags.map((tag) => (
              <Link key={tag} href={`/blog?tag=${tag}`} className="tag">
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div
        className="blogCardsContainer"
        style={{ marginTop: "5rem", marginBottom: "2rem" }}
      >
        <Grid container sx={{ display: "flex" }}>
          {Object.keys(query).length
            ? data.data
                .filter((item) => item.hashtags === query.tag)
                .map((item) => (
                  <Grid item key={item.id} xs={12} sm={6} md={4}>
                    <Link href={`/blog/${item.id}`}>
                      <BlogCard {...item} />
                    </Link>
                  </Grid>
                ))
            : data.data.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4}>
                  <Link href={`/blog/${item.id}`}>
                    <BlogCard {...item} />
                  </Link>
                </Grid>
              ))}
        </Grid>
      </div>
    </>
  );
}

export default BlogPage;
