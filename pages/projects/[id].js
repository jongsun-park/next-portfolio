import Layout from "src/components/layout";
import { getAllProjectIds, getProjectData } from "src/lib/projects";
import MarkdownContent from "src/lib/md2html";
import { PageContainer } from "src/styles/container";
import Date from "src/components/date";
import { motion } from "framer-motion";
import Image from "next/image";
import styled from "styled-components";

export default function Project({ projectData }) {
  const { title, description, body, thumbnail } = projectData.fields;
  const { id, createdAt } = projectData.sys;
  return (
    <Layout title={title}>
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
              width="500"
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
    background: var(--color-light);
    img {
      object-fit: contain;
      transform: scale(0.9);
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
