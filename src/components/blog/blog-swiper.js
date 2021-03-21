import Link from "next/link";
import Date from "src/components/date";
import { Container } from "src/styles/container";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";

SwiperCore.use([Navigation, Pagination]);

export const Blog = ({ allPostsData }) => {
  const params = {
    slidesPerView: 5,
    spaceBetween: 10,
    loop: true,
    navigation: true,
    pagination: { clickable: true },
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    },
  };

  return (
    <BlogContainer>
      <div className="section-info-container">
        <p className="section-tag">LATEST BLOG</p>
        <h2 className="section-title">Blog</h2>
      </div>
      <div className="blogs">
        <Swiper {...params} className="blogs-slider">
          {allPostsData &&
            allPostsData.map(({ id, date, title }, i) => {
              return (
                <SwiperSlide className="blog-container" key={id}>
                  <h3>{title}</h3>
                  <small>
                    <Date dateString={date} />
                  </small>
                  <Link key={id} href={`/posts/${id}`}>
                    READ MORE
                  </Link>
                </SwiperSlide>
              );
            })}
        </Swiper>
        <div className="swiper-pagination"></div>
      </div>
    </BlogContainer>
  );
};

const BlogContainer = styled(Container)`
  .swiper-container {
    overflow: visible;
  }
  .swiper-button-prev,
  .swiper-button-next {
    transition: all ease-out 100ms;
    &:hover {
      transform: scale(1.2);
    }
  }
  .swiper-button-prev:after,
  .swiper-container-rtl .swiper-button-next:after,
  .swiper-button-next:after,
  .swiper-container-rtl .swiper-button-prev:after {
    color: var(--color-primary);
  }

  .swiper-pagination-bullet {
    background: var(--color-light));
  }
  .swiper-pagination-bullet-active {
    background: var(--color-primary);
  }

  .blog-container {
    border: 1px solid var(--color-mint);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    min-height: 18rem;
    justify-content: center;
    align-items: flex-start;

    a {
      margin: 2rem 0 0;
      border: 1px solid var(--color-mint);
      padding: 4px 12px;
    }

    transition: all ease-out 300ms;

    &:hover {
      background: var(--color-light);
    }

    &:hover a {
      text-decoration: none;
      background: var(--color-mint);
      color: var(--color-light);
    }
  }
`;
