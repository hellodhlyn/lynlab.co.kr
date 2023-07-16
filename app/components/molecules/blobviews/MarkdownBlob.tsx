import { marked } from "marked";

type MarkdownProps = {
  text: string;
};

export function MarkdownBlob({ text }: MarkdownProps) {
  marked.setOptions({
    highlight: (code, markedLang) => {
      const hljs = require("highlight.js/lib/common");
      const language = hljs.getLanguage(markedLang) ? markedLang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  });

  return (
    <div className="prose md:prose-lg max-w-none prose-a:text-blue-500 break-words prose-li:m-0 prose-img:mx-auto">
      <div dangerouslySetInnerHTML={{ __html: marked(text) }} />
    </div>
  );
}
