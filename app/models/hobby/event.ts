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

export async function getAllEvents(): Promise<Event[]> {
  return [];
}
