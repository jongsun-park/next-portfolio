import remark from "remark";
import html from "remark-html";

export const md2html = (md) => {
  let parsedString;
  remark()
    .use(html)
    .process(md, function (err, file) {
      parsedString = file.toString();
    });
  return parsedString;
};

export default function MarkdownContent({ children }) {
  const parsedString = md2html(children);
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: md2html(parsedString),
      }}
    />
  );
}
