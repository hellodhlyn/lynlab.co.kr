import dayjs from "dayjs";
import { FastArrowLeft, FastArrowRight } from "iconoir-react";
import { useRef, useState } from "react";
import { Event } from "~/models/hobby/event";

export default function PostList({ events }: { events: Event[] }) {
  const [buttonsVisible, setButtonsVisible] = useState([false, true]);

  const positionRef = useRef<HTMLDivElement>(null);
  const scrollPosition = (diff: number) => {
    const { current } = positionRef;
    if (!current) {
      return;
    }

    const unitWidth = 20.5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    const maxPosition = Math.ceil(events.length - (current.clientWidth / unitWidth));

    const position = parseInt(current.getAttribute("position") ?? "0") + diff;
    if (position < 0 || position > maxPosition) {
      return;
    }

    setButtonsVisible([position > 0, position < maxPosition]);

    current.setAttribute("position", position.toString());
    current.scrollTo({
      left: unitWidth * position,
      behavior: "smooth",
    });
  };

  const now = dayjs();

  return (
    <div className="h-fit w-full relative">
      <div className="w-full px-4 my-8 flex gap-2 overflow-auto" ref={positionRef}>
        {events.map((event) => {
          let dDayText = "";
          if (dayjs(event.since).startOf("day").isAfter(now)) {
            dDayText = `D-${dayjs(event.since).startOf("day").diff(now.startOf("day"), "day")}`;
          } else if (dayjs(event.until).isAfter(now)) {
            dDayText = "개최중";
          } else {
            dDayText = "개최종료";
          }

          return (
            <div key={`event-${event.id}`} className="flex-none w-80 bg-white rounded-lg shadow-xl shadow-neutral-200">
              <div className="relative w-full h-48">
                <img src={event.imageUrl} className="w-full h-full object-cover object-top rounded-t-lg" />
                <span className="absolute right-0 bottom-0 m-1 px-2 py-1 bg-neutral-900 bg-opacity-90 text-white text-sm rounded-lg">
                  {dDayText}
                </span>
              </div>

              <div className="my-4 px-4">
                <p className="text-sm text-neutral-500">{event.category}</p>
                <p className="text-lg font-bold">{event.title}</p>
                <p className="text-sm line-clamp-2">{event.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {buttonsVisible[0] && (
        <div className="absolute left-0 top-0 h-full flex items-center">
          <div
            className="hidden md:block m-2 p-3 bg-white bg-opacity-95 hover:bg-opacity-90 rounded-full cursor-pointer transition"
            onClick={() => scrollPosition(-1)}
          >
            <FastArrowLeft className="h-6 w-6" strokeWidth={2} />
          </div>
        </div>
      )}
      {buttonsVisible[1] && (
        <div className="absolute right-0 top-0 h-full w-4 md:w-fit flex items-center bg-gradient-to-l md:from-10% from-neutral-100">
          <div
            className="hidden md:block m-2 p-3 bg-white bg-opacity-95 hover:bg-opacity-90 rounded-full cursor-pointer transition"
            onClick={() => scrollPosition(1)}
          >
            <FastArrowRight className="h-6 w-6" strokeWidth={2} />
          </div>
        </div>
      )}
    </div>
  );
}
