import Layout from "../../components/layout";
import { getSortedPostsData } from "../../lib/posts";
import { Container } from "../../styles/container";
import { Button } from "../../styles/button";
import styled from "styled-components";
import Date from "../../components/date";
import Link from "next/link";
import { useState } from "react";

const Pagination = ({ lastIndex, pageIndex, setPageIndex }) => {
  return (
    <div className="pagination-container">
      {new Array(lastIndex).fill("").map((el, index) => {
        return (
          <Button
            key={`pagination-${index}`}
            className={`${index + 1 === pageIndex ? "active" : ""}`}
            onClick={() => setPageIndex(index + 1)}
          >
            {index + 1}
          </Button>
        );
      })}
    </div>
  );
};

export default function Posts({ postsData }) {
  const numPerPage = 5;
  const [pageIndex, setPageIndex] = useState(1);
  const lastIndex = Math.ceil(postsData.length / numPerPage);

  return (
    <Layout>
      <PostContainer>
        <h2 className="page-title">My Posts</h2>
        <div className="posts">
          {postsData.map(({ id, title, date }, index) => {
            // page 1 -> index: 0 1 2 3 4
            // page 2 -> index: 5 6 7 8 9
            // page 3 -> index: 10 11 12 13 14
            if (pageIndex * numPerPage <= index) {
              return;
            }
            if (index < (pageIndex - 1) * numPerPage) {
              return;
            }
            const index2digit = index + 1 < 10 ? "0" + (index + 1) : index + 1;
            return (
              <div key={id} className="post-container">
                <h3 className="post-title">
                  <span className="post-index">{index2digit}</span> {title}
                </h3>
                <div className="post-published">
                  <Date dateString={date} />
                </div>
                <Link href={`/posts/${id}`}>
                  <a>
                    <Button>Read More</Button>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
        <Pagination
          lastIndex={lastIndex}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      </PostContainer>
    </Layout>
  );
}

const PostContainer = styled(Container)`
  .post-container {
    margin: 2rem 0;
    .post-title {
      font-size: 2rem;
      max-width: 30ch;
    }
    .post-index {
      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: var(--color-mint);
      color: white;
      font-family: var(--font-primary);
    }
  }
  .pagination-container {
    button:not(.active) {
      border: transparent;
    }
    button:hover {
      border-color: var(--color-mint);
    }
  }
`;

export async function getStaticProps() {
  const postsData = await getSortedPostsData();
  return {
    props: { postsData },
  };
}
