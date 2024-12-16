import Brainstorm from "./content/brainstorm";
import About from "./content/about";

const content = {
  brainstorming: <Brainstorm />,
  about: <About />,
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
        <div className="flex flex-grow flex-col items-center">{Post}</div>
      ) : null}
    </>
  );
}

export function generateStaticParams() {
  return [{ id: "brainstorming" }, { id: "about" }];
}

export const dynamicParams = false;
