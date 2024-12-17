import Brainstorm from "./content/brainstorm";
import About from "./content/about";
import History from "./content/history";

const content = {
  brainstorming: <Brainstorm />,
  about: <About />,
  history: <History />,
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const Post = content[id as keyof typeof content] as React.ReactNode;

  return (
    <>
      {Post ? (
        <div className="mx-2 flex flex-grow flex-col items-center overflow-auto">
          {Post}
        </div>
      ) : null}
    </>
  );
}

export function generateStaticParams() {
  return [{ id: "brainstorming" }, { id: "about" }, { id: "history" }];
}

export const dynamicParams = false;
