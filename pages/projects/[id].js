import Head from "next/head";
import Layout from "../../components/layout";
import { getAllProjectIds, getProjectData } from "../../lib/projects";
import MarkdownContent from "../../lib/md2html";

export default function Project({ projectData }) {
  const { title, description, body } = projectData.fields;
  const { createdAt } = projectData.sys;
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        <h1>{title}</h1>
        <time>{createdAt}</time>
        <p>{description}</p>
        <MarkdownContent>{body}</MarkdownContent>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getAllProjectIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const projectData = await getProjectData(params.id);
  return {
    props: { projectData },
  };
}
