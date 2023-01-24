import { useState } from "react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

type SiteSelectorProps = {
  sites: {
    slug: string;
    namespaces: {
      name: string;
      slug: string;
    }[];
  }[];
  currentSite?: string;
  currentNamespace?: string;
  currentPost?: string;
};

export function SiteSelector(
  { sites, currentSite, currentNamespace, currentPost }: SiteSelectorProps,
) {
  const [site] = useState<string>(currentSite || sites[0].slug);
  const [namespace] = useState<string>(currentNamespace || sites[0].namespaces[0].slug);
  return (
    <div className="flex text-lg gap-x-2 font-light">
      <DocumentTextIcon className="h-5 w-5 self-center" />
      <span>{site}</span>
      <span className="text-gray-300">/</span>
      <span>{namespace}</span>
      {currentPost && (
        <>
          <span className="text-gray-300">/</span>
          <span>{currentPost !== "new" ? currentPost : "새로운 글"}</span>
        </>
      )}
    </div>
  );
}
