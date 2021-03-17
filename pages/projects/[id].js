import Head from "next/head";
import Layout from "../../components/layout";
import { getAllProjectIds, getProjectData } from "../../lib/projects";
import MarkdownContent from "../../lib/md2html";
import { PageContainer } from "../../styles/container";
import styled from "styled-components";
import Date from "../../components/date";

export default function Project({ projectData }) {
  const { title, description, body } = projectData.fields;
  const { createdAt } = projectData.sys;
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <PageContainer>
        <article>
          <h1 className="page-title">{title}</h1>
          <div className="page-date">
            <Date dateString={createdAt} />
          </div>
          <div className="page-content">
            <p>{description}</p>
            <MarkdownContent>{body}</MarkdownContent>
          </div>
        </article>
      </PageContainer>
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
