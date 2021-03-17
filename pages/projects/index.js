import Layout from "../../components/layout";
import Link from "next/link";
import { getAllProject } from "../../lib/projects";
import { Container } from "../../styles/container";
import { Button } from "../../styles/button";
import styled from "styled-components";

export default function Projects({ total, posts }) {
  return (
    <Layout>
      <ProjectContainer>
        <h2 className="page-title">My Projects</h2>
        <small className="projects-total">Total: {total}</small>
        {posts.map((post, index) => {
          const { title, description } = post.fields;
          const { id } = post.sys;
          const index2digit = index + 1 < 10 ? "0" + (index + 1) : index;
          return (
            <div key={title} className="project-container">
              <h3 className="project-title">
                <span className="project-index">{index2digit}</span> {title}
              </h3>
              <p className="project-description">{description}</p>
              <Link href={`/projects/${id}`}>
                <a>
                  <Button>Details</Button>
                </a>
              </Link>
            </div>
          );
        })}
      </ProjectContainer>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await getAllProject();
  const { total, items: posts } = data;
  return {
    props: {
      total,
      posts,
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
    .project-title {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      font-family: var(--font-secondary);
    }
    .project-index {
      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: var(--color-mint);
      color: white;
      font-family: var(--font-primary);
    }
    .project-description {
      max-width: 80ch;
      margin-bottom: 0.5rem;
    }
  }
`;
