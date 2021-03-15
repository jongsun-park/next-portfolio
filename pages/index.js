import Head from "next/head";

import Layout from "../components/layout";
import { getSortedPostsData } from "../lib/posts";
import { getAllProject } from "../lib/projects";

import { Intro } from "../components/intro";
import { Project } from "../components/project";
import { content } from "../content";

import { Blog } from "../components/blog";
const { title } = content;

export default function Home({ allPostsData, allProjectData }) {
  return (
    <Layout home>
      <Head>
        <title>{title}</title>
      </Head>
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
