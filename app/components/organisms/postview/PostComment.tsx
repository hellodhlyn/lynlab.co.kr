import Giscus from "~/lib/components/giscus/Giscus";
import Href from "~/components/atoms/Href";

export function PostComment() {
  return (
    <div id="comments">
      <Giscus
        repo="hellodhlyn/lynlab.co.kr"
        repoId="MDEwOlJlcG9zaXRvcnkxNjc3ODk5ODg="
        category="Comments"
        categoryId="DIC_kwDOCgBFpM4CQiHV"
      />
      <p className="text-sm">
        작성한 댓글은 <Href link="https://giscus.app/ko">giscus</Href>를 통해 GitHub Discussion에 저장됩니다.
      </p>
    </div>
  );
}
