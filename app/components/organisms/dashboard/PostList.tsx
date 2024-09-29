import { Link } from "@remix-run/react";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/20/solid";

type PostListProps = {
  posts: {
    site: { slug: string };
    namespace: { slug: string };
    title: string;
    slug: string;
    visibility: "public" | "private" | "unlisted";
    createdAt: string;
  }[];
};

export default function PostList({ posts }: PostListProps) {
 return (
  <div className="w-full border border-gray-300 rounded-xl shadow">
    <table className="w-full table-auto divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="p-4 text-left">제목</th>
          <th>공개</th>
          <th>동작</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-gray-50">
        {posts.map((post) => (
          <tr key={post.slug} className="hover:bg-gray-200 transition">
            <td className="px-4 py-2">
              <p className="text-xs text-gray-500">{post.namespace.slug} / {post.slug}</p>
              <p className="hover:underline">
                <a href={`https://${post.site.slug}/${post.namespace.slug}/${post.slug}`} target="_blank">
                  {post.title}
                </a>
              </p>
            </td>
            <td className="px-4 py-2">
              {post.visibility === "public" ?
                <LockOpenIcon className="h-4 w-4 mx-auto" /> :
                <LockClosedIcon className="h-4 w-4 mx-auto" />}
            </td>
            <td className="px-4 py-2 text-center">
              <Link to={`./${post.slug}`}>
                <span className="text-blue-500 hover:underline">편집</span>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
 );
}
