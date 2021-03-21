import Layout from "src/components/layout";
import { getAllPostIds, getPostData } from "src/lib/posts";
import Date from "src/components/date";
import { PageContainer } from "src/styles/container";
import { motion } from "framer-motion";

export default function Post({ postData }) {
  return (
    <Layout title={postData.title}>
      <PageContainer>
        <article>
          <motion.h1 className="page-title" layoutId={`${postData.id}_title`}>
            {postData.title}
          </motion.h1>
          <div className="page-date">
            <Date dateString={postData.date} />
          </div>
          <div
            className="page-content"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />
        </article>
      </PageContainer>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
