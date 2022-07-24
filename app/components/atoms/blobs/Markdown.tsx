import { marked } from "marked";
import hljs from "highlight.js";

type MarkdownProps = {
  text: string;
};

export default function Markdown({ text }: MarkdownProps) {
  marked.setOptions({
    highlight: (code, markedLang) => {
      const language = hljs.getLanguage(markedLang) ? markedLang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  });

  return (
    <div className="max-w-none prose prose-lg prose-img:w-full prose-img:object-cover break-words">
      <div dangerouslySetInnerHTML={{ __html: marked(text) }} />
    </div>
  );
}
