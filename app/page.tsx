import Homepage from "../components/homepage";
import { getFeedData } from "../sanity/fetch";

export const revalidate = 60;

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { questions, topics, trending } = await getFeedData();
  const { q } = await searchParams;
  return (
    <Homepage questions={questions} topics={topics} trending={trending} initialQuery={q ?? ""} />
  );
}
