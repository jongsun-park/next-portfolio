import Layout from "src/components/layout";
import { getSortedPostsData } from "src/lib/posts";
import { getAllProject } from "src/lib/projects";

import { Intro } from "src/components/intro";
import { Project } from "src/components/project";
import { content } from "src/content";
// import { Blog } from "src/components/blog";
import { Blog } from "src/components/blog/blog-swiper";

export default function Home({ allPostsData, allProjectData }) {
  return (
    <Layout title={content.title}>
      <Intro />
      <Project allProjectData={allProjectData} />
      <Blog allPostsData={allPostsData} />
    </Layout>
  );
}

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const allPostsData = getSortedPostsData();
  const allProjectData = await getAllProject();
  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    // props: allPostsData,
    props: { allPostsData, allProjectData: allProjectData.items },
  };
}
