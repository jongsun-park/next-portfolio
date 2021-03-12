import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Date from "../components/date";
import Image from "next/image";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>Create Next App</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi! I'm Park. I'm self learning code and design.</p>
        <p>
          Thanks you for visiting my website. I can make beatiful website built
          with Wordpress and Shopify. and design with adobe products. I really
          design with AdobeXD for design website. Check my current works! and
          welcome to contact me any time :)
        </p>
        <Link href="/works">
          <a>My Works</a>
        </Link>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData &&
            allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
        </ul>
      </section>
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
