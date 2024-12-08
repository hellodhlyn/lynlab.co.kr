import type { Env } from "~/env";

export type Event = {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  since: string;
  until: string;
  imageUrl: string;
};

export async function getAllEvents(env: Env): Promise<Event[]> {
  return JSON.parse((await env.SITE_CONFIGS.get("hobby-events.json")) || "[]");
}
