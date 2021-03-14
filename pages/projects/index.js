import Layout from "../../components/layout";
import { fetchEntries } from "../../lib/content";

export default function Projects({ posts }) {
  console.log(posts);
  return (
    <Layout>
      {posts.map((p) => {
        const { title, description, body, tags } = p;
        return (
          <div key={title}>
            <h3>{title}</h3>
            <div>
              {tags.map((t) => (
                <span key={`${title} - ${t}`}>{t} </span>
              ))}
            </div>
            <p>{description}</p>
            <div dangerouslySetInnerHTML={{ __html: body }} />
          </div>
        );
      })}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetchEntries();
  const posts = await res.map((p) => {
    return p.fields;
  });
  return {
    props: {
      posts,
    },
  };
}
