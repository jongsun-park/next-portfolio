import Image from "next/image";
import Link from "next/link";
import { Container } from "src/styles/container";
import { Button } from "src/styles/button";
import styled from "styled-components";
import { motion } from "framer-motion";

export const Project = ({ allProjectData }) => {
  return (
    <ProjectContainer>
      <p className="section-tag">LASTEST WORK</p>
      <h2 className="section-title">My Projects</h2>
      <div className="projects">
        {allProjectData.map((p, index) => {
          const { title, description, thumbnail } = p.fields;
          const { id } = p.sys;
          return (
            <div
              key={id}
              className={index % 2 === 0 ? "image-text" : "text-image"}
            >
              <motion.div className="image-container" layoutId={`${id}_image`}>
                <Image
                  src={`https:${thumbnail.fields.file.url}`}
                  width="500"
                  height="500"
                />
              </motion.div>
              <div className="text-container">
                <p className="project__index">
                  {index < 10 && "0"}
                  {index + 1}
                </p>
                <motion.h3 className="project__title" layoutId={`${id}_title`}>
                  {title}
                </motion.h3>
                <p className="project__description">{description}</p>
                <Link href={`/projects/${id}`}>
                  <a>
                    <Button>Details</Button>
                  </a>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </ProjectContainer>
  );
};

const ProjectContainer = styled(Container)`
  .image-text,
  .text-image {
    display: flex;
    justify-content: space-around;
    margin: 2rem 0 3rem;
    .image-container,
    .text-container {
      flex: 1;
      padding: 1rem 2rem;
    }
    .image-container {
      display: grid;
      img {
        max-height: 300px;
        object-fit: cover;
      }
    }
  }

  .text-image {
    .text-container {
      order: -1;
      text-align: right;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }

  .project__index {
    margin: 0 0 1rem;
    font-weight: bold;
    color: var(--color-light);
    font-size: 4rem;
    line-height: 1;
  }
  .project__title {
    margin: 0;
    font-size: 2rem;
    font-family: var(--font-secondary);
  }
  .project__descrpition {
  }

  @media (max-width: 576px) {
    // background: yellow;
    .image-text,
    .text-image {
      max-width: 100%;
      flex-direction: column;
      .text-container {
        max-width: 100%;
        order: -1;
        margin-bottom: 2rem;
        text-align: left;
        align-items: flex-start;
        padding: 0;

        .project__title {
          font-size: 1.4rem;
          max-width: 90%;
          padding-left: 0;
        }
        .project__index {
          font-size: 3rem;
          margin-bottom: 10px;
        }
      }
      .image-container {
        max-width: 100%;
        padding: 0;
      }
    }
  }
`;
