import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import Date from "../components/date";
import Image from "next/image";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import { content } from "../content";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentful } from "../store/reducers/contentfulReducer";

const {
  title,
  author,
  email,
  phone,
  location,
  description,
  contact,
  skills,
} = content;

const Intro = () => (
  <section className={utilStyles.headingMd}>
    <p>Hi! I'm {author}. I'm self learning code and design.</p>
    <p>{description}</p>
  </section>
);

const Blog = ({ allPostsData }) => {
  const [maxPost, setMaxPost] = useState(3);
  const onLoadMore = (e) => {
    const maxNum = allPostsData.length;
    if (maxPost + 2 < maxNum) {
      setMaxPost(maxPost + 2);
    } else {
      console.log("No post to load more");
      e.target && e.target.classList.add("inactive");
    }
  };
  return (
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingLg}>Blog</h2>
      <ul className={utilStyles.list}>
        {allPostsData &&
          allPostsData.map(({ id, date, title }, i) => {
            if (maxPost < i + 1) {
              return;
            }
            return (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            );
          })}
        <button className={styles.btnLoadmore} onClick={onLoadMore}>
          Load More
        </button>
      </ul>
    </section>
  );
};

const Skills = () => (
  <section>
    <h2>Skills</h2>
    <div>
      {skills.map(({ title, description }) => {
        return (
          <div key={title}>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        );
      })}
    </div>
  </section>
);

const Contact = () => (
  <section>
    <h2>Contact</h2>
    <p>{contact}</p>
    location: {location}
    <br />
    email: {email}
  </section>
);

const Work = () => {
  const { loading, error, data } = useSelector((state) => state.contentful);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchContentful(dispatch);
  }, []);
  return (
    <section className={styles.work}>
      <h3>Work</h3>
      <div>
        <ul>
          {loading ? (
            <p>loading...</p>
          ) : (
            data.map((p) => (
              <div key={p.fields.title}>
                <Image
                  width="300"
                  height="300"
                  src={`https:${p.fields.thumbnail.fields.file.url}`}
                />
                <h3>{p.fields.title}</h3>
                <p>{p.fields.description}</p>
                {p.fields.url && <Link href={p.fields.url}>LIVE</Link>}
                <br />
                {p.fields.body && (
                  <Link href={`/projects/${p.sys.id}`}>DETAIL</Link>
                )}
              </div>
            ))
          )}
        </ul>
      </div>
    </section>
  );
};

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{title}</title>
      </Head>
      <Intro />
      <Work />
      <Skills />
      <Blog allPostsData={allPostsData} />
      <Contact />
    </Layout>
  );
}

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const allPostsData = getSortedPostsData();
  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    // props: allPostsData,
    props: { allPostsData },
  };
}
