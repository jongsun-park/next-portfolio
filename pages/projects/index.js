import Layout from "../../components/layout";
import Link from "next/link";
import { getAllPost } from "../../lib/projects";

export default function Projects({ total, posts }) {
  console.log(total);
  console.log(posts);
  return (
    <Layout>
      <h2>My Projects</h2>
      <small>Total: {total}</small>
      {posts.map((post) => {
        const { title, description } = post.fields;
        const { id } = post.sys;
        return (
          <div key={title}>
            <h3>{title}</h3>
            <p>{description}</p>
            <Link href={`/projects/${id}`}>
              <a>Details</a>
            </Link>
          </div>
        );
      })}
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await getAllPost();
  const { total, items: posts } = data;
  return {
    props: {
      total,
      posts,
    },
  };
}
