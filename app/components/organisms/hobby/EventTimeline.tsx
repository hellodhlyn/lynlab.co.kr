import dayjs from "dayjs";
import { Event } from "~/models/hobby/event";

export default function EventTimeline({ events }: { events: Event[] }) {
  const now = dayjs();
  return (
    <>
      {events.map((event, index) => {
        let dDayText = "";
        if (dayjs(event.since).startOf("day").isAfter(now)) {
          dDayText = `D-${dayjs(event.since).startOf("day").diff(now.startOf("day"), "day")}`;
        } else if (dayjs(event.until).isAfter(now)) {
          dDayText = "개최중";
        } else {
          dDayText = "개최종료";
        }

        return (
          <div key={`event-${event.id}`} className="flex">
            <div className="flex flex-col items-center md:ml-2">
              <div className={`h-5${index > 0 ? " border-l border-neutral-300" : ""}`} />
              <div className="w-3 h-3 bg-neutral-500 border border-neutral-100 rounded-full" />
              <div className="grow min-h-min border-l border-neutral-300" />
            </div>

            <div className="md:w-2/3 ml-4 mb-8 flex flex-col-reverse md:flex-row bg-white rounded-lg shadow-xl shadow-neutral-200">
              <div className="relative h-48 md:h-36 md:w-64 mx-4 mb-4 md:mr-0 md:my-4">
                <img src={event.imageUrl} className="w-full h-full object-cover object-top rounded-lg" />
                <span className="absolute right-0 bottom-0 m-1 px-2 py-1 bg-neutral-900 bg-opacity-90 text-white text-sm rounded-lg">
                  {dDayText}
                </span>
              </div>

              <div className="m-4 md:mx-6">
                <p className="text-sm text-neutral-500">{event.category}</p>
                <p className="text-xl font-bold">{event.title}</p>
                <p>{event.description}</p>
              </div>
            </div>
          </div>
        );
      })}

      <div className="h-10 flex items-center">
        <div className="h-10 flex flex-col items-center md:ml-2">
          <div className="grow border-l border-neutral-300" />
          <div className="w-3 h-3 bg-neutral-500 border border-neutral-100 rounded-full" />
          <div className="grow" />
        </div>

        <div className="ml-4">
          <p className="text-neutral-500">계속해서 각종 행사 및 후기가 추가됩니다!</p>
        </div>
      </div>
    </>
  );
}
