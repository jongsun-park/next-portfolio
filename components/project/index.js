import Image from "next/image";
import Link from "next/link";
import { Container } from "../../styles/container";
import { Button } from "../../styles/button";
import styled from "styled-components";

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
              <div className="image-container">
                <Image
                  src={`https:${thumbnail.fields.file.url}`}
                  width="700"
                  height="700"
                />
              </div>
              <div className="text-container">
                <p className="project__index">
                  {index < 10 && "0"}
                  {index + 1}
                </p>
                <h3 className="project__title">{title}</h3>
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
    margin: 2rem 0 3rem;
    .image-container,
    .text-container {
      flex: 1;
    }
  }

  .text-image {
    .text-container {
      order: -1;
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
    max-width: 15ch;
  }
  .project__descrpition {
  }
`;

// export const Project = ({ allProjectData }) => {
//   const { loading, error, data } = useSelector((state) => state.contentful);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     fetchContentful(dispatch);
//   }, []);
//   return (
//     <Container className="projects">
//       <p className="section-tag">LASTEST WORK</p>
//       <h2 className="section-title">My Projects</h2>
//       <div>
//         <ul>
//           {loading ? (
//             <p>loading...</p>
//           ) : (
//             data.map((p, index) => (
//               <div
//                 key={p.fields.title}
//                 className={`${index % 2 === 0 ? "image-text" : "text-image"}`}
//               >
//                 <Image
//                   width="300"
//                   height="300"
//                   src={`https:${p.fields.thumbnail.fields.file.url}`}
//                 />
//                 <div>
//                   <p>{index + 1}</p>
//                   <h3>{p.fields.title}</h3>
//                   <p>{p.fields.description}</p>
//                   {p.fields.body && (
//                     <Link href={`/projects/${p.sys.id}`}>DETAIL</Link>
//                   )}
//                 </div>
//               </div>
//             ))
//           )}
//         </ul>
//       </div>
//     </Container>
//   );
// };
