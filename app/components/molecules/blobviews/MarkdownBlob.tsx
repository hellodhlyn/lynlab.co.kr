import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";

type MarkdownProps = {
  text: string;
};

export function MarkdownBlob({ text }: MarkdownProps) {
  const marked = new Marked(
    markedHighlight({
      highlight: (code, lang) => {
        const hljs = require("highlight.js");
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      },
    }),
  );

  return (
    <div className="prose md:prose-lg max-w-none prose-a:text-blue-500 break-words prose-li:m-0 prose-img:mx-auto">
      <div dangerouslySetInnerHTML={{ __html: marked.parse(text) }} />
    </div>
  );
}
