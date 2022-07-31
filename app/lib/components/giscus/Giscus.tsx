import { useEffect } from "react";

type GiscusProps = {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
};

export default function Giscus(
  { repo, repoId, category, categoryId } : GiscusProps,
) {
  useEffect(() => {
    if (!document || document.getElementsByClassName("giscus")[0].hasChildNodes()) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repoId);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-lang", "ko");

    document.getElementsByClassName("giscus")[0].appendChild(script);
  });

  return <div className="giscus my-8" />;
}
