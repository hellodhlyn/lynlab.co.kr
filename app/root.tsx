import type { MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./styles/app.css";
import fonts from "./styles/font.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "LYnLab",
  viewport: "width=device-width,initial-scale=1",
  "twitter:site": "@hellodhlyn",
  "twitter:creator": "@hellodhlyn",
});

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: fonts },
    { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/pretendard/1.3.5/static/pretendard.css" },
  ];
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <html lang="ko">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <html lang="ko">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="m-0 bg-gray-100 text-gray-700 leading-relaxed">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
