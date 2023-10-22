import { LoaderFunction, MetaFunction, json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import Container from "~/components/atoms/Container";
import { Title } from "~/components/atoms/typography";
import { EventTimeline } from "~/components/organisms/hobby";
import { Event, getAllEvents } from "~/models/hobby/event";

type LoaderData = {
  events: Event[];
};

export const loader: LoaderFunction = async () => {
  const data = {
    events: await getAllEvents(),
  };
  return json<LoaderData>(data);
};

export const meta: MetaFunction = () => {
  return [
    { title: "취미로그 | LYnLab" },
    { name: "description", content: "게임, 만화, 보컬로이드 - 종합 컨텐츠 블로그" },
  ];
};

export default function HobbyIndex() {
  const { events } = useLoaderData<LoaderData>();

  return (
    <Container>
      <Title text="글 모음" />
      <div className="mb-16">

      </div>

      <Title text="참여 예정 행사" />
      <div className="mb-16">
        <EventTimeline events={events} />
      </div>
    </Container>
  );
}
