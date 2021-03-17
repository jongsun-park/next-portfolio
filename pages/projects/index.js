import Layout from "../../components/layout";
import Link from "next/link";
import { getAllProject } from "../../lib/projects";
import { Container } from "../../styles/container";
import { Button } from "../../styles/button";
import styled from "styled-components";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Projects({ total, projects }) {
  return (
    <Layout>
      <ProjectContainer>
        <h2 className="page-title">My Projects</h2>
        <small className="projects-total">Total: {total}</small>
        {projects.map((post, index) => {
          const { title, description, thumbnail } = post.fields;
          const { id } = post.sys;
          const index2digit = index + 1 < 10 ? "0" + (index + 1) : index;
          return (
            <div key={title} className="project-container">
              <div className="project-content">
                <motion.h3 className="project-title" layoutId={`${id}_title`}>
                  <span className="project-index">{index2digit}</span> {title}
                </motion.h3>
                <p className="project-description">{description}</p>
                <Link href={`/projects/${id}`}>
                  <a>
                    <Button>Details</Button>
                  </a>
                </Link>
              </div>
              <motion.div layoutId={`${id}_image`} className="project-image">
                <Image
                  src={`https:${thumbnail.fields.file.url}`}
                  layout="fill"
                />
              </motion.div>
            </div>
          );
        })}
      </ProjectContainer>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await getAllProject();
  const { total, items: projects } = data;
  return {
    props: {
      total,
      projects,
    },
  };
}

export const ProjectContainer = styled(Container)`
  .projects-total {
    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    color: var(--color-mint);
  }
  .project-container {
    margin: 2rem 0;
    display: flex;
    min-height: 40vw;

    > div {
      flex: 1;
    }
    .project-title {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      font-family: var(--font-secondary);
      max-width: 18ch;
    }
    .project-index {
      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: var(--color-mint);
      color: white;
      font-family: var(--font-primary);
    }
    .project-description {
      max-width: 60ch;
      margin-bottom: 0.5rem;
    }
    .project-image img {
      object-fit: contain;
      object-position: left;
    }
  }
`;
