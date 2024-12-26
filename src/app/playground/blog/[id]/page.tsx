import Brainstorm from "./content/brainstorm";
import About from "./content/about";
import UtubeChangeNote from "./content/utubeChangeNote";
// import TestingStrategy from "./content/testingStrategy";

const content = [
  {
    id: "brainstorming",
    title: "Portfolio brainstorming",
    content: <Brainstorm />,
  },
  {
    id: "about",
    title: "About",
    content: <About />,
  },
  {
    id: "changeNote",
    title: "Utube change notes",
    content: <UtubeChangeNote />,
  },
  // {
  //   id: "testing",
  //   title: "Personal Testing Strategy",
  //   content: <TestingStrategy />,
  // },
];

export const posts = content.map(({ id, title }) => ({ id, title }));

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const Post = content.find(({ id: _id }) => id === _id);

  return (
    <>
      {Post ? (
        <div className="mx-2 flex flex-grow flex-col items-center overflow-auto">
          {Post.content}
        </div>
      ) : null}
    </>
  );
}

export function generateStaticParams() {
  return content.map(({ id }) => ({ id }));
}

export const dynamicParams = false;
