import Link from "next/link";
import Image from "next/image";
import Date from "../../components/date";
import { Container } from "../../styles/container";
import styled from "styled-components";
import { useEffect, useState } from "react";

export const Blog = ({ allPostsData }) => {
  const [index, setIndex] = useState(0);
  const [max, setMax] = useState(5);

  const onPrev = () => {
    if (index <= 0) {
      return;
    }
    setIndex(index - 1);
  };
  const onNext = () => {
    if (index > allPostsData.length - max) {
      return;
    }
    setIndex(index + 1);
  };

  useEffect(() => {
    const rail = document.querySelector(".blogs-slider");
    rail.style.transform = `translateX(${index * -210}px)`;
  }, [index]);

  useEffect(() => {
    const blogsContainer = document.querySelector(".blogs");
    const blogContainer = document.querySelector(".blog-container");
    setMax(Math.ceil(blogsContainer.offsetWidth / blogContainer.offsetWidth));
  }, []);

  const Buttons = () => (
    <div className="blogs-buttons">
      <button onClick={onPrev} className={`${index <= 0 ? "inactive" : ""}`}>
        <Image src="/svg/arrow-left.svg" width="16" height="16" />
      </button>
      <button
        onClick={onNext}
        className={`${index > allPostsData.length - max ? "inactive" : ""}`}
      >
        <Image src="/svg/arrow-right.svg" width="16" height="16" />
      </button>
    </div>
  );

  return (
    <BlogContainer>
      <div className="section-info-container">
        <p className="section-tag">LATEST BLOG</p>
        <h2 className="section-title">Blog</h2>
        <Buttons />
      </div>
      <div className="blogs">
        <div className="blogs-slider">
          {allPostsData &&
            allPostsData.map(({ id, date, title }, i) => {
              return (
                <Link key={id} href={`/posts/${id}`}>
                  <div className="blog-container">
                    <h3>{title}</h3>
                    <small>
                      <Date dateString={date} />
                    </small>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </BlogContainer>
  );
};

const BlogContainer = styled(Container)`
  overflow-x: hidden;
  .section-info-container {
    margin-bottom: 1rem;
    .section-title {
      margin: 0;
      margin-bottom: 0rem;
      font-size: 3rem;
      line-height: 1;
    }
    .blogs-buttons {
      position: absolute;
      right: 0;
      bottom: 0;
      button {
        background: none;
        border: none;
        padding: 10px;
        outline: none;
        &.inactive {
          opacity: 0.2;
        }
        cursor: pointer;
      }
    }
  }
  .blogs-slider {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: visible;
    transition: all ease-out 300ms;
    cursor: pointer;
    .blog-container {
      min-width: 200px;
      display: grid;
      place-content: center;
      padding: 4rem 2rem;
      border: 1px solid var(--color-mint);
      word-break: break-all;
      margin-right: 10px;
      h3 {
        color: var(--color-mint);
      }
      transition: all ease-out 100ms;
      &:hover {
        background: var(--color-mint);
        h3 {
          color: var(--color-light);
        }
      }
    }
  }
`;
