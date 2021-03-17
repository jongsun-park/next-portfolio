import Head from "next/head";
import Layout from "../../components/layout";
import { getAllProjectIds, getProjectData } from "../../lib/projects";
import MarkdownContent from "../../lib/md2html";
import { PageContainer } from "../../styles/container";
import Date from "../../components/date";
import { motion } from "framer-motion";
import Image from "next/image";
import styled from "styled-components";

export default function Project({ projectData }) {
  const { title, description, body, thumbnail } = projectData.fields;
  const { id, createdAt } = projectData.sys;
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <ProjectContainer>
        <article>
          <motion.h1 className="page-title" layoutId={`${id}_title`}>
            {title}
          </motion.h1>
          <div className="page-date">
            <Date dateString={createdAt} />
          </div>
          <motion.div layoutId={`${id}_image`} className="project-image">
            <Image
              src={`https:${thumbnail.fields.file.url}`}
              width="auto"
              height="500"
            />
          </motion.div>
          <div className="page-content">
            <p>{description}</p>
            <MarkdownContent>{body}</MarkdownContent>
          </div>
        </article>
      </ProjectContainer>
    </Layout>
  );
}

const ProjectContainer = styled(PageContainer)`
  .project-image {
    display: grid;
    margin-top: 2rem;
    padding: 1rem;
    background: var(--color-light);
    img {
      object-fit: contain;
    }
  }
`;

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
