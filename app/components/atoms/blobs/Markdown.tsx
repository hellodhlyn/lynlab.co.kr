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
    <div className="max-w-none prose prose-lg prose-img:w-full prose-img:object-cover
                    prose-headings:text-gray-700 prose-h1:font-black prose-h2:font-black
                    prose-p:text-gray-700 prose-a:text-blue-500
                    prose-pre:bg-gray-200 prose-pre:text-gray-700 break-words">
      <div dangerouslySetInnerHTML={{ __html: marked(text) }} />
    </div>
  );
}
