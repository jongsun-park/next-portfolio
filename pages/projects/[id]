import Head from "next/head";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { fetchContentful } from "../../store";
import remark from "remark";
import html from "remark-html";

// TODO
// refresh -> invalidate post

export default function Project() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [post, setPost] = useState();

  const { id } = router.query;
  const { data } = useSelector((state) => state.contentful);

  useEffect(() => {
    fetchContentful(dispatch);
    setPost(data.filter((d) => d.sys.id === id)[0]);
  }, []);

  const md2html = (md) => {
    let parsedString;
    remark()
      .use(html)
      .process(md, function (err, file) {
        parsedString = file.toString();
      });
    return parsedString;
  };

  md2html("## hello");

  return (
    <Layout>
      <Head>
        <title></title>
      </Head>
      <Link href="/">
        <a>Go back Home</a>
      </Link>
      {!post ? (
        <h2>Invalidable Post</h2>
      ) : (
        <article>
          <h2>{post.fields.title}</h2>
          <p>{post.sys.createdAt}</p>
          <div>
            {post.fields.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: md2html(post.fields.body),
            }}
          />

          <a href={post.fields.url} target="_blank" rel="noreferrer noopener">
            LIVE WEBSITE
          </a>
          {/* {post.fields.featuredImage && (
            <Image
              width="500"
              height="500"
              className="project__image"
              src={`https:${post.fields.featuredImage.fields.file.url}`}
            />
          )} */}
        </article>
      )}
    </Layout>
  );
}
